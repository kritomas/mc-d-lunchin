import express from "express";
import cors from "cors";
import {LoginUser} from "./login.js";
import {getAllFoodData} from "./Food_filter.js";
import {createReview, updateReview} from "./review.js";

const PORT = 42069;
const app = express();
app.use(cors());
app.use(express.json());

/**
 * Login endpoint.
 *
 * Input: {"username": "string", "password": "string"}
 * Output: {"id": integer} // id = id of user that logged in
 */
app.put("/api/user", async (req, res, next) => // Login endpoint
{
	try
	{
		const {username, password} = req.body;
		const result = await LoginUser(username, password);
		if (result.success)
		{
			res.status(200).send({id: result.userId});
		}
		else
		{
			res.status(500).send(result.message);
		}
	}
	catch (e)
	{
		next(e);
	}
});

/**
 * Get Foods.
 *
 * Input: {"category_whitelist": [One or more of categories], "category_blacklist": [One or more of categories], "type": ['polévká','hlavní jídlo','dezert','jiný'], "is_vegetarian": boolean}
 * Output: [Foods]
 */
app.put("/api/food", async (req, res, next) =>
{
	try
	{
		const {category_whitelist, category_blacklist, type, is_vegetarian} = req.body;
		const result = await getAllFoodData(category_whitelist, category_blacklist, type, is_vegetarian);
		res.status(200).send(result);
	}
	catch (e)
	{
		next(e);
	}
});
app.get("/api/food/:id", async (req, res, next) =>
{
	try
	{
		const id = req.params.id;
		// TODO
	}
	catch (e)
	{
		next(e);
	}
});

/**
 * Post a new Review.
 *
 * Input: {"user_id": integer, "food_id": integer, "rating": 0-100, "comment": "string", "portion_size": ['hladový', 'akorát', 'přejedený'], "temperature": ['ledový', 'studené', 'akorát', 'horký', 'vařící'], "appearance": 0-5, "tip": integer, "cook_recommendation": ['vařit', 'nevařit']}
 * Output: "string"
 */
app.post("/api/review", async (req, res, next) =>
{
	try
	{
		const {user_id, food_id, rating, comment, portion_size, temperature, appearance, tip, cook_recommendation} = req.body;
		const result = await createReview(user_id, food_id, rating, comment, portion_size, temperature, appearance, tip, cook_recommendation);
		if (result.success)
		{
			res.status(200).send(result.message); // TODO Return ID of review
		}
		else
		{
			res.status(500).send(result.message);
		}
	}
	catch (e)
	{
		next(e);
	}
});
/**
 * Update an existing Review.
 *
 * Input: {"id": integer, "rating": 0-100, "comment": "string", "portion_size": ['hladový', 'akorát', 'přejedený'], "temperature": ['ledový', 'studené', 'akorát', 'horký', 'vařící'], "appearance": 0-5, "tip": integer, "cook_recommendation": ['vařit', 'nevařit']}
 * Output: "string"
 */
app.patch("/api/review", async (req, res, next) =>
{
	try
	{
		const {id, rating, comment, portion_size, temperature, appearance, tip, cook_recommendation} = req.body;
		const result = await updateReview(id, rating, comment, portion_size, temperature, appearance, tip, cook_recommendation);
		if (result.success)
		{
			res.status(200).send(result.message);
		}
		else
		{
			res.status(500).send(result.message);
		}
	}
	catch (e)
	{
		next(e);
	}
});

app.use(express.static("dist"));

app.get('*', (req, res) =>
{
	res.sendFile("/media/localdisk/git/Praktikum/mc-d-lunchin/mc-d-lunchin-backend/dist/index.html");
});

app.listen(PORT, () =>
{
	console.log("mc-d-lunchin backend listening at " + PORT);
});