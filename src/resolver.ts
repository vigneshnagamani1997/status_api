import express from 'express';

export interface responseMsgType {
    status: "success" | "error" | "exist" | "invalid" | "unauthorised";
    error?: any
    data?: any
}

export const succeed = (res: express.Response, resultMsg: responseMsgType) => {
    return res.status(200).send(resultMsg).end();
}

export const invalid = (res: express.Response, resultMsg?: responseMsgType) => {
    return   res.status(400).send({
        success: false,
        message: resultMsg
      }).end();
}

export const dataconflict = (res: express.Response, resultMsg?: responseMsgType) => {
    return res.status(400).send(resultMsg).end();
}

export const unauthorised = (res: express.Response, resultMsg?: responseMsgType) => {
    return res.status(401).send(resultMsg).end();
}

export const unabletoprocess = (res: express.Response, resultMsg?: responseMsgType) => {
    return res.status(500).send(resultMsg).end();
}
