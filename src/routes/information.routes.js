const { Router } = require("express");
const informationController = require("../controllers/information.controller.js");
const { authenticate } = require("../middlewares/auth.middleware.js");
const { requireRole } = require("../middlewares/role.middleware.js");
const informationRouter = Router();

informationRouter.get("/", informationController.getAllInformations);
informationRouter.get("/:id", informationController.getInformationById);
informationRouter.post("/", authenticate, requireRole(["admin"]), informationController.createInformation);
informationRouter.put("/:id", authenticate, requireRole(["admin"]), informationController.updateInformation);
informationRouter.delete("/:id", authenticate, requireRole(["admin"]), informationController.deleteInformation);

module.exports = informationRouter;