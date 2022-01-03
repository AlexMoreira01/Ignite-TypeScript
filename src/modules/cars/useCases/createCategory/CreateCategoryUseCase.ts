import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}

    execute({ description, name }: IRequest): void {
        const categoryAlreadExists = this.categoriesRepository.findByName(name);

        if (categoryAlreadExists) {
            throw new Error("Category ja existente");
        }

        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
