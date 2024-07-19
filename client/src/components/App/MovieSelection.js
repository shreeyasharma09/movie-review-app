// import React from 'react';
// import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// function MovieSelection({ movies, selectedMovie, handleMovieChange }) {
//   return (
//     <FormControl fullWidth>
//       <InputLabel id="movie-select-label">Select a movie</InputLabel>
//       <Select
//         value={selectedMovie}
//         onChange={handleMovieChange}
//         labelId="movie-select-label"
//         id="movie-select"
//       >
//         {movies.map((movie, index) => (
//           <MenuItem key={index} value={movie}>
//             {movie}
//           </MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//   );
// }

// export default MovieSelection;

import * as React from 'react';
import Typography from '@mui/material/Typography';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const MovieSelection = (props) => {

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 300 }}>
        <InputLabel id="movie-select-label">Select a Movie</InputLabel>
        <Select
          labelId="movie-select-label"
          id="movie-select"
          value={props.selectedMovie}
          label="Select a Movie"
          onChange={props.handleMovieChange}
          error={props.movieError}
        >
          {props.movies.map((movie, index) => (
            <MenuItem key={movie.id} value={movie.id}>
              {movie.name}
            </MenuItem>
        ))}
        </Select>
        {props.movieError && <Typography sx={{ pl: 1 }} color="error">Select your movie</Typography>}
      </FormControl>
    </>
  );
}

export default MovieSelection;