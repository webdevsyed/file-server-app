const { OAuth2Client } = require('google-auth-library');
require('dotenv').config()

const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'postmessage',);

const getTokens = async (req, res, next) => {

    if (req.body.code) {
        try {
            const { tokens } = await oAuth2Client.getToken(req.body.code);
            // console.log(tokens)
            req.idToken = tokens.id_token
            next()
        }
        catch (err) {
            res.send(400).json({ success: false, message: "Invalid authorization code" })
        }
    }

    else {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ success: false, message: "Token not available!" });
        }
        const jwt = authHeader.split(" ")[1];
        req.idToken = jwt
        next()
    }
}

const getUserData = async (req, res, next) => {
    try {
        const ticket = await oAuth2Client.verifyIdToken({
            idToken: req.idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const { name, email, sub, picture } = ticket.getPayload();
        const user = {
            email: email,
            name: name,
            googleId: sub,
            picLink: picture
        };

        res.status(200).json({ "userData": user, success: true, "jwt": req.idToken, message: 'User logged in successfully.' });
        next()

    } catch (error) {
        console.log(error)
        res.status(403).json({ success: false, message: "Failed to login!" })
    }
}


const checkToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ success: false, message: "Token not sent!" });
    }
    const jwt = authHeader.split(" ")[1];

    try {
        const ticket = await oAuth2Client.verifyIdToken({
            idToken: jwt,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const { sub } = ticket.getPayload();
        req.googleId = sub;
        next();
    } catch (error) {
        console.error(error);
        return res.status(403).json({ success: false, error: 'Unauthorized : Invalid token' });
    }
}



// const googleAuth = async (req, res, next) => {
//     try {
//         let token = ""
//         if (req.body.token) {
//             token = req.body.token
//         } else if (req.session.tokenId) {
//             token = req.session.tokenId.token
//         } else {
//             throw "Login Failed"
//         }

//         const ticket = await oAuth2Client.verifyIdToken({
//             idToken: token,
//             audience: process.env.GOOGLE_CLIENT_ID,
//         });

//         const { name, email, sub, picture } = ticket.getPayload();
//         const user = {
//             email: email,
//             name: name,
//             googleId: sub,
//             picLink: picture
//         };
//         const tokenId = {
//             token: token,
//             googleId: user.googleId
//         }
//         req.session.tokenId = tokenId;
//         res.status(200).json({ "userData": user, success: true, message: 'User logged in successfully.' });
//         next()
//     }
//     catch (error) {
//         console.log(error);
//         res.status(400).json({ success: false, error: 'Authentication failed' });
//     }

// };

// const checkSession = (req, res, next) => {
//     if (!req.session.tokenId) {
//         return res.status(401).json({ success: false, error: 'Unauthorized : Session Expired' });
//     }
//     try {
//         req.googleId = req.session.tokenId.googleId;
//         next();
//     } catch (err) {
//         console.log(err);
//         return res.status(401).json({ success: false, error: 'Unauthorized : Invalid Cookie' });
//     }
// };

module.exports = { checkToken, getTokens, getUserData }