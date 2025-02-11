import { DBConnection } from './DBC.js';

// 1. Returns ID of food where category IN (provided categories)
async function getFoodByCategoryIn(categories, callback) {
    const pool = await DBConnection();
    const query = 'SELECT id FROM Food_Join WHERE name IN (?)';
    let result =  await pool.query(query, [categories]);
    return result[0]
}

// 2. Returns ID of food where category NOT IN (provided categories)
async function getFoodByCategoryNotIn(categories, callback) {
    const pool = await DBConnection();
    const query = 'SELECT id FROM Food_Join WHERE name NOT IN (?)';
    let result = await pool.query(query, [categories]);
    return result[0]
}

// 3. Returns ID of food where type IN (provided types)
async function getFoodByTypeIn(types, callback) {
    const pool = await DBConnection();
    const query = 'SELECT id FROM Food_Join WHERE type IN (?)';
    let result = await pool.query(query, [types]);
    return result[0]
}

// 5. Returns ID of food where vegetarian = TRUE or FALSE based on input
async function getFoodByVegetarian(isVegetarian, callback) {
    const pool = await DBConnection();
    const query = 'SELECT id FROM Food_Join WHERE is_vegetarian = ?';
    let result = await pool.query(query, [isVegetarian ? 1 : 0]);
    return result[0]
}

async function getAllFoodData(categoriesIn, categoriesNotIn, typesIn, typesNotIn, isVegetarian) {
    // Step 1: Get all the food data
    const foodByCategoryIn = await getFoodByCategoryIn(categoriesIn);
    const foodByCategoryNotIn = await getFoodByCategoryNotIn(categoriesNotIn);
    const foodByTypeIn = await getFoodByTypeIn(typesIn);
    const foodByVegetarian = await getFoodByVegetarian(isVegetarian);

    // Map the results to ids
    let finalList = foodByCategoryIn.map(item => item.id);

    // Step 2: Remove items that are in foodByCategoryNotIn
    const categoryNotInSet = new Set(foodByCategoryNotIn.map(item => item.id));
    finalList = finalList.filter(id => !categoryNotInSet.has(id));

    // Step 3: Keep only items that are in foodByTypeIn
    const typeInSet = new Set(foodByTypeIn.map(item => item.id));
    finalList = finalList.filter(id => typeInSet.has(id));


    // Step 5: Keep only items that are in foodByVegetarian
    const vegetarianSet = new Set(foodByVegetarian.map(item => item.id));
    finalList = finalList.filter(id => vegetarianSet.has(id));

    return finalList;
}

async function exampleCall() {
    // Define the categories, types, and vegetarian flag you want to use
    const categoriesIn = ['Slané']; // Categories to include
    const categoriesNotIn = ['Umami'];           // Categories to exclude
    const typesIn = ['hlavní jídlo'];                        // Types to include
    const isVegetarian = true;                        // Whether to include vegetarian items

    // Call getAllFoodData and await its result
    const result = await getAllFoodData(categoriesIn, categoriesNotIn, typesIn, isVegetarian);

    // Log the result
    console.log("Final filtered food IDs:", result);
}

// Call the example function
exampleCall();
