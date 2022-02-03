// Sobreescrever arquivo de tipagens adcionando as nossas proprias

declare namespace Express {
    // Sobreescrever infos do request
    // eslint-disable-next-line @typescript-eslint/naming-convention
    export interface Request {
        user: {
            id: string;
        };
    }
}
