"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentStatus = exports.likeStatus = exports.viewstatus = exports.statusMetadetails = exports.uploadstatus = void 0;
const resolver_1 = require("../resolver");
const validator_1 = require("./validator");
const repository_1 = require("./repository");
const uploadstatusRepositoryObj = new repository_1.uploadstatusRepository();
const uploadstatus = async (req, res) => {
    try {
        req.body[req.file.fieldname] = req.file;
        const { error, value } = (0, validator_1.uploadstatusValidator)(req.body);
        if (!error) {
            const respObj = await uploadstatusRepositoryObj.uploadstatus(value);
            return (0, resolver_1.succeed)(res, respObj);
        }
        else {
            const result = {
                status: 'invalid',
                error: error.details
            };
            (0, resolver_1.invalid)(res, result);
        }
    }
    catch (error) {
        console.error('catch error->', error);
        (0, resolver_1.unabletoprocess)(res);
    }
};
exports.uploadstatus = uploadstatus;
const statusMetadetails = async (req, res) => {
    try {
        const { error, value } = (0, validator_1.statusMetadetailsValidator)(req.body);
        if (!error) {
            const respObj = await uploadstatusRepositoryObj.statusMetadetails(value);
            return (0, resolver_1.succeed)(res, respObj);
        }
        else {
            const result = {
                status: 'invalid',
                error: error.details
            };
            (0, resolver_1.invalid)(res, result);
        }
    }
    catch (error) {
        console.error('catch error->', error);
        (0, resolver_1.unabletoprocess)(res);
    }
};
exports.statusMetadetails = statusMetadetails;
const viewstatus = async (req, res) => {
    try {
        const { error, value } = (0, validator_1.viewstatusValidator)(req.body);
        if (!error) {
            const respObj = await uploadstatusRepositoryObj.viewstatusdetails(value);
            return (0, resolver_1.succeed)(res, respObj);
        }
        else {
            const result = {
                status: 'invalid',
                error: error.details
            };
            (0, resolver_1.invalid)(res, result);
        }
    }
    catch (error) {
        console.error('catch error->', error);
        (0, resolver_1.unabletoprocess)(res);
    }
};
exports.viewstatus = viewstatus;
const likeStatus = async (req, res) => {
    try {
        const { error, value } = (0, validator_1.likeStatusValidator)(req.body);
        if (!error) {
            const respObj = await uploadstatusRepositoryObj.likeStatusdetails(value);
            return (0, resolver_1.succeed)(res, respObj);
        }
        else {
            const result = {
                status: 'invalid',
                error: error.details
            };
            (0, resolver_1.invalid)(res, result);
        }
    }
    catch (error) {
        console.error('catch error->', error);
        (0, resolver_1.unabletoprocess)(res);
    }
};
exports.likeStatus = likeStatus;
const commentStatus = async (req, res) => {
    try {
        const { error, value } = (0, validator_1.commentStatusValidator)(req.body);
        if (!error) {
            const respObj = await uploadstatusRepositoryObj.commentStatus(value);
            return (0, resolver_1.succeed)(res, respObj);
        }
        else {
            const result = {
                status: 'invalid',
                error: error.details
            };
            (0, resolver_1.invalid)(res, result);
        }
    }
    catch (error) {
        console.error('catch error->', error);
        (0, resolver_1.unabletoprocess)(res);
    }
};
exports.commentStatus = commentStatus;
//# sourceMappingURL=controller.js.map