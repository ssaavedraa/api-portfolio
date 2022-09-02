"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const email_1 = __importDefault(require("../controllers/email"));
const emailRouter = (0, express_1.Router)();
emailRouter.post('/send', email_1.default);
exports.default = emailRouter;
