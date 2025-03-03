import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

const LunchReviewCard = () => {
  // Overall review states
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  // New states reflecting SQL table columns
  const [portionSize, setPortionSize] = useState('akorát');
  const [temperature, setTemperature] = useState('akorát');
  const [appearanceRating, setAppearanceRating] = useState(0);
  const [extraPay, setExtraPay] = useState(0);
  const [cookRecommendation, setCookRecommendation] = useState('vařit');

  // States for displaying the overall rating average
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  // Dummy user and food ids (usually fetched from context or props)
  const [userId] = useState(1);
  const [foodId] = useState(1);

  const handleSubmitReview = async () => {
    // Build the review object matching your SQL table columns.
    // Map extraPay to tip to match the expected API field.
    const newReview = {
      user_id: userId,
      food_id: foodId,
      rating, // overall rating, assumed to be scaled appropriately
      comment: review,
      portion_size: portionSize,
      temperature, // one of 'ledový', 'studené', 'akorát', 'horký', or 'vařící'
      appearance: appearanceRating, // 0 to 5 (as per CHECK 0<=appearance<=5)
      tip: extraPay,
      cook_recommendation: cookRecommendation, // either 'vařit' or 'nevařit'
    };

    try {
      const response = await fetch('/api/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.text();
      console.log('Review submitted successfully:', data);
    } catch (error) {
      console.error('There was an error submitting the review:', error);
    }

    // Compute the new average for the overall rating
    setAverageRating(
      (averageRating * totalReviews + rating) / (totalReviews + 1)
    );
    setTotalReviews((prev) => prev + 1);

    // Reset the form values to defaults
    setRating(0);
    setReview('');
    setPortionSize('akorát');
    setTemperature('akorát');
    setAppearanceRating(0);
    setExtraPay(0);
    setCookRecommendation('vařit');
  };

  return (
    <Card sx={{ maxWidth: '500px', margin: '20px auto', padding: '20px' }}>
      <CardContent>
        <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
          Rate Today's Lunch
        </Typography>

        {/* Overall Rating */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6">How was your lunch today?</Typography>
          <Rating
            name="overall-rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            sx={{ mt: 1 }}
          />
        </Box>

        {/* Review Comment */}
        <TextField
          fullWidth
          label="Write your review..."
          multiline
          rows={4}
          value={review}
          onChange={(e) => setReview(e.target.value)}
          sx={{ mb: 3 }}
        />

        {/* Portion Size */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="portion-size-label">Portion Size</InputLabel>
          <Select
            labelId="portion-size-label"
            value={portionSize}
            label="Portion Size"
            onChange={(e) => setPortionSize(e.target.value)}
          >
            <MenuItem value="hladový">hladový</MenuItem>
            <MenuItem value="akorát">akorát</MenuItem>
            <MenuItem value="přejedený">přejedený</MenuItem>
          </Select>
        </FormControl>

        {/* Temperature */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="temperature-label">Temperature</InputLabel>
          <Select
            labelId="temperature-label"
            value={temperature}
            label="Temperature"
            onChange={(e) => setTemperature(e.target.value)}
          >
            <MenuItem value="ledový">ledový</MenuItem>
            <MenuItem value="studené">studené</MenuItem>
            <MenuItem value="akorát">akorát</MenuItem>
            <MenuItem value="horký">horký</MenuItem>
            <MenuItem value="vařící">vařící</MenuItem>
          </Select>
        </FormControl>

        {/* Appearance Rating */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6">Appearance</Typography>
          <Rating
            name="appearance-rating"
            value={appearanceRating}
            onChange={(event, newValue) => setAppearanceRating(newValue)}
            max={5}
            sx={{ mt: 1 }}
          />
        </Box>

        {/* Extra Payment */}
        <TextField
          fullWidth
          label="Extra Payment"
          type="number"
          value={extraPay}
          onChange={(e) => setExtraPay(Number(e.target.value) || 0)}
          sx={{ mb: 3 }}
        />

        {/* Cook Recommendation */}
        <FormControl component="fieldset" sx={{ mb: 3 }}>
          <FormLabel component="legend">Cook Recommendation</FormLabel>
          <RadioGroup
            row
            value={cookRecommendation}
            onChange={(e) => setCookRecommendation(e.target.value)}
          >
            <FormControlLabel
              value="vařit"
              control={<Radio />}
              label="Vařit"
            />
            <FormControlLabel
              value="nevařit"
              control={<Radio />}
              label="Nevařit"
            />
          </RadioGroup>
        </FormControl>

        {/* Submit Button */}
        <Button
          variant="contained"
          onClick={handleSubmitReview}
          disabled={!rating || !review}
          sx={{ mb: 3 }}
        >
          Submit Review
        </Button>

        {/* Display the average overall rating */}
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
