"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploadCarImagesController = void 0;

var _tsyringe = require("tsyringe");

var _UploadCarImagesUseCase = require("./UploadCarImagesUseCase");

class UploadCarImagesController {
  async handle(request, response) {
    const {
      id
    } = request.params;
    const images = request.files; // Traz um array -- é do tipo IFiles[]

    const uploadCarImagesUseCase = _tsyringe.container.resolve(_UploadCarImagesUseCase.UploadCarImagesUseCase); // acesso ao filname do arquivo


    const images_name = images.map(file => file.filename);
    await uploadCarImagesUseCase.execute({
      car_id: id,
      images_name
    });
    return response.status(201).send();
  }

}

exports.UploadCarImagesController = UploadCarImagesController;