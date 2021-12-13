import { Category } from "../model/Category";
import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from "./ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
    //              modelo da models    // categories é um atriburo da classe nao esta dentro de um metodo deve se coloca o tipo de acesso
    private categories: Category[]; // Retirou a responsabilidade de iniciar da variavel e passou para o construtc

    constructor() {
        this.categories = []; // Inicialização
        // Chamar os atributos de dentro da classe se usa o this
    }
    // Antes era definido aqui o que iria receber // deve se adicionar no notion os metodos nao eficazes
    // Ira receber um objeto do tipo ICreateCategoryDTO //   Tipo da função pe void == nao tera retorno nenhum
    create({ description, name }: ICreateCategoryDTO): void {
        // Responsavel por cadastrar a categorira na tabela
        const category = new Category(); // Quando se da o new consegue chamar o construtor para criação do id
        // Passadno um objeto e dps os atributos que seram passados para dentro de category
        Object.assign(category, {
            name,
            description,
            created_at: new Date(),
        }); // Tudo que for colocado dentro do assing vai ser atribuido ao objeto que foi criado agora

        /* ANTES ESTAVA ASSIM MAS É UM METODO NAO TAO BOM  
        category.name = name;
        category.description = description;
        category.created_at = new Date();
        */

        this.categories.push(category);
    }

    // Retornauma lista de categorias
    list(): Category[] {
        return this.categories;
    }

    findByname(name: string): Category {
        const category = this.categories.find(
            (category) => category.name === name
        );
        return category;
    }

    // const categoriesRepository = new CategoriesRepository()  quando fizer isso em outro documento o categories sera inicializado chamando o construtor que fara a criaçaõ
}

export { CategoriesRepository };
