export class AppError {
    public readonly message: string;

    public readonly statusCode: number;

    constructor(message: string, statusCode = 400) {
        // se nao tiver nenhum status code ele sera um error padrao
        this.message = message;

        this.statusCode = statusCode;
    }
}
