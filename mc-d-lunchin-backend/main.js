import express from "express";
import cors from "cors";
import {LoginUser} from "./login.js";
import {getAllFoodData} from "./Food_filter.js";
import {createReview, updateReview} from "./review.js";

const PORT = 42069;
const app = express();
app.use(cors());
app.use(express.json());

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

app.post("/api/review", async (req, res, next) =>
{
	try
	{
		const {user_id, food_id, rating, comment, portion_size, temperature, appearance, extra_pay, cook_recommendation} = req.body;
		const result = await createReview(user_id, food_id, rating, comment, portion_size, temperature, appearance, extra_pay, cook_recommendation);
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
app.patch("/api/review", async (req, res, next) =>
{
	try
	{
		const {id, rating, comment, portion_size, temperature, appearance, extra_pay, cook_recommendation} = req.body;
		const result = await updateReview(id, rating, comment, portion_size, temperature, appearance, extra_pay, cook_recommendation);
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

app.listen(PORT, () =>
{
	console.log("mc-d-lunchin backend listening at " + PORT);
});