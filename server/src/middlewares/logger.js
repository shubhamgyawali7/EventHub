const logger=(req,res,next)=>{
 console.log(`Method:${req.method} \n Url:${req.originalUrl}`);

//  if (req.method ==='DELETE')
//  {
//     return res.status(405).send("Can't Delete......")
//  }
 next();  // go to next middleware or Route Handler(app.js)
}

export default logger;