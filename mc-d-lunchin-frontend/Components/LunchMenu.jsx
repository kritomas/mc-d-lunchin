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
        const response = await fetch("/api/lunch");
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
      <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  // Limit the display to the first 16 lunch items across all days.
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
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
      </Typography>
      {limitedData.map((day, dayIndex) => (
        <Paper
          key={dayIndex}
          elevation={2}
          sx={{ p: 2, mb: 2, width: "100%" }}
        >
          <Typography variant="h6" color="primary" gutterBottom>
            {day.date}
          </Typography>
          <List>
            {day.lunches.map((lunch, lunchIndex) => {
              const detailsArr = String(lunch.details)
                .split(",")
                .map((d) => d.trim());
              return (
                <ListItem key={lunchIndex} disableGutters>
                  <Typography variant="body2">
                    {lunch.type} -{" "}
                    {detailsArr.map((detail, idx, arr) => {
                      let emoji = "";
                      if (idx === 0) {
                        // First item: soup
                        emoji = "🍲";
                      } else if (idx === 1) {
                        if (arr.length === 2) {
                          // Only two items: combine main course and drink
                          emoji = "🍽️🍹";
                        } else {
                          // Second item: main course
                          emoji = "🍽️";
                        }
                      } else if (idx === arr.length - 1 && idx !== 1) {
                        // Last item (if not already handled in two-item case): drink
                        emoji = "🍹";
                      }
                      return (
                        <span key={idx}>
                          {emoji} {detail}
                          {idx !== arr.length - 1 ? ", " : ""}
                        </span>
                      );
                    })}
                  </Typography>
                </ListItem>
              );
            })}
          </List>
        </Paper>
      ))}
    </Container>
  );
};

export default LunchMenu;
