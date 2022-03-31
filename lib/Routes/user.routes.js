"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../Controllers/users.controller");
const prisma_client_1 = require("../helper/prisma.client");
const router = (0, express_1.Router)();
router.get('/register', users_controller_1.register);
router.get('/me', async (req, res) => {
    return res.json({ "Status": "ok users" });
});
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const user = await prisma_client_1.prisma.user.update({
        where: {
            UserID: Number(id),
        },
        data: req.body
    });
    res.json(user);
});
exports.default = router;
//# sourceMappingURL=user.routes.js.map