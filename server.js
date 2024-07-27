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
		const { title, actor, director } = req.body;
		const connection = mysql.createConnection(config);
	
	let sqlQuery = `SELECT 
						name, 
						CONCAT(directors.first_name, ' ', directors.last_name) AS directors,
						IFNULL(AVG(Review.reviewScore), 'N/A') AS averageScore,
						GROUP_CONCAT(DISTINCT reviewContent SEPARATOR ', ') AS reviews
					FROM 
						movies
					LEFT JOIN 
						movies_directors ON movies.id = movies_directors.movie_id
					LEFT JOIN 
						directors ON movies_directors.director_id = directors.id
					LEFT JOIN 
						Review ON movies.id = Review.movieID
					LEFT JOIN 
						roles ON movies.id = roles.movie_id
					LEFT JOIN 
						actors ON roles.actor_id = actors.id
					WHERE 
						1=1`;
	
		const queryParams = []
		if (title) {
			sqlQuery += ` AND movies.name = ?`;
			queryParams.push(title)
		}
	
		if (actor) {
			sqlQuery += ` AND CONCAT(actors.first_name, ' ', actors.last_name) = ?`
			queryParams.push(actor)
		}

		if (director) {
			sqlQuery += ` AND CONCAT(directors.first_name, ' ', directors.last_name) = ?`;
			queryParams.push(director)
		}
	
		sqlQuery += ` GROUP BY name, directors;`;
	
	    console.log("Final SQL Query: ", sqlQuery);  // Log the final query
	
	    connection.query(sqlQuery, queryParams, (error, results) => {
	        if (error) {
	            console.error("SQL Error: ", error);  // Log any SQL errors
	            return res.status(500).send(error);
	        }
	        console.log("Query Results: ", results);  // Log the query results
	        res.send(results);
	    });
	});



app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
