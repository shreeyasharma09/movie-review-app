
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const ReviewRating = (props) => {

  return (
    <>
      <RadioGroup
        row
        aria-labelledby="review-rating-group"
        id = "review-rating"
        value={props.selectedRating}
        onChange={props.handleselectedRating}
      >
        <FormControlLabel value="1" control={<Radio />} label="1" />
        <FormControlLabel value="2" control={<Radio />} label="2" />
        <FormControlLabel value="3" control={<Radio />} label="3" />
        <FormControlLabel value="4" control={<Radio />} label="4" />
        <FormControlLabel value="5" control={<Radio />} label="5" />
      </RadioGroup>
      {props.ratingError && <Typography sx={{ pl: 1 }} color="error">Select the rating</Typography>}
    </>
  );
}

export default ReviewRating;
