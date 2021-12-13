import { request, response, Router } from "express";

import { CategoriesRepository } from "../modules/cars/repositories/CategoriesRepository";
import { PostgresCategoriesRepository } from "../modules/cars/repositories/PostgresCategoriesRepository";
import { CreateCategoryService } from "../modules/cars/services/CreateCategoryService";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();
// const categoriesRepository = new PostgresCategoriesRepository();

//           categories agora é passsado direto no server.ts/ nao ira precisar colocar categories ois seu path inicial esta em server.ts
categoriesRoutes.post("/", (request, response) => {
    const { name, description } = request.body;

    const createCategoryService = new CreateCategoryService(
        categoriesRepository
    );

    createCategoryService.execute({ name, description });

    return response.status(201).send();
});

categoriesRoutes.get("/", (request, response) => {
    const all = categoriesRepository.list();

    return response.json(all);
});

export { categoriesRoutes };
