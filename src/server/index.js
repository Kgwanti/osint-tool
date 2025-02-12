
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Sample API endpoint
app.get('/api/executives', (req, res) => {
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
