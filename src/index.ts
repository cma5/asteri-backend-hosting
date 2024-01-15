import express, { Express } from "express";
import dotenv from "dotenv";
import studyRoutes from "./routes/studyRoutes";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import * as swaggerDocument from "./swagger.json";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.json());
app.use(studyRoutes);