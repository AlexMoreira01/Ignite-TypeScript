// Importar todas as rotas existentes
import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { categoriesRoutes } from "./categories.routes";
import { specicationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

// sempre iniciara com categorie agora
router.use("/categories", categoriesRoutes); // Middlewares rota caregories
router.use("/specifications", specicationsRoutes); // Middlewares rota caregories
router.use("/users", usersRoutes);
router.use(authenticateRoutes); // passsar somente com / sem chamar outro sem o path

export { router };
