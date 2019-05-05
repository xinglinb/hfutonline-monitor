module.exports = (time) => {
  const cache = {};
  return async function (ctx, next) {
    ctx.cache = {
      get: (key) => (
        cache[key] && (+new Date() - cache[key].createTime < time)
          ? cache[key].value
          : undefined
      ),
      set: (key, value) => {
        cache[key] = {
          createTime: +new Date(),
          value,
        };
      },
    };
    await next();
  };
};

