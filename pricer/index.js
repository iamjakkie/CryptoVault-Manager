const { Pool } = require('pg');
const axios = require('axios');

// Connect to QuestDB using PostgreSQL protocol
const pool = new Pool({
  user: 'admin', // Replace with your QuestDB user
  host: 'localhost', // Replace with your QuestDB host
  database: 'qdb', // Replace with your QuestDB database name
  password: 'quest', // Replace with your QuestDB password
  port: 8812, // QuestDB default port for PostgreSQL
});

// Example function to fetch data
async function fetchData() {
  try {
    const response = await axios.get('https://api.example.com/data'); // Replace with your data source URL
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

// Example function to insert data into QuestDB
async function insertData(data) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const queryText = 'INSERT INTO my_table (column1, column2) VALUES ($1, $2)';
    for (const item of data) {
      await client.query(queryText, [item.field1, item.field2]); // Adjust fields based on your data
    }
    await client.query('COMMIT');
    console.log('Data inserted successfully');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error inserting data:', error);
  } finally {
    client.release();
  }
}

// Main function to fetch and insert data
async function main() {
  const data = await fetchData();
  if (data.length > 0) {
    await insertData(data);
  } else {
    console.log('No data to insert');
  }
}

// Run the main function periodically
setInterval(main, 60 * 60 * 1000); // Adjust the interval as needed (e.g., every hour)