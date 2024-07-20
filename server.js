import mysql from 'mysql';
import config from './config.js';
import fetch from 'node-fetch';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import response from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));


app.post('/api/loadUserSettings', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/getMovies', (req, res) => {
	let connection = mysql.createConnection(config);
  
	let sql = `SELECT * FROM movies`;
	console.log(sql);
  
	connection.query(sql, (error, results, fields) => {
	  	if (error) {
			return console.error(error.message);
	 	}

		let string = JSON.stringify(results);
	  	res.send(results);
	});
	connection.end();
  });

  app.post('/api/addReview', (req, res) => {
	let connection = mysql.createConnection(config);
  
	const { userID, movieID, reviewTitle, reviewContent, reviewScore } = req.body;
  
	let sql = 'INSERT INTO Review (userID, movieID, reviewTitle, reviewContent, reviewScore) VALUES (?, ?, ?, ?, ?)';
	let data = [userID, movieID, reviewTitle, reviewContent, reviewScore];
  
	connection.query(sql, data, (error, results, fields) => {
	  if (error) {
		console.error('Error adding review:', error);
		res.status(500).send('Error adding review');
		return;
	  }
  
	  res.status(200).send('Review added successfully');
	});
	connection.end();
  });

  app.post('/api/searchMovies', (req, res) => {
    let { title, actor, director } = req.body;
    let connection = mysql.createConnection(config);

    let sql = `
        SELECT m.title, 
               GROUP_CONCAT(DISTINCT CONCAT(d.first_name, ' ', d.last_name) SEPARATOR ', ') AS directors,
               AVG(r.reviewScore) AS averageRating,
               GROUP_CONCAT(DISTINCT r.reviewContent SEPARATOR '\n') AS reviews
        FROM movies m
        LEFT JOIN directors d ON m.id = d.id
        LEFT JOIN Review r ON m.id = r.movieID
        LEFT JOIN actors a ON m.id = a.id
        WHERE 1=1
    `;

    if (title) {
        sql += ` AND m.title LIKE '%${title}%'`;
    }
    if (actor) {
        sql += ` AND CONCAT(a.first_name, ' ', a.last_name) LIKE '%${actor}%'`;
    }
    if (director) {
        sql += ` AND CONCAT(d.first_name, ' ', d.last_name) LIKE '%${director}%'`;
    }

    sql += ' GROUP BY m.id';

    console.log(sql);

    connection.query(sql, (error, results, fields) => {
        if (error) {
            console.error('Error searching movies:', error);
            res.status(500).send('Error searching movies');
            return;
        }
        res.send(results);
    });
    connection.end();
});



app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
