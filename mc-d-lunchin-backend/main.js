import express from "express";
import cors from "cors";
import {LoginUser} from "./login.js";

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

app.use(express.static("dist"));

app.listen(PORT, () =>
{
	console.log("mc-d-lunchin backend listening at " + PORT);
});