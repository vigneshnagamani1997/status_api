import { responseMsgType } from "resolver";
import { encryptPassword, random } from "../helpers";
import { addFollower, createUser, getUserByEmail, getUserByusername, getUsersLikeusername, removeFollower } from "../modules/users";
export class authRepository {
    public login(payload: any): Promise<any> {
        return new Promise(async (resolved, rejected) => {
            try {
                let respObj: responseMsgType = { status: 'success' };
                const { email, password } = payload;
                const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');
                if (user) {
                    const expectedHash = encryptPassword(user.authentication.salt, password);
                    if (user.authentication.password === expectedHash) {
                        // set new session
                        const salt = random();
                        user.authentication.sessionToken = encryptPassword(salt, user._id.toString());
                        await user.save();
                        //resp
                        respObj.data = user;
                        resolved(respObj);
                    } else {
                        respObj.status = 'invalid';
                        respObj.error = {
                            msg: 'Invalid Email or Password'
                        };
                        resolved(respObj);
                    }
                } else {
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
    public register(payload: any): Promise<any> {
        return new Promise(async (resolved, rejected) => {
            let respObj: responseMsgType = { status: 'success' };
            const { email, password, username, firstname, lastname } = payload;
            try {
                const salt = random();
                const user = await createUser({
                    email,
                    username,
                    firstname,
                    lastname,
                    authentication: {
                        salt,
                        password: encryptPassword(salt, password),
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
                } else {
                    respObj.status = 'error';
                    respObj.error = { msg: 'Undefined Error', keyValue: error };
                    rejected(error);
                }
            }
        });
    }
    public finduser(payload: any): Promise<any> {
        return new Promise(async (resolved, rejected) => {
            let respObj: responseMsgType = { status: 'success' };
            const { username } = payload;
            try {
                const users = await getUsersLikeusername(username);
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
    public followunfollow(payload: any): Promise<any> {
        return new Promise(async (resolved, rejected) => {
            let respObj: responseMsgType = { status: 'success' };
            const { followedByUsername, toBeFollowedUsername, addtofollow } = payload;
            try {
                const user = await getUserByusername(toBeFollowedUsername);
                if (user) {
                    if (addtofollow) {
                        respObj = await this.followUser(followedByUsername, user, respObj);
                    } else {
                        respObj = await this.UnfollowUser(followedByUsername, user, respObj);
                    }
                    resolved(respObj);
                } else {
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
    async followUser(followedByUsername: string, user: any, respObj: responseMsgType) {
        const followedUser = await addFollower(followedByUsername, user.id);
        if (followedUser.modifiedCount) {
            respObj.data = {
                acknowledged: 'followed',
                msg: 'User followed'
            };
        } else if (followedUser.matchedCount) {
            respObj.data = {
                acknowledged: 'followed',
                msg: 'User already followed'
            };
        } else {
            respObj.data = {
                acknowledged: 'not found',
                msg: 'User Not found'
            };
        }
        return respObj;
    }
    async UnfollowUser(followedByUsername: string, user: any, respObj: responseMsgType) {
        const followedUser = await removeFollower(followedByUsername, user.id);
        if (followedUser.modifiedCount) {
            respObj.data = {
                acknowledged: 'unfollowed',
                msg: 'User Unfollowed'
            };
        } else if (followedUser.matchedCount) {
            respObj.data = {
                acknowledged: 'unfollowed',
                msg: 'User already not followed'
            };
        } else {
            respObj.data = {
                acknowledged: 'not found',
                msg: 'User Not found'
            };
        }
        return respObj;
    }
}
