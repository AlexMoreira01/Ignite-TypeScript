import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

// Ocorrem testes isolados para que cada metodo tenha a garantia que esta funcionando corretamente

describe("Authencticate User", () => {
    // Antes da autenticação ira se criar o usuario com o create UseruseCAse
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory
        );
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    // Deve ser capaz de autenticar um usuario
    it("should be able to authenticate an user", async () => {
        // aqui se cria um user sem validações pois a responsabilidade e do teste de criação, aqui so estamos testando a authenticação
        const user: ICreateUserDTO = {
            driver_license: "000123",
            email: "user@test.com",
            password: "12345", // Responsabilidade de criptografar fica para o use case
            name: "User Test",
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        // Se espera que esse resultado tenha uma propriedade token
        expect(result).toHaveProperty("token");
    });

    // Não se precisa criar um usuario novo pois esse user a baixo não deve existir
    it("should not ber able to authenticate an nonexistent user", () => {
        // exprects usados diretamente quando ja se espera um erro
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "false@email.com",
                password: "1234",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    // Testando senha incorreta
    it("should not be able to authenticate with incorrect password", () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: "9999",
                email: "user@user.com",
                password: "1234",
                name: "User Test Error",
            };

            // Criou o usuario
            await createUserUseCase.execute(user);

            // Autentica o usuario
            await authenticateUserUseCase.execute({
                email: user.email,
                password: "incorrectPassword",
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
