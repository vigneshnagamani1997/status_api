import Joi from 'joi';
export const uploadstatusValidator = (req: any) => {
    const shema = Joi.object({        
        posted_by: Joi.string().required(),
        files: {
            fieldname: Joi.string().required(),
            originalname: Joi.string().required(),
            encoding: Joi.string().optional(),
            mimetype: Joi.string().valid("image/png", "image/jpeg", "video/mp4").required(),
            buffer: Joi.any().required(),
            size: Joi.number().optional()
        },
    });
    return shema.validate(req);
}

export const viewstatusValidator = (req: any) => {
    const shema = Joi.object({        
        viwed_by: Joi.string().required(),
    });
    return shema.validate(req);
}

export const statusMetadetailsValidator = (req: any) => {
    const shema = Joi.object({        
        id: Joi.string().required(),
    });
    return shema.validate(req);
}
export const likeStatusValidator = (req: any) => {
    const shema = Joi.object({        
        liked_by: Joi.string().required(),
        status_id: Joi.string().required(),
        likeUnlike : Joi.boolean().required(),
    });
    return shema.validate(req);
}


export const commentStatusValidator = (req: any) => {
    const shema = Joi.object({        
        commented_by: Joi.string().required(),
        status_id: Joi.string().required(),
        comment : Joi.string().required(),
    });
    return shema.validate(req);
}



