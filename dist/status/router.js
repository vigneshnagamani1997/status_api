"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
const multer_1 = __importDefault(require("multer"));
const resolver_1 = require("../resolver");
const upload = (0, multer_1.default)();
exports.default = (router, moduleURL) => {
    // Custom error handling middleware for multer
    const handleMulterError = (err, req, res, next) => {
        if (err instanceof multer_1.default.MulterError) {
            // Multer error occurred, handle accordingly
            const respObj = { status: 'invalid',
                error: err
            };
            (0, resolver_1.invalid)(res, respObj);
            console.error('Multer error:', err);
            // res.status(400).json({ error: 'Multer error', message: err.message });
        }
        else {
            // Pass the error to the next middleware if it's not a MulterError
            next(err);
        }
    };
    // Attach the multer error handler to the router
    try {
        router.use(handleMulterError);
        router.post(moduleURL + '/uploadstatus', upload.single('files'), controller_1.uploadstatus);
        router.post(moduleURL + '/statusMetadetails', controller_1.statusMetadetails);
        router.post(moduleURL + '/viewstatus', controller_1.viewstatus);
        router.post(moduleURL + '/likeStatus', controller_1.likeStatus);
        router.post(moduleURL + '/commentStatus', controller_1.commentStatus);
    }
    catch (error) {
        console.error('catch error->', error);
    }
};
//# sourceMappingURL=router.js.map