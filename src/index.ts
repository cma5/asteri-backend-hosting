import express, { Express } from "express";
import dotenv from "dotenv";
import studyRoutes from "./routes/studyRoutes";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

app.use(cors());

app.use(bodyParser.json());
app.use(studyRoutes);