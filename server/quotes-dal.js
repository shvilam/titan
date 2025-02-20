const mysql = require('mysql2');
require('dotenv').config();
// MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  
  db.connect(err => {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + db.threadId);
  });
const upsetQuotes = async (quotes) => {
  if (!quotes || quotes.length === 0) {
    return;
  }
  const values = quotes.map(quote => [quote.id, Buffer.from(JSON.stringify(quote))]);
  console.log('IDs:', quotes.map(quote => quote.id).join(', '));
  const placeholders = values.map(() => '(?, ?)').join(', ');
  const query = `INSERT IGNORE INTO quotes (id, data) VALUES ${placeholders}`;
  const flattenedValues = values.flat();

  db.query(query, flattenedValues, (err, result) => {
    if (err) {
      console.error(err);
      throw new Error(err);
    } else {
      console.log('Data inserted', result.affectedRows);
    }
  });
}
  const listQuotes = async(numberOfQuotes) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT data FROM quotes LIMIT ${numberOfQuotes}`, (err, results) => {
        if (err) {
          reject(err);
        } else {
          results = results.map(result => JSON.parse(result.data.toString()));
          resolve(results);
        }
      });
    });
  }
  module.exports = {
    upsetQuotes,
    listQuotes
};