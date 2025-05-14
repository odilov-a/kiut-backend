const { Router } = require("express");
const adminRoutes = require("./admin.routes.js");
const router = Router();

router.use("/admins", adminRoutes);

module.exports = router;
