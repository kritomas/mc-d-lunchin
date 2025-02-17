import { DBConnection } from './DBC.js';

// Function to create a review and insert into DB
export async function createReview(user_id, food_id, rating, comment, portion_size, temperature, appearance, extra_pay, cook_recommendation) {
    // Validation checks
    if (rating < 0 || rating > 100) {
        return { success: false, message: 'Rating must be between 0 and 100.' };
    }
    if (appearance < 0 || appearance > 5) {
        return { success: false, message: 'Appearance must be between 0 and 5.' };
    }

    const allowedPortionSizes = ['hladový', 'akorát', 'přejedený'];
    const allowedTemperatures = ['ledový', 'studené', 'akorát', 'horký', 'vařící'];
    const allowedRecommendations = ['vařit', 'nevařit'];

    if (!allowedPortionSizes.includes(portion_size)) {
        return { success: false, message: 'Invalid portion size.' };
    }
    if (!allowedTemperatures.includes(temperature)) {
        return { success: false, message: 'Invalid temperature.' };
    }
    if (!allowedRecommendations.includes(cook_recommendation)) {
        return { success: false, message: 'Invalid cook recommendation.' };
    }

    // Create the review object
    const review = {
        user_id,
        food_id,
        rating,
        comment,
        portion_size,
        temperature,
        appearance,
        extra_pay,
        cook_recommendation
    };

    // Insert the review into the database
    const query = `INSERT INTO review (user_id, food_id, rating, comment, portion_size, temperature, appearance, extra_pay, cook_recommendation)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        review.user_id,
        review.food_id,
        review.rating,
        review.comment,
        review.portion_size,
        review.temperature,
        review.appearance,
        review.extra_pay,
        review.cook_recommendation,
    ];

    try{
        await DBConnection.execute(query, values);
        return { success: true, message: 'Review created successfully!'};
    }catch(exeption){
        return { success: false, message: exeption.message };
    }
}

export async function updateReview(id, rating, comment, portion_size, temperature, appearance, extra_pay, cook_recommendation) {
    // Validation checks
    if (rating < 0 || rating > 100) {
        return { success: false, message: 'Rating must be between 0 and 100.' };
    }
    if (appearance < 0 || appearance > 5) {
        return { success: false, message: 'Appearance must be between 0 and 5.' };
    }

    const allowedPortionSizes = ['hladový', 'akorát', 'přejedený'];
    const allowedTemperatures = ['ledový', 'studené', 'akorát', 'horký', 'vařící'];
    const allowedRecommendations = ['vařit', 'nevařit'];

    if (!allowedPortionSizes.includes(portion_size)) {
        return { success: false, message: 'Invalid portion size.' };
    }
    if (!allowedTemperatures.includes(temperature)) {
        return { success: false, message: 'Invalid temperature.' };
    }
    if (!allowedRecommendations.includes(cook_recommendation)) {
        return { success: false, message: 'Invalid cook recommendation.' };
    }

    // Create the updated review object
    const review = {
        rating,
        comment,
        portion_size,
        temperature,
        appearance,
        extra_pay,
        cook_recommendation
    };

    // Update the review in the database
    const query = `UPDATE review
                   SET rating = ?, comment = ?, portion_size = ?, temperature = ?, appearance = ?, extra_pay = ?, cook_recommendation = ?
                   WHERE id = ?`;

    const values = [
        review.rating,
        review.comment,
        review.portion_size,
        review.temperature,
        review.appearance,
        review.extra_pay,
        review.cook_recommendation,
        id
    ];

    try {
        const result = await DBConnection.execute(query, values);
        return { success: true, message: 'Review updated successfully!' };
    } catch (exception) {
        return { success: false, message: exception.message };
    }
}



/* // Sample data
const user_id = 7;
const food_id = 12;
const rating = 85;
const comment = "The food was tasty, but a bit cold.";
const portion_size = 'akorát';
const temperature = 'studené';
const appearance = 4;
const extra_pay = 50;
const cook_recommendation = 'nevařit';

// Call the createReview function
async function submitReview() {
    const result = await createReview(user_id, food_id, rating, comment, portion_size, temperature, appearance, extra_pay, cook_recommendation);
    if (result.success) {
        console.log(result.message); // Review created successfully!
    } else {
        console.log(result.message); // Display error message
    }
}

submitReview(); */

/* // Sample data
const id = 4;
const rating = 85;
const comment = "The food was tasty, but a bit cold.";
const portion_size = 'akorát';
const temperature = 'studené';
const appearance = 4;
const extra_pay = 50;
const cook_recommendation = 'nevařit';

// Call the createReview function
async function submitReview() {
    const result = await updateReview(id, rating, comment, portion_size, temperature, appearance, extra_pay, cook_recommendation);
    if (result.success) {
        console.log(result.message); // Review created successfully!
    } else {
        console.log(result.message); // Display error message
    }
}

submitReview(); */