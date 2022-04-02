"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../Controllers/users.controller");
const users_controller_2 = require("../Controllers/users.controller");
const users_controller_3 = require("../Controllers/users.controller");
const users_controller_4 = require("../Controllers/users.controller");
const router = (0, express_1.Router)();
router.post('/register', users_controller_1.register);
router.post('/login', users_controller_3.login);
router.get('/getuser/:id', users_controller_2.getuser);
router.post('/addbox/:id', users_controller_4.addbox);
router.get('/me', async (req, res) => {
    return res.json({ "Status": "ok users" });
});
exports.default = router;
//# sourceMappingURL=user.routes.js.map