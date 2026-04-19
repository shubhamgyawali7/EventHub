const logger = (req, res, next) => {
  console.log(`Method:${req.method} \n Url:${req.originalUrl}`);
  next(); // go to next middleware or Route Handler(app.js)
};

export default logger;