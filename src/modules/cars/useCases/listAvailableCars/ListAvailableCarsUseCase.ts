import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

interface IRequest {
    category_id?: string;
    brand?: string;
    name?: string;
}

// Quando queremos injetar o repositorio é o inject
// Quando queremos que o useCase seja injetado é o injectable

@injectable() // injetado pelo controller
class ListAvailableCarsUseCase {
    constructor(
        @inject("CarsRepository") // Colocando no private
        private carsRepository: ICarsRepository
    ) {}

    async execute({ category_id, brand, name }: IRequest): Promise<Car[]> {
        const cars = await this.carsRepository.findAvailable(
            brand,
            category_id,
            name
        );
        return cars;
    }
}

export { ListAvailableCarsUseCase };
