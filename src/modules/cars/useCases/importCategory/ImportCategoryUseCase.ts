import { parse } from "csv-parse";
import fs from "fs"; // FileSystem

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
    name: string;
    description: string;
}

class ImportCategoryUseCase {
    // Receber o repositorio // quando se tem ele aqui é preciso instanciar no index
    constructor(private categoriesRepository: ICategoriesRepository) {}
    // Retorno do tipo:
    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            // createReadStream ela que permite a leitura em partes do arquivo e precisa recever o path do arquivo
            const stream = fs.createReadStream(file.path); // Criando uma stream desse arquivo
            const categories: IImportCategory[] = [];

            const parseFile = parse(); // Le linha por linha na função on

            // pipe pega o que esta sendo lido e dentro dele ele passa oque foi lido para outro lugar que nos determinos
            // pipe === se tem o aquivo em stream e utiliza ele para cada pedaço lido ele envia para oonde determinamos
            stream.pipe(parseFile); // Pega o pedaço lido do arquivo e passa para o parseFile

            parseFile
                .on("data", async (line) => {
                    // Vai receber as linhas que ele esta lendo e toda linha lida e salva

                    // ["name", "description"]  retorno // cada posição do array ele poem na variavel da destruturação
                    const [name, description] = line;
                    categories.push({
                        name,
                        description,
                    });
                })
                // Quadno é finalizado      Agora espera a finaliza~]ao para dps dar o retorno com a callback
                .on("end", () => {
                    fs.promises.unlink(file.path);
                    resolve(categories);
                })
                .on("error", (err) => {
                    reject(err);
                });
        });
    }

    async execute(file: Express.Multer.File): Promise<void> {
        // quadno se usa async await e preciso definir a promisse como retorno

        const categories = await this.loadCategories(file);

        categories.map(async (category) => {
            // Percorre o array item por item permite manipulaçoes
            const { name, description } = category;

            const existCategory = this.categoriesRepository.findByName(name);

            if (!existCategory) {
                this.categoriesRepository.create({
                    name,
                    description,
                });
            }
        });
    }
}

export { ImportCategoryUseCase };
