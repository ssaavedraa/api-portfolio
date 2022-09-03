"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendConfirmationEmail = exports.sendContactEmail = void 0;
const nodemailer_1 = __importDefault(require("../utils/nodemailer/nodemailer"));
const sendContactEmail = (contactInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = (0, nodemailer_1.default)();
    const originEmail = process.env.GMAIL_USER;
    const info = yield transporter.sendMail({
        replyTo: contactInfo.email,
        to: originEmail,
        subject: `${contactInfo.name} sent you a message`,
        html: `<b>message: ${contactInfo.message} phone: ${contactInfo.phone}</b>`
    });
    return info.response;
});
exports.sendContactEmail = sendContactEmail;
const sendConfirmationEmail = (contactInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = (0, nodemailer_1.default)();
    const info = yield transporter.sendMail({
        to: contactInfo.email,
        subject: 'Santiago received your message',
        html: '<b>I have received your message and will get in contact soon</b>'
    });
    return info.response;
});
exports.sendConfirmationEmail = sendConfirmationEmail;
