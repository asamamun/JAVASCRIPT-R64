const express = require('express');
const fetch = require('node-fetch'); // node-fetch@2
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(cors());

const cacheFile = path.join(__dirname, 'fpl-cache.json');
const apiUrl = 'https://fantasy.premierleague.com/api/bootstrap-static/';

async function getCachedData() {
  try {
    const data = await fs.readFile(cacheFile, 'utf8');
    console.log('Cache read successfully');
    return JSON.parse(data);
  } catch (error) {
    console.log('No cache found or error reading cache:', error.message);
    return null;
  }
}

async function saveCachedData(data) {
  try {
    await fs.writeFile(cacheFile, JSON.stringify(data, null, 2), 'utf8');
    console.log('Cache saved successfully');
  } catch (error) {
    console.error('Error saving cache:', error.message);
  }
}

app.get('/fpl', async (req, res) => {
  try {
    const cached = await getCachedData();
    if (cached) {
      console.log('Serving cached data');
      res.json(cached.data || cached); // Handle case where cache might not have .data property
      return;
    }

    console.log('Fetching from API');
    const response = await fetch(apiUrl);
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (response.ok) {
      const data = await response.json();
      await saveCachedData(data); // Save data regardless of ETag
      console.log('Fetched and saved new data');
      res.json(data);
    } else {
      console.log('Fetch failed with status:', response.status);
      res.status(response.status).send('Error fetching data');
    }
  } catch (error) {
    console.error('Error in /fpl route:', error.message);
    const cached = await getCachedData();
    if (cached) {
      console.log('Serving cached data due to error');
      res.json(cached.data || cached);
    } else {
      res.status(500).send('Error fetching data');
    }
  }
});

app.listen(3000, () => console.log('Proxy running on port 3000'));

/*use a time-based checksum instead of ETag*/
/* 
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(cors());

const cacheFile = path.join(__dirname, 'fpl-cache.json');
const apiUrl = 'https://fantasy.premierleague.com/api/bootstrap-static/';
const cacheDuration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

async function getCachedData() {
  try {
    const data = await fs.readFile(cacheFile, 'utf8');
    const parsed = JSON.parse(data);
    const { timestamp, data: cachedData } = parsed;
    const now = Date.now();
    if (now - timestamp < cacheDuration) {
      console.log('Cache read successfully and is fresh');
      return cachedData;
    }
    console.log('Cache is stale');
    return null;
  } catch (error) {
    console.log('No cache found or error reading cache:', error.message);
    return null;
  }
}

async function saveCachedData(data) {
  try {
    const cache = { timestamp: Date.now(), data };
    await fs.writeFile(cacheFile, JSON.stringify(cache, null, 2), 'utf8');
    console.log('Cache saved successfully');
  } catch (error) {
    console.error('Error saving cache:', error.message);
  }
}

app.get('/fpl', async (req, res) => {
  try {
    const cached = await getCachedData();
    if (cached) {
      console.log('Serving cached data');
      res.json(cached);
      return;
    }

    console.log('Fetching from API');
    const response = await fetch(apiUrl);
    console.log('Response status:', response.status);

    if (response.ok) {
      const data = await response.json();
      await saveCachedData(data);
      console.log('Fetched and saved new data');
      res.json(data);
    } else {
      console.log('Fetch failed with status:', response.status);
      res.status(response.status).send('Error fetching data');
    }
  } catch (error) {
    console.error('Error in /fpl route:', error.message);
    const cached = await getCachedData();
    if (cached) {
      console.log('Serving cached data due to error');
      res.json(cached);
    } else {
      res.status(500).send('Error fetching data');
    }
  }
});

app.listen(3000, () => console.log('Proxy running on port 3000'));
*/
