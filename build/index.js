"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const environment = app_1.default.get('env');
const port = process.env.PORT;
app_1.default.listen(port, () => {
    if (environment === 'development') {
        console.log(`Server running at http://localhost:${port}`);
    }
    else {
        console.log('Server is ready');
    }
});
