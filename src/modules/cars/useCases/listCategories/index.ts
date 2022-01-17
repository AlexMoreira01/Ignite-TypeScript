import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

const categoriesRepository = null; // Não depende de ninguem
const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository); // Depende do Repositorio
const listCategoriesController = new ListCategoriesController(
    listCategoriesUseCase
); // Depende do UseCase

export { listCategoriesController };
