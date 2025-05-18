const { Router } = require("express");
const participantController = require("../controllers/participant.controller.js");
const { authenticate } = require("../middlewares/auth.middleware.js");
const { requireRole } = require("../middlewares/role.middleware.js");
const participantRouter = Router();

participantRouter.get("/", participantController.getAllParticipants);
participantRouter.get("/:id", participantController.getParticipantById);
participantRouter.post("/", authenticate, requireRole(["admin"]), participantController.createParticipant);
participantRouter.put("/:id", authenticate, requireRole(["admin"]), participantController.updateParticipant);
participantRouter.delete("/:id", authenticate, requireRole(["admin"]), participantController.deleteParticipant);

module.exports = participantRouter;