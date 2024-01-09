import express from 'express';

import { finduser, followunfollow, login, register } from './controller';

export default (router: express.Router, moduleURL: string) => {
  router.post(moduleURL +'/register', register);
  router.post(moduleURL +'/login', login);
  router.post(moduleURL +'/finduser', finduser);
  router.post(moduleURL +'/followunfollow', followunfollow);
};
