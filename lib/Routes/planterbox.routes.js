"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const planterbox_controller_1 = require("../Controllers/planterbox.controller");
const router = (0, express_1.Router)();
//get planterbox setting(not include schedule)
router.get('/:id/settings', planterbox_controller_1.getboxsettings);
exports.default = router;
//# sourceMappingURL=planterbox.routes.js.map