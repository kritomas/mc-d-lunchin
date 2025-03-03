import React, { useState, useEffect } from "react";

const ReviewComponent = () => {
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load the selected lunch ID from localStorage.
  const id = localStorage.getItem("selectedLunchId");

  useEffect(() => {
    if (!id) {
      console.error("No selectedLunchId found in localStorage.");
      setLoading(false);
      return;
    }
    
    async function fetchReview() {
      const endpoint = `/api/food_review/${id}`;
      console.log(`Starting fetch for review data from ${endpoint}`);
      
      try {
        const response = await fetch(endpoint);
        console.log("Received response. Status:", response.status);

        // Log all response headers for debugging.
        for (let pair of response.headers.entries()) {
          console.log(`${pair[0]}: ${pair[1]}`);
        }

        const contentType = response.headers.get("content-type");
        console.log("Response Content-Type:", contentType);

        if (contentType && contentType.indexOf("application/json") !== -1) {
          console.log("Content type indicates JSON. Parsing response as JSON.");
          const data = await response.json();
          console.log("Raw JSON data received:", data);

          // When the API returns a double array [ [ reviewObjects ], [metadata] ],
          // extract the first review object.
          let extractedReview;
          if (
            Array.isArray(data) &&
            data.length > 0 &&
            Array.isArray(data[0]) &&
            data[0].length > 0
          ) {
            extractedReview = data[0][0];
          } else if (Array.isArray(data) && data.length > 0) {
            extractedReview = data[0];
          } else {
            extractedReview = data;
          }
          console.log("Extracted Review:", extractedReview);
          setReview(extractedReview);
        } else {
          console.error("Expected JSON response, but got non-JSON response. Logging raw text:");
          const text = await response.text();
          console.error("Raw response text:", text);
        }
      } catch (error) {
        console.error("Error fetching review data:", error);
      } finally {
        console.log("Fetch operation finished.");
        setLoading(false);
      }
    }

    fetchReview();
  }, [id]);

  // Define a container style with a white background and black text
  const containerStyle = {
    backgroundColor: "white",
    color: "black",
    padding: "16px",
    minHeight: "100vh",
  };

  if (loading) {
    console.log("Component is loading review data...");
    return <div style={containerStyle}>Loading...</div>;
  }

  if (!id) {
    return (
      <div style={containerStyle}>
        No selected lunch ID found in localStorage. Please select a lunch to review.
      </div>
    );
  }

  if (!review) {
    console.log("No review found.");
    return <div style={containerStyle}>No review was found.</div>;
  }

  console.log("Rendering component with review:", review);

  return (
    <div style={containerStyle}>
      
      <div style={{ border: "1px solid #ccc", padding: "12px", marginBottom: "12px" }}>
        <h3>{review.name}</h3>
        <p>
          <strong>Type:</strong> {review.type}
        </p>
        <p>
          <strong>Rating:</strong> {review.rating}
        </p>
        <p>
          <strong>Comment:</strong> {review.comment}
        </p>
        <p>
          <strong>Portion Size:</strong> {review.portion_size}
        </p>
        <p>
          <strong>Temperature:</strong> {review.temperature}
        </p>
        <p>
          <strong>Appearance:</strong> {review.appearance}
        </p>
        <p>
          <strong>Extra Pay:</strong> {review.extra_pay}
        </p>
        <p>
          <strong>Cook Recommendation:</strong> {review.cook_recommendation}
        </p>
        <p>
          <strong>Original Created:</strong>{" "}
          {new Date(review.original_created_date).toLocaleString()}
        </p>
        <p>
          <strong>Last Updated:</strong>{" "}
          {new Date(review.last_update_date).toLocaleString()}
        </p>
        <p>
          <strong>Lunch Date:</strong>{" "}
          {new Date(review.date).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default ReviewComponent;
