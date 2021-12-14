import { ISpecificationsRepository } from "../../repositories/ISpecificatiosRepository";

interface IRequest {
    name: string; // Recebe
    description: string;
}

class CreateSpecificationUseCase {
    // Ira receber a interface que queremos utilizar
    // se coloca o private para ter acesso ao this para a variavel estar disponivel para toda a classe
    constructor(private specificationsRepository: ISpecificationsRepository) {}
    execute({ name, description }: IRequest): void {
        const specificationAlreadyExists =
            this.specificationsRepository.findByName(name);

        if (specificationAlreadyExists) {
            throw new Error("Speicification already exists");
        }

        this.specificationsRepository.create({
            name,
            description,
        });
    }
}

export { CreateSpecificationUseCase };
