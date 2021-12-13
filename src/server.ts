import express, { request, response } from "express";

import { categoriesRoutes } from "./routes/categories.routes";

const app = express();

app.use(express.json());
// sempre iniciara com categorie agora
app.use("/categories", categoriesRoutes); // Middlewares rota caregories

app.listen(3333, () => console.log("Server is running!"));
