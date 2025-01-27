import express from "express";
import cors from "cors";

const PORT = 42069;
const app = express();
app.use(cors())

app.listen(PORT, () =>
{
	console.log("mc-d-lunchin backend listening at " + PORT);
})