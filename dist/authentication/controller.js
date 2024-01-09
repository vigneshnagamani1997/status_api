"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.followunfollow = exports.finduser = exports.register = exports.login = void 0;
const resolver_1 = require("../resolver");
const validator_1 = require("./validator");
const repository_1 = require("./repository");
const authRepositoryObj = new repository_1.authRepository();
const login = async (req, res) => {
    try {
        const { error, value } = (0, validator_1.loginValidator)(req.body);
        if (!error) {
            const respObj = await authRepositoryObj.login(value);
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
        (0, resolver_1.unabletoprocess)(res, error);
    }
};
exports.login = login;
const register = async (req, res) => {
    try {
        const { error, value } = (0, validator_1.registerValidator)(req.body);
        if (!error) {
            const respObj = await authRepositoryObj.register(value);
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
exports.register = register;
const finduser = async (req, res) => {
    try {
        const { error, value } = (0, validator_1.finduserValidator)(req.body);
        if (!error) {
            const respObj = await authRepositoryObj.finduser(value);
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
exports.finduser = finduser;
const followunfollow = async (req, res) => {
    try {
        const { error, value } = (0, validator_1.followunfollowValidator)(req.body);
        if (!error) {
            const respObj = await authRepositoryObj.followunfollow(value);
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
exports.followunfollow = followunfollow;
//# sourceMappingURL=controller.js.map