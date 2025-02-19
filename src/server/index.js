
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;
const JWT_SECRET = 'your-secret-key';

// Initialize SQLite database
const db = new sqlite3.Database('users.db');

// Create users table
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    email TEXT UNIQUE,
    name TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

app.use(cors({
  origin: 'http://0.0.0.0:5173',
  credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

// Auth middleware
const auth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

app.post('/api/auth/signin', (req, res) => {
  const { email } = req.body;
  const name = email.split('@')[0];

  db.run('INSERT OR IGNORE INTO users (email, name) VALUES (?, ?)', [email, name], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error creating user' });
    }

    db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching user' });
      }

      const token = jwt.sign({ id: user.id, name: user.name, email }, JWT_SECRET);
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      });
      res.json({ message: 'Signed in successfully' });
    });
  });
});

app.post('/api/auth/signout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Signed out successfully' });
});

// Protected API endpoint
// User profile endpoints
app.get('/api/users/:id', auth, (req, res) => {
  const users = {
    1: { id: 1, name: 'Kgwanti', email: 'kgwanti@nexdatasolutions.co', role: 'Admin', image: '/placeholder.svg' }
  };
  const user = users[req.params.id];
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

app.get('/api/users/search', auth, (req, res) => {
  const { query } = req.query;
  const users = [
    { id: 1, name: 'Kgwanti', email: 'kgwanti@nexdatasolutions.co', role: 'Admin', image: '/placeholder.svg' },
    { id: 2, name: 'John Doe', email: 'john@nexdatasolutions.co', role: 'User', image: '/placeholder.svg' }
  ];
  
  const filtered = users.filter(user => 
    user.name.toLowerCase().includes(query.toLowerCase()) ||
    user.email.toLowerCase().includes(query.toLowerCase())
  );
  res.json(filtered);
});

app.get('/api/activity', auth, (req, res) => {
  const activities = [
    { id: 1, userId: 1, type: 'profile_view', target: 'Executive Profile', timestamp: new Date().toISOString() },
    { id: 2, userId: 1, type: 'search', target: 'Technology sector', timestamp: new Date().toISOString() }
  ];
  res.json(activities);
});

// Research insights endpoint
app.get('/api/research/insights', auth, async (req, res) => {
  const { executive, industry } = req.query;
  
  if (!process.env.OPENAI_API_KEY || !process.env.FIRECRAWL_KEY) {
    return res.status(500).json({ error: 'Missing API keys' });
  }
  
  try {
    const { generateInsights } = require('../services/researchService');
    const insights = await generateInsights(executive, industry);
    res.json(insights);
  } catch (error) {
    console.error('Research insight generation error:', error);
    res.status(500).json({ error: 'Failed to generate research insights' });
  }
});

app.get('/api/executives', auth, (req, res) => {
  const executives = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Managing Partner",
      company: "Johnson & Associates LLP",
      industry: "Law",
      linkedin: "https://linkedin.com/in/sarahjohnson",
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "CEO",
      company: "Real Estate Ventures International",
      industry: "Real Estate",
      linkedin: "https://linkedin.com/in/michaelchen",
    }
  ];
  res.json(executives);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
