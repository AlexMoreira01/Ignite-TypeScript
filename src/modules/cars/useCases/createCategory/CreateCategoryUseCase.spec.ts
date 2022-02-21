import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

// Agrupar os testes
describe("Create Category", () => {
    // Antes de algum teste ele ira fazer essa função -- ira instanciar as duas variaveis acima
    beforeEach(() => {
        // Repositorio em memoria pois esse teste nao testa coneçoes com banco de dados
        // Quadno estamos usando interfaces podemos criar nossa propria implementação baseada na interface -- podemos usar repositorys difrentes dos do containers
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(
            categoriesRepositoryInMemory // Utilizando mesma instancia do repositorio não se tem problemas de uma hora ser crido e outra não conseguir criar
        ); // passando o repositorio para o use case como faziamos no inicio
    });

    // Ocorrem testes isolados para que cada metodo tenha a garantia que esta funcionando corretamente
    // A cada vez que um teste e executado os dados aparentam ser zerados, sendo os dados unicos criados em cada teste

    // Testando o caso de sucesso -- criação de categoria
    it("should be able to create a new category", async () => {
        // Criando um objeto de categoria que não tem um id
        const category = {
            // Ira utiliza o name em dois luagres
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
