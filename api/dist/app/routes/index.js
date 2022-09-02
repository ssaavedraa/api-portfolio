"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const router = (0, express_1.Router)();
const routerDir = __dirname;
const removeExtension = (filename) => {
    return filename.split('.').shift() || '';
};
fs_1.default.readdirSync(routerDir).filter(file => {
    const fileWithoutExtension = removeExtension(file);
    const ignoreFile = ['index'].includes(fileWithoutExtension);
    if (!ignoreFile) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        router.use(`/${fileWithoutExtension}`, require(`./${fileWithoutExtension}`).default);
    }
});
router.get('*', (req, res) => {
    const error = {
        status: 404,
        message: 'Route not found'
    };
    res.status(error.status).send(error.message);
});
exports.default = router;
