"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/testRegister', async (req, res) => {
    return res.json({ "Status": "ok" });
});
exports.default = router;
//# sourceMappingURL=user.routes.js.map