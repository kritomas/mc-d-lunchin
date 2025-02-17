import { useState } from "react";
import { Card, CardHeader, CardContent, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.identifier,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      console.log("Login successful", data);
      // Redirect to profile page after successful login
      navigate("/profile");
    } catch (error) {
      console.error("Login failed:", error.message);
      // You can show an error message to the user here
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <Card sx={{ maxWidth: '400px', padding: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        <CardHeader titleTypographyProps={{ variant: 'h2', gutterBottom: true }}>
          <h2 className="text-xl font-semibold">Login</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              fullWidth
              type="text"
              name="identifier"
              label="Username"
              value={formData.identifier}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              type="password"
              name="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Button fullWidth variant="contained" type="submit">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
