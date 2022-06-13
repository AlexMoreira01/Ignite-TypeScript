import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {
    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(
            categoriesRepositoryInMemory
        );
    });

    // Testando o caso de sucesso -- criação de categoria
    it("should be able to create a new category", async () => {
        // Criando um objeto de categoria que não tem um id
        const category = {
            name: "Category Test",
            description: "Category description Test",
        };

        // Salvando a categoria
        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        });

        // verificar se a categoria de fato foi salva --  se ela foi salva ela tera um id para o expect
        const categoryCreated = await categoriesRepositoryInMemory.findByName(
            category.name
        );

        // experado que tenha a propriedade
        expect(categoryCreated).toHaveProperty("id");
    });

    // Garantindo que se vier uma gategoria ja existente ele não fara o cadastro
    it("should not be able to create a new category with name exists", async () => {
        expect(async () => {
            const category = {
                name: "Category Test",
                description: "Category description Test",
            };

            // Ira salvar da primeira vez
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });

            // Na segunda ele deve dar erro
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });
        }).rejects.toBeInstanceOf(AppError);
        // Espera que se ele for rejeitado ele seja de uma instancia do appError
    });
});
