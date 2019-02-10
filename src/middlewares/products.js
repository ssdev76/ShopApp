import { START, SUCCESSED, FAILED } from "../constants";

export default store => next => action => {
  const { payload, type, ...rest } = action || {};

  if (!payload || !payload.url) {
    return next(action);
  }

  next({
    ...rest, type: type + START
  })

  fetch(payload.url)
    .then(res => res.json())
    .then(response => next({...rest, type: type + SUCCESSED, response}))
    .catch(error => next({...rest, type: type + FAILED, error}));
}