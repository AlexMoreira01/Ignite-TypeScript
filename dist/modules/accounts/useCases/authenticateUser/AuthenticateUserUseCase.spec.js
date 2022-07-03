"use strict";

var _UsersRepositoryMemory = require("@modules/accounts/repositories/in-memory/UsersRepositoryMemory");

var _UsersTokensRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory");

var _DayjsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _AppError = require("@shared/errors/AppError");

var _CreateUserUseCase = require("../createUser/CreateUserUseCase");

var _AuthenticateUserUseCase = require("./AuthenticateUserUseCase");

let authenticateUserUseCase;
let usersRepositoryInMemory;
let userTokensRepositoryInMemory;
let createUserUseCase;
let dateProvider;
describe("Authencticate User", () => {
  // Antes da autenticação ira se criar o usuario com o create UserUseCase
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryMemory.UsersRepositoryInMemory();
    userTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    authenticateUserUseCase = new _AuthenticateUserUseCase.AuthenticateUserUseCase(usersRepositoryInMemory, userTokensRepositoryInMemory, dateProvider);
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryInMemory);
  }); // Deve ser capaz de autenticar um usuario

  it("should be able to authenticate an user", async () => {
    // aqui se cria um user sem validações pois a responsabilidade e do teste de criação, aqui so estamos testando a autenticação
    const user = {
      driver_license: "000123",
      email: "user@test.com",
      password: "12345",
      name: "User Test"
    };
    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });
    expect(result).toHaveProperty("token");
  }); // Não precisa criar um usuario novo pois esse user abaixo não deve existir

  it("should not ber able to authenticate an nonexistent user", async () => {
    await expect(authenticateUserUseCase.execute({
      email: "false@email.com",
      password: "1234"
    })).rejects.toEqual(new _AppError.AppError("Email or password incorrect!"));
  }); // Testando senha incorreta

  it("should not be able to authenticate with incorrect password", async () => {
    const user = {
      driver_license: "9999",
      email: "user@user.com",
      password: "1234",
      name: "User Test Error"
    }; // Criou o usuario

    await createUserUseCase.execute(user); // Autentica o usuario

    await expect(authenticateUserUseCase.execute({
      email: user.email,
      password: "incorrectPassword"
    })).rejects.toEqual(new _AppError.AppError("Email or password incorrect!"));
  });
});