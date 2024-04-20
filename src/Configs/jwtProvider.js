const jwt = require('jsonwebtoken');

const SECRET_KEY = 'yadav';

const generateToken=(userId)=>{
    const token = jwt.sign({userId},SECRET_KEY,{expiresIn:'24hr'});
    return token;
}

const getUserIdFromToken=async (token)=>{
    const decodedToken = await jwt.verify(token,SECRET_KEY);
    return decodedToken.userId;
}

module.exports={generateToken,getUserIdFromToken};