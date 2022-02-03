import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token missing", 401);
    }

    // Quando enviar token para a aplicação ele tera
    // Bearer jjfjifjefjeiffje => Bearer é padrao e dps vem o token -- vem nos headers
    // [0] = Bearer / [1] = token / foi qiuebrado pelos space
    const [, token] = authHeader.split(" "); // ignorando a posição 0 e armazenando a 1 em uma variavel token

    try {
        // funtion jsonwebtoken / 1 paramentro o token e o 2 a chave criada em AuthenticateUseCase
        const { sub: user_id } = verify(
            // Mudando nome do sub para user_id
            token,
            "4c2ade7acd1cecdfc6d10e01ec7af672"
        ) as IPayload; // forcando um retorno desse tipo

        const usersRepository = new UsersRepository();
        const user = await usersRepository.findById(user_id);

        if (!user) {
            throw new AppError("User does not exists!", 401);
        }

        request.user = {
            id: user_id,
        };

        next();
    } catch {
        throw new AppError("Invalid token!", 401);
    }
}
