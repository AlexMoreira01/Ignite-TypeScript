import { container } from "tsyringe";

import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository";
import { SpecificationsRepository } from "../../modules/cars/repositories/implementations/SpecificationsRepository";
import { ISpecificationsRepository } from "../../modules/cars/repositories/ISpecificatiosRepository";

// Singleton => para se ter apenas uma instancia
container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository", // Nome do Container
    CategoriesRepository // Classe a ser chamada toda vez que o nome for chamado
);

container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository", // Nome do Container
    SpecificationsRepository // Classe a ser chamada toda vez que o nome for chamado
);
