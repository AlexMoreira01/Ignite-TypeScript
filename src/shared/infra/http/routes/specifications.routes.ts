import { request, response, Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const specicationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

// specicationsRoutes.use(ensureAuthenticated);
// Passa o request e response como um midlleaware autoamtico
specicationsRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createSpecificationController.handle
);

export { specicationsRoutes };
