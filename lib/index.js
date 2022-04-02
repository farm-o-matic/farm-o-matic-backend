"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
<<<<<<< HEAD
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Well done!');
});
// view list of plant profile (settings preset)
app.get('/viewpresets', async (req, res) => {
    const presets = await prisma.planterboxsettings.findMany({
        where: {
            SettingsID: {
                startsWith: '701'
            } // settingsID 701,000,001 to 701,999,999 are presets
        }
    });
    res.json(presets);
});
=======
const user_routes_1 = require("./Routes/user.routes");
const app = express();
const port = process.env.PORT || '3000';
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//To apply router for enhancing folder structure, the app.use() must be applied.
//@TO-DO: FIX schema in prisma folder to fit with original schema. 
app.use('/user', user_routes_1.default);
>>>>>>> main
app.listen(port, () => {
    console.log(`The application is listening on port ${port}!`);
});
//# sourceMappingURL=index.js.map