import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    car_id: string;
    specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
    constructor(
        @inject("CarsRepository") // atribuindo a carsRepository uma instancia do repositorio
        private carsRepository: ICarsRepository, // esse orivate carsRepository é  do tipo IcarsRepository portanto ele possui os metodos la criados // e é injetado nele o repositorio no qual ele ira usar os metodos para executar

        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository
    ) {}

    async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
        const carExists = await this.carsRepository.findById(car_id);

        if (!carExists) {
            throw new AppError("Car does not exitst!");
        }

        // Buscas das especificações pelo id -- array de ibjeos do findByIds
        const specifications = await this.specificationsRepository.findByIds(
            specifications_id
        );

        // Alterar o valor de specification dentro da tabela do carro encontrado passando os ids das specificaçõe encotradas
        carExists.specifications = specifications;

        // Update no parametro de carros
        await this.carsRepository.create(carExists);

        return carExists;
    }
}

export { CreateCarSpecificationUseCase };
