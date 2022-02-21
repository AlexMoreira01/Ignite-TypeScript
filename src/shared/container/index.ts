import { container } from "tsyringe";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificatiosRepository";

// Singleton => para se ter apenas uma instancia
container.registerSingleton<ICategoriesRepository>( // o register singleton sera a interface
    "CategoriesRepository", // Nome do Container
    CategoriesRepository // Classe a ser chamada toda vez que o nome for chamado
);

container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository", // Nome do Container
    SpecificationsRepository // Classe a ser chamada toda vez que o nome for chamado
);

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);
