"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const studyRoutes_1 = __importDefault(require("./routes/studyRoutes"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
app.use((0, cors_1.default)());
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup({
    customCss: '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
    customCssUrl: CSS_URL,
}));
app.use(body_parser_1.default.json());
app.use(studyRoutes_1.default);
