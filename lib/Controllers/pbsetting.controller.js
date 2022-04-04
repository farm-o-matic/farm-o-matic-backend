"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchedule = void 0;
const prisma_client_1 = require("../helper/prisma.client");
const getSchedule = async (req, res) => {
    const { id } = req.params;
    const setting = await prisma_client_1.prisma.planterboxsettings.findUnique({
        where: {
            SettingsID: Number(id),
        },
        include: {
            fertilizerschedule: true,
            wateringschedule: true,
            pesticideschedule: true
        },
    });
    if (setting) {
        const schedules = {
            fertilizerschedule: setting['fertilizerschedule'][0],
            wateringschedule: setting['wateringschedule'][0],
            pesticideschedule: setting['pesticideschedule'][0]
        };
        return res.json(schedules);
    }
    return res.json({
        error: true,
        discription: 'The box is not avaliable.'
    });
};
exports.getSchedule = getSchedule;
//# sourceMappingURL=pbsetting.controller.js.map