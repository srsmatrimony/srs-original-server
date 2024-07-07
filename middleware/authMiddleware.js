const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const protect = asyncHandler(async (req, res ,next) => {
    
    // access autherization value from header
    const authHeader = req.headers.authorization;
 
    let token;
        

    if (authHeader && authHeader.startsWith('Bearer'))
    {
        

        try {
            // split token by removing 'Bearer'
            
            token = authHeader.split(' ')[1];
            
            // verify the token with JWT secret
            
            jwt.verify(token, process.env.JWT_SECRET);
            
            next();
        
        }
        catch (err) {
            res.status(401);
            throw new Error("Not Autherized , Invalid token");
        }

    }
    else {
        res.status(401);
        throw new Error('Not Autherized , Invalid token');
    }
    
})



module.exports =  protect 
