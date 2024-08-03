import mysql from 'mysql';
import config from './config.js';
import fetch from 'node-fetch';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

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
						GROUP_CONCAT(DISTINCT CONCAT(directors.first_name, ' ', directors.last_name) SEPARATOR ', ') AS directors,
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

	sqlQuery += ` GROUP BY name;`;

	console.log("Final SQL Query: ", sqlQuery);

	connection.query(sqlQuery, queryParams, (error, results) => {
		if (error) {
			console.error("SQL Error: ", error);
			return res.status(500).send(error);
		}
		console.log("Query Results: ", results);
		res.send(results);
	});
});



// getRecentReviews
app.post('/api/getRecentReviews', (req, res) => {
	let connection = mysql.createConnection(config);

	let sql = `
	  SELECT 
		Review.reviewTitle, 
		Review.reviewContent, 
		Review.reviewScore, 
		movies.name AS movieTitle 
	  FROM 
		Review 
	  JOIN 
		movies ON Review.movieID = movies.id 
	  ORDER BY 
		Review.reviewID DESC 
	  LIMIT 10
	`;
	console.log(sql);

	connection.query(sql, (error, results) => {
		if (error) {
			console.error('Error fetching reviews:', error);
			res.status(500).send('Error fetching reviews');
			return;
		}
		res.send(results);
	});

	connection.end();
});

// getMoviePoster API
app.post('/api/getMoviePoster', (req, res) => {
	let connection = mysql.createConnection(config);
	const { movieID } = req.body;

	const movieList = [
		'12 Angry Men',
		'2001: A Space Odyssey',
		'3 Ninjas: High Noon at Mega Mountain',
		'Alien',
		'Aliens',
		'All About Eve',
		'All Quiet on the Western Front',
		'Amadeus',
		'American Beauty',
		'American History X',
		'American Ninja V'
	];

	let sql = 'SELECT poster_url FROM movies WHERE id = ? AND name IN (?)';
	connection.query(sql, [movieID, movieList], (error, results) => {
		if (error) {
			console.error('Error fetching movie poster:', error);
			res.status(500).send('Error fetching movie poster');
			return;
		}
		if (results.length > 0) {
			res.send({ posterUrl: results[0].poster_url });
		} else {
			res.status(404).send('Movie not found');
		}
	});
	connection.end();
});

// Endpoint to save comments
app.post('/api/saveComment', (req, res) => {
	let connection = mysql.createConnection(config);
	const { movieID, comment } = req.body;

	let sql = 'INSERT INTO comments (movieID, comment) VALUES (?, ?)';
	connection.query(sql, [movieID, comment], (error, results) => {
		if (error) {
			console.error('Error saving comment:', error);
			res.status(500).send('Error saving comment');
			return;
		}
		res.status(200).send('Comment saved successfully');
	});
	connection.end();
});

app.post('/api/getComments', (req, res) => {
	let connection = mysql.createConnection(config);
	const { movieID } = req.body;

	let sql = 'SELECT comment FROM comments WHERE movieID = ?';
	connection.query(sql, [movieID], (error, results) => {
		if (error) {
			console.error('Error fetching comments:', error);
			res.status(500).send('Error fetching comments');
			return;
		}
		res.send(results);
	});
	connection.end();
});

// Endpoint to get all comments
app.post('/api/getAllComments', (req, res) => {
	let connection = mysql.createConnection(config);

	let sql = 'SELECT c.comment, m.name AS movieTitle FROM comments c JOIN movies m ON c.movieID = m.id';
	connection.query(sql, (error, results) => {
		if (error) {
			console.error('Error fetching comments:', error);
			res.status(500).send('Error fetching comments');
			return;
		}
		res.send(results);
	});
	connection.end();
});

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
