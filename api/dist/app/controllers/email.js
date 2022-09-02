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
const sendEmail_1 = __importDefault(require("../../config/nodemailer/contactEmail/sendEmail"));
const sendEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const emailContent = req.body;
    try {
        yield (0, sendEmail_1.default)(emailContent);
    }
    catch (error) {
        return res.status(500).send({
            error
        });
    }
    return res.status(200).send(emailContent);
});
exports.default = sendEmail;
