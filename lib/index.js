"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
app.get('/', (req, res) => {
    res.send('Well done!');
});
app.listen(3000, () => {
    console.log('The application is listening odasdasdasdn port 3000!');
});
//# sourceMappingURL=index.js.map