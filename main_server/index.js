const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Connect to QuestDB using PostgreSQL protocol
const pool = new Pool({
  user: 'admin', // Replace with your QuestDB user
  host: 'localhost', // Replace with your QuestDB host
  database: 'qdb', // Replace with your QuestDB database name
  password: 'quest', // Replace with your QuestDB password
  port: 8812, // QuestDB default port for PostgreSQL
});

app.get('/', (req, res) => {
  res.send('Hello from the Express server!');
});

app.get('/portfolio', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM portfolio');
    res.json(result.rows);
  } catch (error) {
    console.error('Error querying QuestDB:', error);
    res.status(500).send('Error querying QuestDB');
  }
});

app.get('/vaults/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM vaults WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error querying QuestDB:', error);
    res.status(500).send('Error querying QuestDB');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});