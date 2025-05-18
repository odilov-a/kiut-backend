const { Router } = require("express");
const adminRoutes = require("./admin.routes.js");
const secondmentRoutes = require("./secondment.routes.js");
const informationRoutes = require("./information.routes.js");
const participantRoutes = require("./participant.routes.js");
const publicationRoutes = require("./publication.routes.js");
const router = Router();

router.use("/admins", adminRoutes);
router.use("/secondments", secondmentRoutes);
router.use("/informations", informationRoutes);
router.use("/participants", participantRoutes);
router.use("/publications", publicationRoutes);

module.exports = router;
