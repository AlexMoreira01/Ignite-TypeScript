import { request, response, Router } from "express";

import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories"; // Como é um index nao precisa indicar importação

const categoriesRoutes = Router();

//           categories agora é passsado direto no server.ts/ nao ira precisar colocar categories ois seu path inicial esta em server.ts
categoriesRoutes.post("/", (request, response) => {
    return createCategoryController.handle(request, response);
    // chamadno o handle de createCategoryController dele passando request e response
});

categoriesRoutes.get("/", (request, response) => {
    return listCategoriesController.handle(request, response);
    // Chamando
});

export { categoriesRoutes };
