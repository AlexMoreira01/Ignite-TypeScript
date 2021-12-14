// Importar todas as rotas existentes
import { Router } from "express";

import { categoriesRoutes } from "./categories.routes";
import { specicationsRoutes } from "./specifications.routes";

const router = Router();

// sempre iniciara com categorie agora
router.use("/categories", categoriesRoutes); // Middlewares rota caregories
router.use("/specifications", specicationsRoutes); // Middlewares rota caregories

export { router };
