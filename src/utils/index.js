import pub from './public';
import time from './time';
import cookie from './cookie';
import storeage from './storeage';
import session from './session';
import formvalidate from './formvalidate';

export default {
  ...pub,
  ...time,
  cookie,
  session,
  storeage,
  formvalidate
};
