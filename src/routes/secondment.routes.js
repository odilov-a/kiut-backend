const { Router } = require("express");
const secondmentController = require("../controllers/secondment.controller.js");
const { authenticate } = require("../middlewares/auth.middleware.js");
const { requireRole } = require("../middlewares/role.middleware.js");
const secondmentRouter = Router();

secondmentRouter.get("/", secondmentController.getAllSecondments);
secondmentRouter.get("/:id", secondmentController.getSecondmentById);
secondmentRouter.post("/", authenticate, requireRole(["admin"]), secondmentController.createSecondment);
secondmentRouter.put("/:id", authenticate, requireRole(["admin"]), secondmentController.updateSecondment);
secondmentRouter.delete("/:id", authenticate, requireRole(["admin"]), secondmentController.deleteSecondment);

module.exports = secondmentRouter;