import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        mailProvider = new MailProviderInMemory();

        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProvider
        );
    });

    it("should be able to send a forgot password mail to user", async () => {
        const sendMail = jest.spyOn(mailProvider, "sendMail"); // spyOn verifica se função foi chamada

        await usersRepositoryInMemory.create({
            driver_license: "848715",
            email: "hicufi@vu.hu",
            name: "Lenora Harris",
            password: "1234",
        });

        await sendForgotPasswordMailUseCase.execute("hicufi@vu.hu");

        expect(sendMail).toHaveBeenCalled();
    });

    it("should not be able to send an email if user does not exits", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("jier@deid.ms")
        ).rejects.toEqual(new AppError("User does not exists!"));
    });

    it("should be able to create an users token", async () => {
        const generateTokenMail = jest.spyOn(
            usersTokensRepositoryInMemory,
            "create"
        );

        usersRepositoryInMemory.create({
            driver_license: "399634",
            email: "efowik@vunacunih.ly",
            name: "Caroline Shaw",
            password: "1234",
        });

        await sendForgotPasswordMailUseCase.execute("efowik@vunacunih.ly");

        expect(generateTokenMail).toBeCalled();
    });
});
