import React, { useState, useEffect } from "react";
import {
  Container,
  CircularProgress,
  Typography,
  Paper,
  List,
  ListItem,
  Pagination,
  Box,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const LunchMenu = () => {
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  // currentPage is 0-indexed.
  const [currentPage, setCurrentPage] = useState(0);
  // Each page shows up to 16 lunch items.
  const pageSize = 16;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/lunches");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        if (result.success) {
          setMenuData(result.data);
        } else {
          console.error("API error:", result.message);
        }
      } catch (error) {
        console.error("Error fetching the data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Helper: return an emoji based on the lunch type.
  const getEmoji = (type) => {
    if (type === "polévká") return "🍲";
    if (type === "hlavní jídlo") return "🍽️";
    return "";
  };

  // Navigate to the review page for the selected lunch,
  // and store the current lunch's id in localStorage.
  const handleReview = (lunch) => {
    localStorage.setItem("selectedLunchId", lunch.id);
    navigate(`/review/`);
  };

  // Group all lunches by date using a date key (YYYY-MM-DD)
  const groupsMap = {};
  menuData.forEach((lunch) => {
    const dateKey = new Date(lunch.date).toISOString().split("T")[0];
    if (!groupsMap[dateKey]) {
      groupsMap[dateKey] = [];
    }
    groupsMap[dateKey].push(lunch);
  });

  let groups = Object.keys(groupsMap).map((date) => ({
    date,
    lunches: groupsMap[date],
  }));

  // Sort groups by date ascending.
  groups.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Paginate groups without splitting a group across pages.
  // We accumulate groups until adding another would exceed the
  // pageSize (in terms of total lunch items). If a single group
  // has more items than pageSize, it is forced onto its own page.
  const paginateGroups = (groups, pageSize) => {
    const pages = [];
    let currentPageGroups = [];
    let currentCount = 0;
    groups.forEach((group) => {
      if (group.lunches.length > pageSize && currentCount === 0) {
        // This group itself is larger than pageSize; place on its own page.
        pages.push([group]);
      } else if (
        currentCount + group.lunches.length > pageSize &&
        currentCount > 0
      ) {
        pages.push(currentPageGroups);
        currentPageGroups = [group];
        currentCount = group.lunches.length;
      } else {
        currentPageGroups.push(group);
        currentCount += group.lunches.length;
      }
    });
    if (currentPageGroups.length > 0) {
      pages.push(currentPageGroups);
    }
    return pages;
  };

  const pages = paginateGroups(groups, pageSize);
  const totalPages = pages.length;
  const currentPageGroups = pages[currentPage] || [];

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Lunch Menu
      </Typography>
      {currentPageGroups.map((group, index) => {
        // Format the date to a friendlier format.
        const formattedDate = new Date(group.date).toLocaleDateString();
        return (
          <Paper key={index} elevation={2} sx={{ p: 2, mb: 2, width: "100%" }}>
            <Typography variant="h6" color="primary" gutterBottom>
              {formattedDate}
            </Typography>
            <List>
              {group.lunches.map((lunch) => (
                <ListItem key={lunch.id} disableGutters>
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body2">
                      {getEmoji(lunch.type)} {lunch.name}
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleReview(lunch)}
                    >
                      Review
                    </Button>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Paper>
        );
      })}
      {/* Only show pagination if there are multiple pages */}
      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" sx={{ my: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage + 1}
            onChange={(event, value) => setCurrentPage(value - 1)}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
};

export default LunchMenu;
