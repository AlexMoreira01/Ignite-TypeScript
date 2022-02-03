import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

// Interface com que ira receber
interface IRequest {
    email: string;
    password: string;
}

// Interface de retorno -- para nao retornar as outras infos do usuario
interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    // Recebe email e senha               retornar a interface de retorno aqui
    async execute({ email, password }: IRequest): Promise<IResponse> {
        // Usuario existe => Precisa do repository
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Email or password incorrect");
        }

        // Senha esta correta
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("Email or password incorrect");
        }

        // Gerar o jsonwebtoken
        // Primeiro parametro é o payload infos nao tao criticas // Segundo parametro uma palavra secreta o auxilia na hora de criar o jsonwebtoken
        // a chave sera usada também para verificar se o token é existente // 3 Parametro = subject => Sempre iremos passar qual é o id do user que esta grando o token e o tempo e expiração
        const token = sign({}, "4c2ade7acd1cecdfc6d10e01ec7af672", {
            subject: user.id,
            expiresIn: "1d",
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email,
            },
        };

        return tokenReturn;
    }
}

export { AuthenticateUserUseCase };
