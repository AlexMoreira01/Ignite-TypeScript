import { request, response, Router } from "express";
import multer from "multer";

import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { importCategoryController } from "../modules/cars/useCases/importCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories"; // Como é um index nao precisa indicar importação

const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp",
});

//           categories agora é passsado direto no server.ts foi movido para index.ts / nao ira precisar colocar categories ois seu path inicial esta em server.ts
categoriesRoutes.post("/", (request, response) => {
    return createCategoryController.handle(request, response);
    // chamadno o handle de createCategoryController dele passando request e response
});

categoriesRoutes.get("/", (request, response) => {
    return listCategoriesController.handle(request, response);
    // Chamando
});
// file == nome reconhecido pelo insominia
categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
    return importCategoryController.handle(request, response);
    // Passando para o handle de importCategory o request e response
});

export { categoriesRoutes };
