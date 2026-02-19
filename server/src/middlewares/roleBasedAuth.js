function roleBasedAuth(role){
 return (req,res,next)=>{
    // console.log(role);
    //  console.log(req.user.id!=);

   


    //Authorize using roles
    if(!req.user.roles.includes(role)) {
        return res.status(403).send("Access denied....") ;
    }
    
        next();
 }
}
export default roleBasedAuth;