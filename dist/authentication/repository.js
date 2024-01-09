"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRepository = void 0;
const helpers_1 = require("../helpers");
const users_1 = require("../modules/users");
class authRepository {
    login(payload) {
        return new Promise(async (resolved, rejected) => {
            try {
                let respObj = { status: 'success' };
                const { email, password } = payload;
                const user = await (0, users_1.getUserByEmail)(email).select('+authentication.salt +authentication.password');
                if (user) {
                    const expectedHash = (0, helpers_1.encryptPassword)(user.authentication.salt, password);
                    if (user.authentication.password === expectedHash) {
                        // set new session
                        const salt = (0, helpers_1.random)();
                        user.authentication.sessionToken = (0, helpers_1.encryptPassword)(salt, user._id.toString());
                        await user.save();
                        //resp
                        respObj.data = user;
                        resolved(respObj);
                    }
                    else {
                        respObj.status = 'invalid';
                        respObj.error = {
                            msg: 'Invalid Email or Password'
                        };
                        resolved(respObj);
                    }
                }
                else {
                    respObj.status = 'invalid';
                    respObj.error = {
                        msg: 'Invalid Email or Password'
                    };
                    resolved(respObj);
                }
            }
            catch (error) {
                rejected(error);
            }
        });
    }
    register(payload) {
        return new Promise(async (resolved, rejected) => {
            let respObj = { status: 'success' };
            const { email, password, username, firstname, lastname } = payload;
            try {
                const salt = (0, helpers_1.random)();
                const user = await (0, users_1.createUser)({
                    email,
                    username,
                    firstname,
                    lastname,
                    authentication: {
                        salt,
                        password: (0, helpers_1.encryptPassword)(salt, password),
                    },
                });
                respObj.data = user;
                resolved(respObj);
            }
            catch (error) {
                if (error && error.keyValue && error.keyValue.email === email) {
                    respObj.status = 'exist';
                    respObj.error = { msg: 'User already exist', keyValue: error.keyValue };
                    resolved(respObj);
                }
                else {
                    respObj.status = 'error';
                    respObj.error = { msg: 'Undefined Error', keyValue: error };
                    rejected(error);
                }
            }
        });
    }
    finduser(payload) {
        return new Promise(async (resolved, rejected) => {
            let respObj = { status: 'success' };
            const { username } = payload;
            try {
                const users = await (0, users_1.getUsersLikeusername)(username);
                respObj.data = users;
                resolved(respObj);
            }
            catch (error) {
                respObj.status = 'error';
                respObj.error = { msg: 'Undefined Error', keyValue: error };
                rejected(error);
            }
        });
    }
    followunfollow(payload) {
        return new Promise(async (resolved, rejected) => {
            let respObj = { status: 'success' };
            const { followedByUsername, toBeFollowedUsername, addtofollow } = payload;
            try {
                const user = await (0, users_1.getUserByusername)(toBeFollowedUsername);
                if (user) {
                    if (addtofollow) {
                        respObj = await this.followUser(followedByUsername, user, respObj);
                    }
                    else {
                        respObj = await this.UnfollowUser(followedByUsername, user, respObj);
                    }
                    resolved(respObj);
                }
                else {
                    respObj.data = {
                        acknowledged: 'Invalid',
                        msg: 'Invalid User'
                    };
                }
            }
            catch (error) {
                respObj.status = 'error';
                respObj.error = { msg: 'Undefined Error', keyValue: error };
                rejected(error);
            }
        });
    }
    async followUser(followedByUsername, user, respObj) {
        const followedUser = await (0, users_1.addFollower)(followedByUsername, user.id);
        if (followedUser.modifiedCount) {
            respObj.data = {
                acknowledged: 'followed',
                msg: 'User followed'
            };
        }
        else if (followedUser.matchedCount) {
            respObj.data = {
                acknowledged: 'followed',
                msg: 'User already followed'
            };
        }
        else {
            respObj.data = {
                acknowledged: 'not found',
                msg: 'User Not found'
            };
        }
        return respObj;
    }
    async UnfollowUser(followedByUsername, user, respObj) {
        const followedUser = await (0, users_1.removeFollower)(followedByUsername, user.id);
        if (followedUser.modifiedCount) {
            respObj.data = {
                acknowledged: 'unfollowed',
                msg: 'User Unfollowed'
            };
        }
        else if (followedUser.matchedCount) {
            respObj.data = {
                acknowledged: 'unfollowed',
                msg: 'User already not followed'
            };
        }
        else {
            respObj.data = {
                acknowledged: 'not found',
                msg: 'User Not found'
            };
        }
        return respObj;
    }
}
exports.authRepository = authRepository;
//# sourceMappingURL=repository.js.map