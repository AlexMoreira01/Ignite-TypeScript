import { request, response, Router } from "express";

import { createSpecificationController } from "../modules/cars/useCases/createSpecification";

const specicationsRoutes = Router();

specicationsRoutes.post("/", (request, response) => {
    return createSpecificationController.handle(request, response);
});

export { specicationsRoutes };
