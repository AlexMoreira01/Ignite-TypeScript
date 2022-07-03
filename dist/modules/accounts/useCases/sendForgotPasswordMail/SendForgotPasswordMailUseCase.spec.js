"use strict";

var _UsersRepositoryMemory = require("@modules/accounts/repositories/in-memory/UsersRepositoryMemory");

var _UsersTokensRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory");

var _DayjsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _MailProviderInMemory = require("@shared/container/providers/MailProvider/in-memory/MailProviderInMemory");

var _AppError = require("@shared/errors/AppError");

var _SendForgotPasswordMailUseCase = require("./SendForgotPasswordMailUseCase");

let sendForgotPasswordMailUseCase;
let usersRepositoryInMemory;
let dateProvider;
let usersTokensRepositoryInMemory;
let mailProvider;
describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryMemory.UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    mailProvider = new _MailProviderInMemory.MailProviderInMemory();
    sendForgotPasswordMailUseCase = new _SendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider);
  });
  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail"); // spyOn verifica se função foi chamada

    await usersRepositoryInMemory.create({
      driver_license: "848715",
      email: "hicufi@vu.hu",
      name: "Lenora Harris",
      password: "1234"
    });
    await sendForgotPasswordMailUseCase.execute("hicufi@vu.hu");
    expect(sendMail).toHaveBeenCalled();
  });
  it("should not be able to send an email if user does not exits", async () => {
    await expect(sendForgotPasswordMailUseCase.execute("jier@deid.ms")).rejects.toEqual(new _AppError.AppError("User does not exists!"));
  });
  it("should be able to create an users token", async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");
    usersRepositoryInMemory.create({
      driver_license: "399634",
      email: "efowik@vunacunih.ly",
      name: "Caroline Shaw",
      password: "1234"
    });
    await sendForgotPasswordMailUseCase.execute("efowik@vunacunih.ly");
    expect(generateTokenMail).toBeCalled();
  });
});