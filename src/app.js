require('dotenv').config();

const express = require('express');
const mustacheExpress = require('mustache-express');
const path = require('path');
const { connectDatabase } = require('./database');

const app = express();
const port = process.env.PORT || 3000;
const viewsDirectory = path.join(__dirname, '..', 'views');
const staticDirectory = path.join(__dirname, '..', 'startbootstrap-shop-homepage-gh-pages');

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', viewsDirectory);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(staticDirectory));

async function start() {
  await connectDatabase();

  app.listen(port, () => {
    console.log(`Bull and Pear listening on port ${port}`);
  });
}

if (require.main === module) {
  start().catch((error) => {
    console.error('Unable to start Bull and Pear:', error);
    process.exitCode = 1;
  });
}

module.exports = app;
