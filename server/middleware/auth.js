import jwt from 'jsonwebtoken';

const auth = async(req, res, next) => {
    try {
        var token;
        if (req.headers.authorization) {
            token = req.headers.authorization.split(" ")[1];
        } else {
            req.userId = null;
        }
        
        var isCustomAuth;
        if (token) {
            isCustomAuth = token.length < 500;
        }

        let decodedData;

        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');

            req.userId = decodedData?.id;

        //Google login
        } else {
            decodedData = jwt.decode(token);
            // console.log(decodedData?.sub)
            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;