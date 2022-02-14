// Se cria o que as funções vao receber e os metodos

import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

interface IUsersRepository {
    // como é um objeto grande nao se faz a destruturação
    create(data: ICreateUserDTO): Promise<void>; // entidade nao retorna nada
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
}

export { IUsersRepository };
