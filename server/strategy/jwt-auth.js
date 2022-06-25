const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const passport =require("passport");
const JwtStrategy = require("passport-jwt").Strategy,
ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "123456";
passport.use(
  new JwtStrategy(opts, async(jwt_payload, done) =>{
     
    try {
        const user=await prisma.user.findUnique({ 
        where:{
            email: jwt_payload.email,
        }
    })
      if (user) {
        delete user.password;
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    
    } catch (error) {
         return done(err, false);
    }
  })
);
module.exports=passport;
