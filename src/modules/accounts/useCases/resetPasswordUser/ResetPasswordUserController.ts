import { Request, Response } from "express";
import { container } from "tsyringe";

import { ResetPasswordUserUseCase } from "./ResetPasswordUserUseCase";

class ResetPasswordUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { token } = request.query;
        const { password } = request.body;

        const resetPasswordUserUseCase = container.resolve(
            ResetPasswordUserUseCase
        );

        await resetPasswordUserUseCase.execute({
            token: String(token), // Forçando que seja uma string
            password,
        });

        return response.send();
    }
}

export { ResetPasswordUserController };
