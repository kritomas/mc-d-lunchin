import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const ReviewPerUser = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Retrieve the user id from cookies (adjust the cookie name if needed)
  const userId = Cookies.get("userId");

  async function getUserReviews() {
    if (!userId) {
      setError("User ID not found in cookies. Please log in.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/food_review/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        let errorMessage = "Failed to fetch user reviews.";
        try {
          const errorData = await response.json();
          errorMessage = errorData?.message || errorMessage;
        } catch (parseErr) {
          console.error("Error parsing error response:", parseErr);
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      // Log the response for debugging purposes
      console.log("API response data:", data);

      let reviewsArray = [];
      // Case 1: The API returns an array directly
      if (Array.isArray(data)) {
        reviewsArray = data;
      }
      // Case 2: The API returns an object with success flag and a "message" field that holds reviews
      else if (data.success === true && Array.isArray(data.message)) {
        reviewsArray = data.message;
      }
      // Case 3: The API returns an object with success flag and a "reviews" field that holds reviews
      else if (data.success === true && Array.isArray(data.reviews)) {
        reviewsArray = data.reviews;
      } else {
        // If none of the expected formats match, throw an error
        throw new Error("Unknown error from API, unexpected response structure.");
      }

      setReviews(reviewsArray);
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
          {reviews.map((review, index) => (
            <li key={index}>
              <h4>{review.name}</h4>
              <p>Last Updated: {review.last_update_date}</p>
              <p>Rating: {review.rating}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewPerUser;
