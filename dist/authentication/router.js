"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
exports.default = (router, moduleURL) => {
    router.post(moduleURL + '/register', controller_1.register);
    router.post(moduleURL + '/login', controller_1.login);
    router.post(moduleURL + '/finduser', controller_1.finduser);
    router.post(moduleURL + '/followunfollow', controller_1.followunfollow);
};
//# sourceMappingURL=router.js.map