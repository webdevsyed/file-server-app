const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const client = new OAuth2Client();

const googleAuth = async (req, res, next) => {
    try {
        let token = ""
        if (req.body.token) {
            token = req.body.token
        } else if (req.session.tokenId) {
            token = req.session.tokenId.token
        } else {
            throw "Login Failed"
        }

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const { name, email, sub, picture } = ticket.getPayload();
        const user = {
            email: email,
            name: name,
            googleId: sub,
            picLink: picture
        };
        const tokenId = {
            token: token,
            googleId: user.googleId
        }
        req.session.tokenId = tokenId;
        res.status(200).json({ "userData": user, success: true, message: 'User logged in successfully.' });
        next()
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: 'Authentication failed' });
    }

};

const checkSession = (req, res, next) => {
    if (!req.session.tokenId) {
        return res.status(401).json({ success: false, error: 'Unauthorized : Session Expired' });
    }
    try {
        req.googleId = req.session.tokenId.googleId;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ success: false, error: 'Unauthorized : Invalid Cookie' });
    }
};

module.exports = { googleAuth, checkSession }