"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadstatusRepository = void 0;
const status_1 = require("../modules/status");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const DotEnv = __importStar(require("dotenv"));
const users_1 = require("../modules/users");
DotEnv.config();
aws_sdk_1.default.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION
});
const s3 = new aws_sdk_1.default.S3();
class uploadstatusRepository {
    // Function to upload an object to S3
    async uploadToS3(objectKey, data, contentType) {
        // Specify your S3 bucket name
        const bucketName = process.env.AWS_Bucket_name;
        // Set up parameters for S3 upload
        const params = {
            Bucket: bucketName,
            Key: objectKey,
            Body: data,
            ContentType: contentType,
        };
        // Upload the object to S3
        await s3.upload(params).promise();
    }
    uploadstatus(payload) {
        return new Promise(async (resolved, rejected) => {
            let respObj = { status: 'success' };
            try {
                const objType = payload.files.mimetype;
                const data = payload.files.buffer;
                const fileext = payload.files.originalname.split('.').pop();
                ;
                console.log('payload.files', payload.files);
                const user = await (0, users_1.getUserByusername)(payload.posted_by);
                if (user) {
                    const posted_by = user._id;
                    const statusId = (0, status_1.getNewObjectID)();
                    // Upload the object to S3
                    const uploadURL = posted_by + '_' + statusId + '.' + fileext;
                    const uploadandUpdate = [];
                    let respstatus = {};
                    uploadandUpdate.push(new Promise(async (resolved, rejected) => {
                        await this.uploadToS3(uploadURL, data, objType);
                        resolved(true);
                    }));
                    uploadandUpdate.push(new Promise(async (resolved, rejected) => {
                        respstatus = await (0, status_1.createStatus)({
                            _id: statusId,
                            posted_by: posted_by,
                            url: uploadURL
                        });
                        resolved(respstatus);
                    }));
                    Promise.all(uploadandUpdate).then((values) => {
                        console.log('uploadURL', uploadURL);
                        respObj.data = {
                            message: 'Object uploaded to S3 successfully',
                            postDetails: {
                                uploadedURL: process.env.AWS_Object_Base_URL + uploadURL,
                                comments: respstatus.comments,
                                likes: respstatus.likes,
                                posted_by: respstatus.posted_by,
                                createdAt: respstatus.createdAt,
                            }
                        };
                        resolved(respObj);
                    }).catch((err) => {
                        respObj.status = 'error';
                        respObj.error = {
                            msg: 'error occured while processing',
                            err: err
                        };
                        resolved(respObj);
                    });
                }
                else {
                    respObj.status = 'invalid';
                    respObj.error = {
                        msg: 'Invalid user'
                    };
                    resolved(respObj);
                }
            }
            catch (error) {
                respObj.status = 'error';
                respObj.error = { error: 'Internal Server Error' };
                rejected(respObj);
            }
        });
    }
    statusMetadetails(payload) {
        return new Promise(async (resolved, rejected) => {
            let respObj = { status: 'success' };
            const { id } = payload;
            try {
                const status = await (0, status_1.getStatusMetaDataById)(id);
                respObj.data = status;
                resolved(respObj);
            }
            catch (error) {
                respObj.status = 'error';
                respObj.error = { msg: 'Undefined Error', keyValue: error };
                rejected(error);
            }
        });
    }
    viewstatusdetails(payload) {
        return new Promise(async (resolved, rejected) => {
            let respObj = { status: 'success' };
            const { viwed_by } = payload;
            try {
                const user = await (0, users_1.getUserByusername)(viwed_by);
                if (user) {
                    const status = await (0, status_1.getStatusByposted_by)(user.following);
                    respObj.data = status;
                    resolved(respObj);
                }
                else {
                    respObj.data = {
                        acknowledged: 'not found',
                        msg: 'user Not found'
                    };
                    resolved(respObj);
                }
            }
            catch (error) {
                respObj.status = 'error';
                respObj.error = { msg: 'Undefined Error', keyValue: error };
                rejected(error);
            }
        });
    }
    likeStatusdetails(payload) {
        return new Promise(async (resolved, rejected) => {
            let respObj = { status: 'success' };
            const { liked_by, status_id, likeUnlike } = payload;
            try {
                const user = await (0, users_1.getUserByusername)(liked_by);
                if (user) {
                    if (likeUnlike) {
                        respObj = await this.Liked(status_id, user._id, respObj);
                    }
                    else {
                        respObj = await this.UnLiked(status_id, user._id, respObj);
                    }
                }
                else {
                    respObj.data = {
                        acknowledged: 'Invalid',
                        msg: 'Invalid User'
                    };
                }
                resolved(respObj);
            }
            catch (error) {
                respObj.status = 'error';
                respObj.error = { msg: 'Undefined Error', keyValue: error };
                rejected(error);
            }
        });
    }
    async Liked(status_id, liked_by, respObj) {
        const status = await (0, status_1.addLike)(status_id, liked_by);
        if (status.modifiedCount) {
            respObj.data = {
                acknowledged: 'liked',
                msg: 'User liked'
            };
        }
        else if (status.matchedCount) {
            respObj.data = {
                acknowledged: 'liked',
                msg: 'User already liked'
            };
        }
        else {
            respObj.data = {
                acknowledged: 'not found',
                msg: 'Status Not found'
            };
        }
        return respObj;
    }
    async UnLiked(status_id, liked_by, respObj) {
        const status = await (0, status_1.removeLike)(status_id, liked_by);
        if (status.modifiedCount) {
            respObj.data = {
                acknowledged: 'unliked',
                msg: 'User unliked'
            };
        }
        else if (status.matchedCount) {
            respObj.data = {
                acknowledged: 'unliked',
                msg: 'User already unliked'
            };
        }
        else {
            respObj.data = {
                acknowledged: 'not found',
                msg: 'Status Not found'
            };
        }
        return respObj;
    }
    commentStatus(payload) {
        return new Promise(async (resolved, rejected) => {
            let respObj = { status: 'success' };
            const { commented_by, status_id, comment } = payload;
            try {
                const user = await (0, users_1.getUserByusername)(commented_by);
                if (user) {
                    const commentObj = {
                        comment,
                        commented_by: user._id
                    };
                    const commentresp = await (0, status_1.addComment)(status_id, commentObj);
                    if (commentresp.modifiedCount) {
                        respObj.data = {
                            acknowledged: 'commented',
                            msg: 'User commented'
                        };
                    }
                    else {
                        respObj.data = {
                            acknowledged: 'not found',
                            msg: 'status Not found'
                        };
                    }
                }
                else {
                    respObj.data = {
                        acknowledged: 'Invalid',
                        msg: 'Invalid User'
                    };
                }
                resolved(respObj);
            }
            catch (error) {
                respObj.status = 'error';
                respObj.error = { msg: 'Undefined Error', keyValue: error };
                rejected(error);
            }
        });
    }
}
exports.uploadstatusRepository = uploadstatusRepository;
//# sourceMappingURL=repository.js.map