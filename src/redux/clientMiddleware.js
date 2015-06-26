// https://github.com/gaearon/redux/issues/99#issuecomment-112212639
export default function clientMiddleware(client) {
  return (next) => (action) => {
    const { promise, types, ...rest } = action;
    if (!promise) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = types;
    next({...rest, type: REQUEST});
    return promise(client).then(
      (result) => next({...rest, result, type: SUCCESS}),
      (error) => next({...rest, error, type: FAILURE})
    );
  };
}
