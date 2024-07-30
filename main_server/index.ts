// import Pool from 'pg';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from "express";
// const { Pool } = require('pg');

dotenv.config();

const app = express();
const port = 5001;



type price = {
  symbol: string;
  price: number;
  timestamp: number;
}

let mem_prices: price[] = [];

async function get_price(symbol: string) {
  const url = `https://pro-api.coingecko.com/api/v3/coins/${symbol}/market_chart?vs_currency=usd&days=1`;
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('accept', 'application/json');
  requestHeaders.set('x-cg-pro-api-key', process.env.COINGECKO_API_KEY!);

  const response = await fetch(url, { headers: requestHeaders });
  const data = await response.json();
  const raw_prices = data.prices;
  const prices = raw_prices.map((price: [number, number]) => {
    return {
      symbol: symbol,
      price: price[1],
      timestamp: price[0]
    }
  });
  // check if symbol exists in mem_prices
  const index = mem_prices.findIndex((element) => element.symbol === symbol);
  if (index === -1) {
    mem_prices = mem_prices.concat(prices);
  } else {
    const last_saved_price = mem_prices[mem_prices.length-1];
    const last_price = prices[prices.length-1];
    if (last_saved_price.timestamp < last_price.timestamp) {
      mem_prices.push(last_price);
    }
  }
}




async function startCollectingPrices() {
  setInterval(async () => {
    console.info("PING!");

    // TODO: Call CoinGecko API and store to DB.
    await get_price('ethereum');
    console.log(mem_prices.length);
    await get_price('pepe');
    console.log(mem_prices.length);

  }, 5000);
}

startCollectingPrices();


// Middleware to parse JSON requests
app.use(express.json());

// Connect to QuestDB using PostgreSQL protocol
// const pool = new Pool({
//   user: 'admin', // Replace with your QuestDB user
//   host: 'localhost', // Replace with your QuestDB host
//   database: 'qdb', // Replace with your QuestDB database name
//   password: 'quest', // Replace with your QuestDB password
//   port: 8812, // QuestDB default port for PostgreSQL
// });

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from the Express server!');
});

app.get('/portfolio', async (req: Request, res: Response) => {
  try {
    // const result = await pool.query('SELECT * FROM portfolio');
    // res.json(result.rows);
  } catch (error) {
    console.error('Error querying QuestDB:', error);
    res.status(500).send('Error querying QuestDB');
  }
});

app.get('/vaults/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // const result = await pool.query('SELECT * FROM vaults WHERE id = $1', [id]);
    // res.json(result.rows[0]);
  } catch (error) {
    console.error('Error querying QuestDB:', error);
    res.status(500).send('Error querying QuestDB');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});