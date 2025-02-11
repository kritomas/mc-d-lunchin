import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';

const LunchReviewCard = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  const handleSubmitReview = () => {
    // Handle the review submission here
    setAverageRating((averageRating * totalReviews + rating) / (totalReviews + 1));
    setTotalReviews(prev => prev + 1);
    setReview('');
    setRating(0);
  };

  return (
    <Card sx={{ maxWidth: '500px', margin: '20px auto', padding: '20px' }}>
      <CardContent>
        <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
          Rate Today's Lunch
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6">How was your lunch today?</Typography>
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            sx={{ mt: 1 }}
          />
        </Box>

        <TextField
          fullWidth
          label="Write your review..."
          multiline
          rows={4}
          value={review}
          onChange={(e) => setReview(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Button 
          variant="contained" 
          onClick={handleSubmitReview}
          disabled={!rating || !review}
          sx={{ mb: 3 }}
        >
          Submit Review
        </Button>

        <Box sx={{ pt: 3, borderTop: '1px solid #ddd' }}>
          <Typography variant="h6">Average Rating</Typography>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 1 }}>
            <Rating name="read-only" value={averageRating} readOnly />
            <Typography variant="body1">
              {totalReviews} reviews
            </Typography>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LunchReviewCard;
