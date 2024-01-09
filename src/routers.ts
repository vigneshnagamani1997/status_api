import express from 'express';

import authentication from './authentication/router';
import status from './status/router';

const router = express.Router();

export default (): express.Router => {
  authentication(router, '/auth');
  status(router, '/status');

  return router;
};
