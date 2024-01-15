import express, { Express } from "express";
import dotenv from "dotenv";
import studyRoutes from "./routes/studyRoutes";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

import * as swaggerDocument from "./swagger.json";
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, { customCssUrl: CSS_URL }));

app.use(bodyParser.json());
app.use(studyRoutes);