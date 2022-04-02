"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pbsetting_controller_1 = require("../Controllers/pbsetting.controller");
const router = (0, express_1.Router)();
//get planterboxsetting schedules
router.get('/:id/schedules', pbsetting_controller_1.getschedule);
exports.default = router;
//# sourceMappingURL=pbsetting.routes.js.map