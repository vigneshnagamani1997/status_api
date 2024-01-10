import express from 'express';
import { dataconflict, invalid, responseMsgType, succeed, unabletoprocess } from '../resolver'
import { loginValidator, registerValidator, finduserValidator, followunfollowValidator } from './validator';
import { authRepository } from './repository';

const authRepositoryObj = new authRepository();

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { error, value } = loginValidator(req.query);
    if (!error) {
      const respObj: responseMsgType = await authRepositoryObj.login(value);
      return succeed(res, respObj);
    } else {
      const result: responseMsgType = { 
        status: 'invalid',
        error: error.details
       }
      invalid(res, result);
    }
  }
  catch (error) {
    console.error('catch error->',error);
    unabletoprocess(res, error);
  }
};
export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { error, value } = registerValidator(req.query);
    if (!error) {
      const respObj: responseMsgType = await authRepositoryObj.register(value);
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

export const finduser = async (req: express.Request, res: express.Response) => {
  try {
    const { error, value } = finduserValidator(req.query);
    if (!error) {
      const respObj: responseMsgType = await authRepositoryObj.finduser(value);
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

export const followunfollow = async (req: express.Request, res: express.Response) => {
  try {
    const { error, value } = followunfollowValidator(req.query);
    if (!error) {
      const respObj: responseMsgType = await authRepositoryObj.followunfollow(value);
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