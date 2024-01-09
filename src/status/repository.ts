import { responseMsgType } from "resolver";
import { addComment, addLike, createStatus, getNewObjectID, getStatusById, getStatusByposted_by, getStatusMetaDataById, removeLike, updateStatusById } from "../modules/status";
import AWS from "aws-sdk";
import * as DotEnv from 'dotenv';
import { getUserByusername } from "../modules/users";
DotEnv.config();
AWS.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION
});
const s3 = new AWS.S3();
export class uploadstatusRepository {
    // Function to upload an object to S3
    async uploadToS3(objectKey: any, data: Buffer, contentType: string): Promise<void> {
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
    public uploadstatus(payload: any): Promise<any> {
        return new Promise(async (resolved, rejected) => {
            let respObj: responseMsgType = { status: 'success' };
            try {
                const objType = payload.files.mimetype;
                const data: Buffer = payload.files.buffer;
                const fileext = payload.files.originalname.split('.').pop();;
                console.log('payload.files',payload.files);
                const user = await getUserByusername(payload.posted_by);
                if (user) {
                    const posted_by = user._id;
                    const statusId: any = getNewObjectID();
                    // Upload the object to S3
                    const uploadURL =  posted_by + '_' + statusId +'.'+ fileext;
                    const uploadandUpdate = [];
                    let respstatus: any = {};
                    uploadandUpdate.push(new Promise(async (resolved, rejected) => {
                        await this.uploadToS3(uploadURL, data, objType);
                        resolved(true);
                    }));
                    uploadandUpdate.push(new Promise(async (resolved, rejected) => {
                        respstatus = await createStatus({
                            _id: statusId,
                            posted_by: posted_by,
                            url: uploadURL
                        });
                        resolved(respstatus);
                    }));
                    Promise.all(uploadandUpdate).then((values) => {
                        console.log('uploadURL',uploadURL);
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
                        }
                        resolved(respObj);
                    });
                } else {
                    respObj.status = 'invalid';
                    respObj.error = {
                        msg: 'Invalid user'
                    }
                    resolved(respObj);
                }
            } catch (error) {
                respObj.status = 'error';
                respObj.error = { error: 'Internal Server Error' };
                rejected(respObj)
            }
        });
    }
    public statusMetadetails(payload: any): Promise<any> {
        return new Promise(async (resolved, rejected) => {
            let respObj: responseMsgType = { status: 'success' };
            const { id } = payload;
            try {
                const status = await getStatusMetaDataById(id);
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
    public viewstatusdetails(payload: any): Promise<any> {
        return new Promise(async (resolved, rejected) => {
            let respObj: responseMsgType = { status: 'success' };
            const { viwed_by } = payload;
            try {
                const user = await getUserByusername(viwed_by);
                const status = await getStatusByposted_by(user.following);
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
    public likeStatusdetails(payload: any): Promise<any> {
        return new Promise(async (resolved, rejected) => {
            let respObj: responseMsgType = { status: 'success' };
            const { liked_by, status_id, likeUnlike } = payload;
            try {
                const user = await getUserByusername(liked_by);
                if (user) {
                    if (likeUnlike) {
                        respObj = await this.Liked(status_id, user._id, respObj);
                    } else {
                        respObj = await this.UnLiked(status_id, user._id, respObj);
                    }
                } else {
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
    async Liked(status_id: any, liked_by: any, respObj: responseMsgType) {
        const status = await addLike(status_id, liked_by);
        if (status.modifiedCount) {
            respObj.data = {
                acknowledged: 'liked',
                msg: 'User liked'
            };
        } else if (status.matchedCount) {
            respObj.data = {
                acknowledged: 'liked',
                msg: 'User already liked'
            };
        } else {
            respObj.data = {
                acknowledged: 'not found',
                msg: 'Status Not found'
            };
        }
        return respObj;
    }
    async UnLiked(status_id: any, liked_by: any, respObj: responseMsgType) {
        const status = await removeLike(status_id, liked_by);
        if (status.modifiedCount) {
            respObj.data = {
                acknowledged: 'unliked',
                msg: 'User unliked'
            };
        } else if (status.matchedCount) {
            respObj.data = {
                acknowledged: 'unliked',
                msg: 'User already unliked'
            };
        } else {
            respObj.data = {
                acknowledged: 'not found',
                msg: 'Status Not found'
            };
        }
        return respObj;
    }
    public commentStatus(payload: any): Promise<any> {
        return new Promise(async (resolved, rejected) => {
            let respObj: responseMsgType = { status: 'success' };
            const { commented_by, status_id, comment } = payload;
            try {
                const user = await getUserByusername(commented_by);
                if (user) {
                    const commentObj = {
                        comment,
                        commented_by: user._id
                    }
                    const commentresp = await addComment(status_id, commentObj);
                    if (commentresp.modifiedCount) {
                        respObj.data = {
                            acknowledged: 'commented',
                            msg: 'User commented'
                        };
                    } else {
                        respObj.data = {
                            acknowledged: 'not found',
                            msg: 'status Not found'
                        };
                    }
                } else {
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
