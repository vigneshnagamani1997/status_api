"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unabletoprocess = exports.unauthorised = exports.dataconflict = exports.invalid = exports.succeed = void 0;
const succeed = (res, resultMsg) => {
    return res.status(200).send(resultMsg).end();
};
exports.succeed = succeed;
const invalid = (res, resultMsg) => {
    return res.status(400).send({
        success: false,
        message: resultMsg
    }).end();
};
exports.invalid = invalid;
const dataconflict = (res, resultMsg) => {
    return res.status(400).send(resultMsg).end();
};
exports.dataconflict = dataconflict;
const unauthorised = (res, resultMsg) => {
    return res.status(401).send(resultMsg).end();
};
exports.unauthorised = unauthorised;
const unabletoprocess = (res, resultMsg) => {
    return res.status(500).send(resultMsg).end();
};
exports.unabletoprocess = unabletoprocess;
//# sourceMappingURL=resolver.js.map