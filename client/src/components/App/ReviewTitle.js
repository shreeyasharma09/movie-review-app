
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const ReviewTitle = (props) => {

  return (
    <>
      <TextField
        id="review-title"
        label="Title:"
        variant="outlined"
        value={props.enteredTitle}
        onChange={props.handleTitleChange}
        fullWidth
        sx={{ m: 1, maxWidth: 300 }}
      />
      {props.titleError && <Typography sx={{ pl: 1 }} color="error">Enter your review title</Typography>}
  </>
  );
}

export default ReviewTitle;
