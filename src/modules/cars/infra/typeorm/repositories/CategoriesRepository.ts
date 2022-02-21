import { getRepository, Repository } from "typeorm";

import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from "@modules/cars/repositories/ICategoriesRepository";

import { Category } from "../entities/Category";

class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;
    // private deixa o acesso restrito a somente essa classe

    constructor() {
        this.repository = getRepository(Category);
        // O repositorio é do tipo getRepository passando a entidade
    }

    async create({ description, name }: ICreateCategoryDTO): Promise<void> {
        // Cria a entidade para ser salva
        const category = this.repository.create({
            description,
            name,
        });

        await this.repository.save(category);
    }

    async list(): Promise<Category[]> {
        const categories = await this.repository.find(); // vai retornar uma promise -- ver ao passar o mouse
        return categories; // Retornando a lista
    }

    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOne({ name });
        return category;
    }
}

export { CategoriesRepository };
