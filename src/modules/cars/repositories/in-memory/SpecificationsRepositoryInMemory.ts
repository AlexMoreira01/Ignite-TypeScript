import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import {
    ICreateSpecificationDTO,
    ISpecificationsRepository,
} from "../ISpecificationsRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
    private specifications: Specification[] = [];

    async create({
        description,
        name,
    }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = new Specification();

        Object.assign(specification, {
            description,
            name,
        });
        this.specifications.push(specification);

        return specification;
    }
    async findByName(name: string): Promise<Specification> {
        return this.specifications.find(
            (specification) => specification.name === name
        );
    }
    async findByIds(ids: string[]): Promise<Specification[]> {
        const allSpecifiations = this.specifications.filter((specification) =>
            ids.includes(specification.id)
        );
        // includes é usado para pegar os ids que estao inclusos dentro do array ids
        // se consegue os objetos das specifications
        return allSpecifiations;
    }
}

export { SpecificationsRepositoryInMemory };
