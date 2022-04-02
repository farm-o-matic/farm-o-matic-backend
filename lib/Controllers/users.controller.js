"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getuserboxes = exports.patchid = void 0;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const patchid = async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.update({
        where: {
            UserID: Number(id),
        },
        data: req.body
    });
    res.json(user);
};
exports.patchid = patchid;
//get all user planterboxes data
const getuserboxes = async (req, res) => {
    const { id } = req.params;
    const planterboxes = await prisma.planterbox.findMany({
        where: {
            ownerID: Number(id),
        }
    });
    res.json(planterboxes);
};
exports.getuserboxes = getuserboxes;
//# sourceMappingURL=users.controller.js.map