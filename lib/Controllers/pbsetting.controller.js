"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getschedule = void 0;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const getschedule = async (req, res) => {
    const { id } = req.params;
    const setting = await prisma.planterboxsettings.findUnique({
        where: {
            SettingsID: Number(id),
        },
        include: {
            fertilizerschedule: true,
            wateringschedule: true,
            pesticideschedule: true
        },
    });
    const schedules = {
        fertilizerschedule: setting['fertilizerschedule'][0],
        wateringschedule: setting['wateringschedule'][0],
        pesticideschedule: setting['pesticideschedule'][0]
    };
    return res.json(schedules);
};
exports.getschedule = getschedule;
//# sourceMappingURL=pbsetting.controller.js.map