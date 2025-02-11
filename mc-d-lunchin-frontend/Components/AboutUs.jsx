import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { useState, useEffect } from "react";

const AboutUs = () => {
    const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [
    "your skibid",
    "super rewies",
    "is cool as fuck",
  ];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex((prevIndex) => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };
  return (
    <Card 
      sx={{ 
        maxWidth: '800px', 
        margin: '20px auto', 
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}
    >
      <CardContent>
      <h1>
              {"MC D. Lunchin "}
              <span className="wrap">{text}</span>
            </h1>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            mb: 4
          }}
        >
          <Typography 
            variant="h3" 
            component="h2" 
            sx={{ 
              ml: 2,
              fontWeight: 'bold',
              color: '#333'
            }}
          >
        
          </Typography>
        </Box>

        <Typography 
          variant="h4" 
          component="h3" 
          sx={{ 
            mb: 2,
            color: '#333',
            textAlign: 'center'
          }}
        >
          About Us
        </Typography>
        <Box sx={{ mb: 4 }}>
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            We're on a mission to make school lunches better for everyone. Our platform allows students, parents, and schools to share feedback about school meals in a fun and constructive way.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Our Story
          </Typography>
          <Typography variant="body1">
            MC D. Lunch was created by a group of students who wanted to make a difference in their school's lunch program. We believe that by sharing feedback and ratings, we can help improve the quality and variety of school meals.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Our Mission
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <RestaurantMenuIcon sx={{ color: '#333' }} />
            <Typography variant="body1">
              To provide a platform where students can rate and review school lunches in a fun and engaging way.
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Our Vision
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <PsychologyIcon sx={{ color: '#333' }} />
            <Typography variant="body1">
              To create a community of students, parents, and schools working together to improve school lunches nationwide.
            </Typography>
          </Box>
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          <Button 
            variant="contained" 
            href="/signin" 
            sx={{ mt: 2 }}
          >
           Sign In
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AboutUs;
