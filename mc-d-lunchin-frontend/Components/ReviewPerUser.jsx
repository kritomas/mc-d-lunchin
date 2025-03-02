import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const ReviewPerUser = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Retrieve the user id from cookies (adjust the cookie name if needed)
  const userId = Cookies.get("userId");

  // Function to fetch reviews by sending the user id in the request body.
  async function getUserReviews() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/review", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // Send the user id in the body of the GET request
        body: JSON.stringify({ user_id: userId }),
      });

      if (!response.ok) {
        // If not okay, try to extract error details from the response.
        let errorMessage = "Failed to fetch user reviews.";
        try {
          const errorData = await response.json();
          errorMessage = errorData?.message || errorMessage;
        } catch (parseErr) {
          console.error("Error parsing error response:", parseErr);
        }
        throw new Error(errorMessage);
      }

      // Parse the JSON response
      try {
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("Unexpected data format received.");
        }
        setReviews(data);
      } catch (jsonError) {
        console.error("Error parsing JSON response:", jsonError);
        throw new Error("Invalid server response.");
      }
    } catch (err) {
      console.error("Error fetching user reviews:", err);
      setError(err.message || "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (userId) {
      getUserReviews();
    } else {
      setError("User ID not found in cookies. Please log in.");
    }
  }, [userId]);

  return (
    <div>
      <h2>User Reviews</h2>
      {loading && <p>Loading reviews...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!loading && !error && reviews.length === 0 && (
        <p>No reviews available.</p>
      )}
      {!loading && !error && reviews.length > 0 && (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <h4>{review.title}</h4>
              <p>{review.date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewPerUser;
