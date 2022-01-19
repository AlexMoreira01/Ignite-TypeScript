import { request, response, Router } from "express";

import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

const specicationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

// Passa o request e repsonse como um midlleaware autoamtico
specicationsRoutes.post("/", createSpecificationController.handle);

export { specicationsRoutes };
