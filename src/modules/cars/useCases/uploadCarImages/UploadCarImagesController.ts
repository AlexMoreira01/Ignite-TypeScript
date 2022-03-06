import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";

interface IFiles {
    filename: string;
}

class UploadCarImagesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const images = request.files as IFiles[]; // Traz um array -- é do tipo IFiles[]

        const uploadCarImagesUseCase = container.resolve(
            UploadCarImagesUseCase
        );

        // acesso ao filname do arquivo
        const images_name = images.map((file) => file.filename);

        await uploadCarImagesUseCase.execute({
            car_id: id,
            images_name,
        });

        return response.status(201).send();
    }
}

export { UploadCarImagesController };
