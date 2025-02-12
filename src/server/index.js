
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;
const JWT_SECRET = 'your-secret-key';

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
  // In a real app, validate credentials here
  const token = jwt.sign({ id: 1, name: 'Demo User' }, JWT_SECRET);
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });
  res.json({ message: 'Signed in successfully' });
});

// Protected API endpoint
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
