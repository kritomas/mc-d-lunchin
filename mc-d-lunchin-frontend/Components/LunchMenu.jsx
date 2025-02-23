import React, { useState, useEffect } from "react";
import {
  Container,
  CircularProgress,
  Typography,
  Paper,
  List,
  ListItem,
} from "@mui/material";

const LunchMenu = () => {
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://your-api-endpoint.com/lunches");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMenuData(data);
      } catch (error) {
        console.error("Error fetching the data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  // Limit the display to the first 15 lunch items across all days.
  let count = 0;
  const limitedData = menuData
    .map((day) => {
      if (count >= 16) return null;
      const limitedLunches = day.lunches.filter(() => {
        if (count < 16) {
          count++;
          return true;
        }
        return false;
      });
      if (limitedLunches.length === 0) return null;
      return { ...day, lunches: limitedLunches };
    })
    .filter((day) => day !== null);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
      </Typography>
      {limitedData.map((day, index) => (
        <Paper key={index} elevation={2} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" color="primary" gutterBottom>
            {day.date}
          </Typography>
          <List>
            {day.lunches.map((lunch, i) => (
              <ListItem key={i} disableGutters>
                <Typography variant="body2" noWrap>
                  {lunch.type} -{" "}
                  {lunch.details.replace(/\s+/g, " ").trim()}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Paper>
      ))}
    </Container>
  );
};

export default LunchMenu;
