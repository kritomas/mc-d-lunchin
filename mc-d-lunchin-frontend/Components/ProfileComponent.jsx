import React, { useState } from "react";
import Cookies from "js-cookie";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

function ProfileComponent() {
  const navigate = useNavigate();
  const theme = useTheme();

  // Retrieve the username from cookies.
  const usernameFromCookie = Cookies.get("username");
  const idFromCookie = Cookies.get("userId");

  const [userData] = useState({
    name: usernameFromCookie,
    role: "User",
  });

  // Reviews array replacing the recentActivities.
  const [reviews] = useState([
    {
      id: idFromCookie,
      title: "Your reviews.",
    },

  ]);

  return (
    <div style={{ padding: "20px" }}>
      <Grid container spacing={4}>
        {/* User Data Card */}
        <Grid item xs={12} md={6} lg={4}>
          <Card
            sx={{
              padding: "20px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <CardHeader titleTypographyProps={{ variant: "h6" }}>
              <Typography variant="h6" gutterBottom>
                User Information
              </Typography>
            </CardHeader>
            <CardContent>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography variant="body1" color="text.secondary">
                  Username: {usernameFromCookie}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Role: {userData.role}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions Card */}
        <Grid item xs={12} md={6} lg={4}>
          <Card
            sx={{
              padding: "20px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <CardHeader titleTypographyProps={{ variant: "h6" }}>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
            </CardHeader>
            <CardContent>
              <Box sx={{ display: "grid", gap: 2 }}>
                <Button
                  fullWidth
                  variant="out1ed"
                  color="secondary"
                  sx={{ height: "80px", fontSize: "1rem" }}
                  onClick={() => navigate("/dashboard")}
                >
                  View Dashboard
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Reviews Card with buttons styled like the dashboard button */}
        <Grid item xs={12} md={8} lg={6}>
          <Card
            sx={{
              padding: "20px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              width: "100%",
            }}
          >
            <CardHeader titleTypographyProps={{ variant: "h6" }}>
              <Typography variant="h6" gutterBottom>
                Your Reviews
              </Typography>
            </CardHeader>
            <CardContent>
              <Box sx={{ display: "grid", gap: 2 }}>
                {reviews.map((review) => (
                  <Button
                    key={review.id}
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    sx={{
                      height: "80px",
                      fontSize: "1rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    onClick={() => navigate(`/userreview`)}
                  >
                    <Typography variant="body1">{review.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {review.date}
                    </Typography>
                  </Button>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProfileComponent;
