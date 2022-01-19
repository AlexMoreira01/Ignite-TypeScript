import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {
    // inject é passada no construtor
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) {}

    async execute({ description, name }: IRequest): Promise<void> {
        const categoryAlreadExists = await this.categoriesRepository.findByName(
            name
        );

        if (categoryAlreadExists) {
            throw new Error("Category ja existente");
        }

        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
