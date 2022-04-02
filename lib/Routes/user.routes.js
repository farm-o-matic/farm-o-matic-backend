"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../Controllers/users.controller");
const users_controller_2 = require("../Controllers/users.controller");
const router = (0, express_1.Router)();
router.get('/me', async (req, res) => {
    return res.json({ "Status": "ok users" });
});
//edit user data
router.get('/:id/planterboxes', users_controller_1.getuserboxes);
router.patch('/:id', users_controller_2.patchid);
exports.default = router;
//# sourceMappingURL=user.routes.js.map