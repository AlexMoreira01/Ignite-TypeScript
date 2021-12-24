import { Request, Response } from "express";

import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
    // Construtor que recebe o que foi passado nesse caso o importCategoryUseCase do mesmo tipo da classe do outro arquivo
    constructor(private importCategoryUseCase: ImportCategoryUseCase) {}

    handle(request: Request, response: Response): Response {
        const { file } = request;

        // Quando se cria o construtor do tipo da classe é como se a variavel agora possuisse todos os metodos daquela classe
        this.importCategoryUseCase.execute(file);
        return response.send();
    }
}

export { ImportCategoryController };
