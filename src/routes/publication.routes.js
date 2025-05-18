const { Router } = require("express");
const publicationController = require("../controllers/publication.controller.js");
const { authenticate } = require("../middlewares/auth.middleware.js");
const { requireRole } = require("../middlewares/role.middleware.js");
const publicationRouter = Router();

publicationRouter.get("/", publicationController.getAllPublications);
publicationRouter.get("/:id", publicationController.getPublicationById);
publicationRouter.post("/", authenticate, requireRole(["admin"]), publicationController.createPublication);
publicationRouter.put("/:id", authenticate, requireRole(["admin"]), publicationController.updatePublication);
publicationRouter.delete("/:id", authenticate, requireRole(["admin"]), publicationController.deletePublication);

module.exports = publicationRouter;