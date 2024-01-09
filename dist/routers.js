"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./authentication/router"));
const router_2 = __importDefault(require("./status/router"));
const router = express_1.default.Router();
exports.default = () => {
    (0, router_1.default)(router, '/auth');
    (0, router_2.default)(router, '/status');
    return router;
};
//# sourceMappingURL=routers.js.map