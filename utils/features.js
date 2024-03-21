import jwt from "jsonwebtoken"


export const sendCookie = (user, res, message, statusCode = 200) => {
 // .env = JWT_SECRATE = kejfhiuhfewiluhgbbvjdk
const JWT_SECRATE = "kejfhiuhfewiluhgbbvjdk"
const token = jwt.sign({_id: user._id}, JWT_SECRATE)

res.status(statusCode).cookie("token", token, {
    httpOnly: true,
    maxAge: 15 * 60 * 1000,
}).json({
    success: true,
    message,
})   
}