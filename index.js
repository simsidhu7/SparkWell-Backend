import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.listen(PORT, () =>
  console.log(`The server is running on http://localhost:${PORT}`)
);
