import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";  // Add this import

function ProfileComponent() {
  const navigate = useNavigate();  // Add this line

  const [userData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Premium User",
    lastLogin: "2023-07-20"
  });

  const [recentActivities] = useState([
    { id: 1, action: "Logged in", date: "2023-07-20 09:00" },
    { id: 2, action: "Updated profile", date: "2023-07-19 14:30" },
    { id: 3, action: "Created new project", date: "2023-07-18 10:15" }
  ]);

  const theme = useTheme();

  return (
    <div style={{ padding: "20px" }}>
      <Grid container spacing={4}>
        {/* User Data Card */}
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ padding: "20px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
            <CardHeader titleTypographyProps={{ variant: 'h6' }}>
              <Typography variant="h6" gutterBottom>
                User Information
              </Typography>
            </CardHeader>
            <CardContent>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography variant="body1" color="text.secondary">
                  Email: {userData.email}
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
          <Card sx={{ padding: "20px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
            <CardHeader titleTypographyProps={{ variant: 'h6' }}>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
            </CardHeader>
            <CardContent>
              <Box sx={{ display: "grid", gap: 2 }}>
                <Button 
                  fullWidth 
                  variant="outlined" 
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

        {/* Recent Activity Card */}
        <Grid item xs={12} md={8} lg={6}>
          <Card sx={{ 
            padding: "20px", 
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            width: "100%" 
          }}>
            <CardHeader titleTypographyProps={{ variant: 'h6' }}>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
            </CardHeader>
            <CardContent>
              <List>
                {recentActivities.map((activity) => (
                  <div key={activity.id}>
                    <ListItem
                      secondaryAction={
                        <Typography variant="body2" color="text.secondary">
                          {activity.date}
                        </Typography>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                          <Typography variant="body2" color="white">
                            {activity.id}
                          </Typography>
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primaryTypographyProps={{ variant: "body1" }}>
                        {activity.action}
                      </ListItemText>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </div>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProfileComponent;
