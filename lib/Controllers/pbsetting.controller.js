"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getschedule = void 0;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const getschedule = async (req, res) => {
    const { id } = req.params;
    const schedules = await prisma.planterboxsettings.findUnique({
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
};
exports.getschedule = getschedule;
//# sourceMappingURL=pbsetting.controller.js.map