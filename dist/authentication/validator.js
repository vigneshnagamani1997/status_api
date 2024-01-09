"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.followunfollowValidator = exports.finduserValidator = exports.registerValidator = exports.loginValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const loginValidator = (req) => {
    const shema = joi_1.default.object({
        email: joi_1.default.string().required(),
        password: joi_1.default.string().required(),
    });
    return shema.validate(req);
};
exports.loginValidator = loginValidator;
const registerValidator = (req) => {
    const shema = joi_1.default.object({
        email: joi_1.default.string().required(),
        username: joi_1.default.string().required(),
        firstname: joi_1.default.string().required(),
        lastname: joi_1.default.string().required(),
        password: joi_1.default.string().required(),
    });
    return shema.validate(req);
};
exports.registerValidator = registerValidator;
const finduserValidator = (req) => {
    const shema = joi_1.default.object({
        username: joi_1.default.string().required(),
    });
    return shema.validate(req);
};
exports.finduserValidator = finduserValidator;
const followunfollowValidator = (req) => {
    const shema = joi_1.default.object({
        followedByUsername: joi_1.default.string().required(),
        toBeFollowedUsername: joi_1.default.string().required(),
        addtofollow: joi_1.default.boolean().required()
    });
    return shema.validate(req);
};
exports.followunfollowValidator = followunfollowValidator;
//# sourceMappingURL=validator.js.map