import express, { NextFunction } from 'express';
import { commentStatus, likeStatus, statusMetadetails, uploadstatus, viewstatus } from './controller';
import multer from 'multer';
import { invalid, responseMsgType } from '../resolver';
const upload = multer();


export default (router: express.Router, moduleURL: string) => {
    // Custom error handling middleware for multer
    const handleMulterError: any = (
      err: any,
      req: Request,
      res: express.Response,
      next: NextFunction
    ) => {
      if (err instanceof multer.MulterError) {
        // Multer error occurred, handle accordingly
        const respObj: responseMsgType = {status: 'invalid',
        error: err
        } 
        invalid(res,respObj);
        console.error('Multer error:', err);
        // res.status(400).json({ error: 'Multer error', message: err.message });
      } else {
        // Pass the error to the next middleware if it's not a MulterError
        next(err);
      }
    };
  
    // Attach the multer error handler to the router
    
  try {
    router.use(handleMulterError);

    router.post(moduleURL +'/uploadstatus', upload.single('files') , uploadstatus);
    router.post(moduleURL +'/statusMetadetails', statusMetadetails);
    router.post(moduleURL +'/viewstatus', viewstatus);
    router.post(moduleURL +'/likeStatus', likeStatus);
    router.post(moduleURL +'/commentStatus', commentStatus);
    
  } catch(error) {
    console.error('catch error->', error);
  }
};
