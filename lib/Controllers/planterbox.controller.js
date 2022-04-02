"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getboxsettings = void 0;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const getboxsettings = async (req, res) => {
    const { id } = req.params;
    const settings = await prisma.planterbox.findUnique({
        where: {
            boxID: Number(id),
        },
        include: {
            planterboxsettings: true,
        },
    });
    return res.json(settings['planterboxsettings']);
};
exports.getboxsettings = getboxsettings;
//# sourceMappingURL=planterbox.controller.js.map