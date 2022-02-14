import { request, response, Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

const specicationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specicationsRoutes.use(ensureAuthenticated);
// Passa o request e response como um midlleaware autoamtico
specicationsRoutes.post("/", createSpecificationController.handle);

export { specicationsRoutes };
