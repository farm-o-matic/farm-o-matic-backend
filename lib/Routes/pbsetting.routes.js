"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_client_1 = require("../helper/prisma.client");
const router = (0, express_1.Router)();
//get planterboxsetting schedules
router.get('/:id/schedules', async (req, res) => {
    const { id } = req.params;
    const schedules = await prisma_client_1.prisma.planterboxsettings.findUnique({
        where: {
            SettingsID: Number(id),
        },
        include: {
            fertilizerschedule: true,
            wateringschedule: true,
            pesticideschedule: true
        },
    });
    return res.json(schedules);
});
exports.default = router;
//# sourceMappingURL=pbsetting.routes.js.map