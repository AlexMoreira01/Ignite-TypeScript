import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

class ListAvailableCarsController {
    async handle(request: Request, response: Response): Promise<Response> {
        // Request.body ==  parte de criação
        // para pesquisa se usa os params => localhost:3333/rota/param1/param2 -- forma obrigatoria
        // o parametro tem de ser deixado de forma obrigatoria
        const { brand, name, category_id } = request.query;
        // Colocando dentro dos querys de request pq podemos colocar eles para serem pegos e eles podem ser opcionais dentro da busca

        const listAvailableCarsUseCase = container.resolve(
            ListAvailableCarsUseCase
        );

        const cars = await listAvailableCarsUseCase.execute({
            // força que sejam strings
            brand: brand as string,
            name: name as string,
            category_id: category_id as string,
        });

        return response.json(cars);
    }
}

export { ListAvailableCarsController };
