"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const user_routes_1 = require("./Routes/user.routes");
const planterbox_routes_1 = require("./Routes/planterbox.routes");
const pbsetting_routes_1 = require("./Routes/pbsetting.routes");
const app = express();
const port = process.env.PORT || '3000';
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//To apply router for enhancing folder structure, the app.use() must be applied.
//@TO-DO: FIX schema in prisma folder to fit with original schema. 
app.use('/user', user_routes_1.default);
app.use('/planterbox', planterbox_routes_1.default);
app.use('/pbsetting', pbsetting_routes_1.default);
app.listen(port, () => {
    console.log(`The application is listening on port ${port}!`);
});
//# sourceMappingURL=index.js.map