"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_client_1 = require("../helper/prisma.client");
const router = (0, express_1.Router)();
//get planterbox setting(not include schedule)
router.get('/:id/settings', async (req, res) => {
    const { id } = req.params;
    const settings = await prisma_client_1.prisma.planterbox.findUnique({
        where: {
            boxID: Number(id),
        },
        include: {
            planterboxsettings: true,
        },
    });
    return res.json(settings);
});
exports.default = router;
//# sourceMappingURL=planterbox.routes.js.map