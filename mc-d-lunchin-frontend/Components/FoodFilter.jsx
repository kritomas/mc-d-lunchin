// App.js
import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  FormControl, 
  FormLabel, 
  Select, 
  MenuItem, 
  Checkbox, 
  FormControlLabel, 
  Button, 
  Grid, 
  Card, 
  CardContent,
 CircularProgress
} from '@mui/material';

import axios from 'axios';

const FoodFilter = () => {
  const [categoriesIn, setCategoriesIn] = useState([]);
  const [categoriesNotIn, setCategoriesNotIn] = useState([]);
  const [typesIn, setTypesIn] = useState([]);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Call your backend API functions here
      const categoryInResponse = await axios.post('/api/getFoodByCategoryIn', { categories: categoriesIn });
      const categoryNotInResponse = await axios.post('/api/getFoodByCategoryNotIn', { categories: categoriesNotIn });
      const typeInResponse = await axios.post('/api/getFoodByTypeIn', { types: typesIn });
      const vegetarianResponse = await axios.post('/api/getFoodByVegetarian', { isVegetarian });

      // Process the results
      const foodIds = await processFoodIds([
        categoryInResponse.data,
        categoryNotInResponse.data,
        typeInResponse.data,
        vegetarianResponse.data
      ]);

      // Get food details for each ID
      const foodDetails = await Promise.all(
        foodIds.map(id => axios.get(`/api/food/${id}`))
      );

      setFoodItems(foodDetails);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const processFoodIds = async (results) => {
    if (!results.length) return [];

    // Convert all results to Sets for easier manipulation
    const resultSets = results.map(result => new Set(result.map(item => item.id)));

    // Filter categories
    let filteredIds = [...resultSets[0]].filter(
      id => !resultSets[1].has(id)
    );

    // Filter types
    filteredIds = filteredIds.filter(id => resultSets[2].has(id));

    // Filter vegetarian
    filteredIds = filteredIds.filter(id => resultSets[3].has(id));

    return filteredIds;
  };

  return (
    <Container maxWidth="md" >
      <Box sx={{ my: 4 }} >
        <Typography variant="h3" component="h1" gutterBottom>
          Food Filter
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth>
              <FormLabel>Categories to Include</FormLabel>
              <Select
                multiple
                value={categoriesIn}
                onChange={(e) => setCategoriesIn(e.target.value)}
              >
                <MenuItem value="Slané">Salty</MenuItem>
                <MenuItem value="Sladké">Sweet</MenuItem>
                <MenuItem value="Umami">Umami</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth>
              <FormLabel>Categories to Exclude</FormLabel>
              <Select
                multiple
                value={categoriesNotIn}
                onChange={(e) => setCategoriesNotIn(e.target.value)}
              >
                <MenuItem value="Slané">Salty</MenuItem>
                <MenuItem value="Sladké">Sweet</MenuItem>
                <MenuItem value="Umami">Umami</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth>
              <FormLabel>Types</FormLabel>
              <Select
                multiple
                value={typesIn}
                onChange={(e) => setTypesIn(e.target.value)}
              >
                <MenuItem value="hlavní jídlo">Main Course</MenuItem>
                <MenuItem value="předkrm">Starter</MenuItem>
                <MenuItem value="dezert">Dessert</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mb: 3 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isVegetarian}
                  onChange={(e) => setIsVegetarian(e.target.checked)}
                  name="vegetarian"
                />
              }
              label="Vegetarian"
            />
          </Box>

          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              'Filter Foods'
            )}
          </Button>
        </form>

        {foodItems.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Grid container spacing={2}>
              {foodItems.map((food) => (
                <Grid item key={food.id} xs={12} sm={6} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" component="h2">
                        {food.name}
                      </Typography>
                      <Typography color="text.secondary">
                        Type: {food.type}
                      </Typography>
                      <Typography color="text.secondary">
                        Category: {food.category}
                      </Typography>
                      <Typography color="text.secondary">
                        Vegetarian: {food.is_vegetarian ? 'Yes' : 'No'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default FoodFilter;
