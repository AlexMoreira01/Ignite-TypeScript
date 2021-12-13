import { Category } from "../model/Category";

// DTO => Data transfer object == criar um objeto que é responsavel pela transferencia de dados entre uma classe e outra toda vez que for criar e receber infos da rotas se criara um DPO par apegar o valores das rotas e recebeer nos repostorios
interface ICreateCategoryDTO {
    // No eslinti esta definido que toda interface deve se comecar com I sao regras definidas por nos
    // I == interface/ Create == O que ela fata / Category == recurso / DTO //  Ela recebe a baixo os itens:
    name: string;
    description: string;
}

interface ICategoriesRepository {
    findByName(name: string): Category;
    list(): Category;
    create({ name, description }: ICreateCategoryDTO): void;
    // Utilizar a interface aqui
}

export { ICategoriesRepository, ICreateCategoryDTO };
