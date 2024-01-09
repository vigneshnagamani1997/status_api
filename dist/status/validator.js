"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentStatusValidator = exports.likeStatusValidator = exports.statusMetadetailsValidator = exports.viewstatusValidator = exports.uploadstatusValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const uploadstatusValidator = (req) => {
    const shema = joi_1.default.object({
        posted_by: joi_1.default.string().required(),
        files: {
            fieldname: joi_1.default.string().required(),
            originalname: joi_1.default.string().required(),
            encoding: joi_1.default.string().optional(),
            mimetype: joi_1.default.string().valid("image/png", "image/jpeg", "video/mp4").required(),
            buffer: joi_1.default.any().required(),
            size: joi_1.default.number().optional()
        },
    });
    return shema.validate(req);
};
exports.uploadstatusValidator = uploadstatusValidator;
const viewstatusValidator = (req) => {
    const shema = joi_1.default.object({
        viwed_by: joi_1.default.string().required(),
    });
    return shema.validate(req);
};
exports.viewstatusValidator = viewstatusValidator;
const statusMetadetailsValidator = (req) => {
    const shema = joi_1.default.object({
        id: joi_1.default.string().required(),
    });
    return shema.validate(req);
};
exports.statusMetadetailsValidator = statusMetadetailsValidator;
const likeStatusValidator = (req) => {
    const shema = joi_1.default.object({
        liked_by: joi_1.default.string().required(),
        status_id: joi_1.default.string().required(),
        likeUnlike: joi_1.default.boolean().required(),
    });
    return shema.validate(req);
};
exports.likeStatusValidator = likeStatusValidator;
const commentStatusValidator = (req) => {
    const shema = joi_1.default.object({
        commented_by: joi_1.default.string().required(),
        status_id: joi_1.default.string().required(),
        comment: joi_1.default.string().required(),
    });
    return shema.validate(req);
};
exports.commentStatusValidator = commentStatusValidator;
//# sourceMappingURL=validator.js.map