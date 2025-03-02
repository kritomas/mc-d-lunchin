import { DBConnection } from './DBC.js';

// 1. Returns ID of food where category IN (provided categories)
async function getFoodByCategoryIn(categories, callback) {
    const query = 'SELECT id FROM Food_Join WHERE name IN (?)';
    let result =  await DBConnection.query(query, [categories]);
    return result[0]
}

// 2. Returns ID of food where category NOT IN (provided categories)
async function getFoodByCategoryNotIn(categories, callback) {
    const query = 'SELECT id FROM Food_Join WHERE name IN (?)';
    let result = await DBConnection.query(query, [categories]);
    return result[0]
}

// 3. Returns ID of food where type IN (provided types)
async function getFoodByTypeIn(types, callback) {
    const query = 'SELECT id FROM Food_Join WHERE type IN (?)';
    let result = await DBConnection.query(query, [types]);
    return result[0]
}

export async function getAllFoodData(categoriesIn, categoriesNotIn, typesIn, isVegetarian) {
    // Step 1: Get all the food data
    const foodByCategoryIn = await getFoodByCategoryIn(categoriesIn);
    const foodByCategoryNotIn = await getFoodByCategoryNotIn(categoriesNotIn);
    const foodByTypeIn = await getFoodByTypeIn(typesIn);

    const getIds = (array) => new Set(array.map(item => item.id));

    const foodByCategoryInIds = getIds(foodByCategoryIn);
    const foodByCategoryNotInIds = getIds(foodByCategoryNotIn);
    const foodByTypeInIds = getIds(foodByTypeIn);

    // Step 1: Keep only IDs in foodByCategoryIn that are NOT in foodByCategoryNotIn
    const filteredByCategory = [...foodByCategoryInIds].filter(id => !foodByCategoryNotInIds.has(id));
    console.log(filteredByCategory);

    // Step 2: Keep only IDs that are also in foodByTypeIn
    const filteredByType = filteredByCategory.filter(id => foodByTypeInIds.has(id));
    console.log(filteredByType);


    return filteredByType;
}

/* async function exampleCall() {
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
exampleCall(); */
