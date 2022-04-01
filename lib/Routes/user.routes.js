"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_client_1 = require("../helper/prisma.client");
const router = (0, express_1.Router)();
router.get('/me', async (req, res) => {
    return res.json({ "Status": "ok users" });
});
//edit user data
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
//get all user planterboxes data
router.get('/:id/planterboxes', async (req, res) => {
    const { id } = req.params;
    const planterboxes = await prisma_client_1.prisma.planterbox.findMany({
        where: {
            ownerID: Number(id),
        }
    });
    res.json(planterboxes);
});
exports.default = router;
//# sourceMappingURL=user.routes.js.map