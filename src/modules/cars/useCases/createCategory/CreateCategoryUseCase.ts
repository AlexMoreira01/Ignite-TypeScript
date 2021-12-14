import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

/**
 * [x] Definir o tipo de retorno
 * [x] Alterar retorno de erro
 * [x] Acessar o repositorio
 * [x] Retornar algo
 */

// Service nao conhece o response pois com a troca do frame work ou abordagem tera de alterar em todos
class CreateCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}

    // Metodo responsavel por fazer tudo que o create tem de fazer
    execute({ description, name }: IRequest): void {
        // categoriesREpository é igual a classe e nela se tem a função findbyname
        const categoryAlreadExists = this.categoriesRepository.findByname(name);

        if (categoryAlreadExists) {
            throw new Error("Catrgory ja existente"); // Classe do JavaScript para error
        } // Se existir apresenta o erro se nao permite o cadastro

        this.categoriesRepository.create({ name, description }); // chamar o repostorio passando o name e a description // create é da classe CategoriesRepository
    }
}

export { CreateCategoryUseCase };
