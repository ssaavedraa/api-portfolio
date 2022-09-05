"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const emailService = __importStar(require("../services/emailService"));
const router = express_1.default.Router();
router.post('/send-contact', (req, res) => {
    const contactInfo = req.body;
    emailService.sendContactEmail(contactInfo)
        .then(_ => res.status(200).send('Email sent to Santiago'))
        .catch((_error) => {
        res.status(500).send('Error sending email to Santiago');
    });
});
router.post('/send-confirmation', (req, res) => {
    const contactInfo = req.body;
    emailService.sendConfirmationEmail(contactInfo)
        .then(_ => res.status(200).send('Confirmation email sent'))
        .catch((_error) => {
        res.status(500).send('Error sending confirmation email');
    });
});
exports.default = router;
