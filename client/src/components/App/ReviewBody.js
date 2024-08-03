
import * as React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const ReviewBody = (props) => {

  return (
    <>
      <TextField
        id="review-body"
        label="Review:"
        variant="outlined"
        value={props.enteredReview}
        onChange={props.handleenteredReview}
        multiline
        rows={2}
        fullWidth
        sx={{ mt: 1, mb: 1 }}
        inputProps={{ maxLength: 200 }}
      />
      {props.bodyError && <Typography sx={{ pl: 1 }} color="error">Enter your review</Typography>}
    </>
  );
}

export default ReviewBody;
