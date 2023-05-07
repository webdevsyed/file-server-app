const express = require('express')
const router = express.Router()
const { getUserData, getTokens } = require('../controllers/authController')

// router.post('/login', googleAuth)

router.post('/login',getTokens, getUserData)

// router.post('/logout', (req, res) => {
//     if (!req.session) {
//         return res.json({ success: false, message: "Already Logged Out!" })
//     }
//     req.session = null
//     res.clearCookie("session-user").status(200).json({ success: true, message: "Logout Successful!" }).end()
// })

module.exports = router
