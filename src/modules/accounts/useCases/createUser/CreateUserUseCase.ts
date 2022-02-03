import { hash } from "bcryptjs";
// https://app.rocketseat.com.br/h/forum/node-js/165ab227-7699-4ccf-808b-52c71135c710
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({
        name,
        email,
        password,
        driver_license,
    }: ICreateUserDTO): Promise<void> {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new AppError("User already exists");
        }

        const passwordHash = await hash(password, 8);

        await this.usersRepository.create({
            name,
            email,
            password: passwordHash,
            driver_license,
        });
    }
}

export { CreateUserUseCase };
