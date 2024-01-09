import Joi from 'joi';
export const loginValidator =   (req: any) => {
    const shema = Joi.object({        
        email: Joi.string().required(),
        password: Joi.string().required(),
    });
    return shema.validate(req);
}
export const registerValidator =  (req: any) => {
   const shema = Joi.object({
        email: Joi.string().required(),
        username: Joi.string().required(),
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        password: Joi.string().required(),
    });
    return shema.validate(req);
}
export const finduserValidator =  (req: any) => {
    const shema = Joi.object({
        username: Joi.string().required(),
     });
     return shema.validate(req);
 }

 export const followunfollowValidator =  (req: any) => {
    const shema = Joi.object({
        followedByUsername: Joi.string().required(),
        toBeFollowedUsername: Joi.string().required(),
        addtofollow: Joi.boolean().required()
     });
     return shema.validate(req);
 }