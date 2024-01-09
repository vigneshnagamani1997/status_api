import express from 'express';
import { invalid, responseMsgType, succeed, unabletoprocess } from '../resolver'
import { commentStatusValidator, likeStatusValidator, statusMetadetailsValidator, uploadstatusValidator, viewstatusValidator } from './validator';
import { uploadstatusRepository } from './repository';
const uploadstatusRepositoryObj = new uploadstatusRepository();
export const uploadstatus = async (req: express.Request, res: express.Response) => {
  try {
    req.body[req.file.fieldname] = req.file;
    const { error, value } = uploadstatusValidator(req.body);
    if (!error) {
      const respObj: responseMsgType = await uploadstatusRepositoryObj.uploadstatus(value);
      return succeed(res, respObj);
    } else {
      const result: responseMsgType = {
        status: 'invalid',
        error: error.details
      }
      invalid(res, result);
    }
  } catch (error) {
    console.error('catch error->', error);
    unabletoprocess(res);
  }
}
export const statusMetadetails = async (req: express.Request, res: express.Response) => {
  try {
    const { error, value } = statusMetadetailsValidator(req.body);
    if (!error) {
      const respObj: responseMsgType = await uploadstatusRepositoryObj.statusMetadetails(value);
      return succeed(res, respObj);
    } else {
      const result: responseMsgType = {
        status: 'invalid',
        error: error.details
      }
      invalid(res, result);
    }
  } catch (error) {
    console.error('catch error->', error);
    unabletoprocess(res);
  }
}

export const viewstatus = async (req: express.Request, res: express.Response) => {
  try {
    const { error, value } = viewstatusValidator(req.body);
    if (!error) {
      const respObj: responseMsgType = await uploadstatusRepositoryObj.viewstatusdetails(value);
      return succeed(res, respObj);
    } else {
      const result: responseMsgType = {
        status: 'invalid',
        error: error.details
      }
      invalid(res, result);
    }
  } catch (error) {
    console.error('catch error->', error);
    unabletoprocess(res);
  }
}

export const likeStatus = async (req: express.Request, res: express.Response) => {
  try {
    const { error, value } = likeStatusValidator(req.body);
    if (!error) {
      const respObj: responseMsgType = await uploadstatusRepositoryObj.likeStatusdetails(value);
      return succeed(res, respObj);
    } else {
      const result: responseMsgType = {
        status: 'invalid',
        error: error.details
      }
      invalid(res, result);
    }
  } catch (error) {
    console.error('catch error->', error);
    unabletoprocess(res);
  }
}

export const commentStatus = async (req: express.Request, res: express.Response) => {
  try {
    const { error, value } = commentStatusValidator(req.body);
    if (!error) {
      const respObj: responseMsgType = await uploadstatusRepositoryObj.commentStatus(value);
      return succeed(res, respObj);
    } else {
      const result: responseMsgType = {
        status: 'invalid',
        error: error.details
      }
      invalid(res, result);
    }
  } catch (error) {
    console.error('catch error->', error);
    unabletoprocess(res);
  }
}
