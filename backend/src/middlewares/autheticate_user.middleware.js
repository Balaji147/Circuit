import jwt from "jsonwebtoken"
const jwt_key = process.env.JWT_SECRET_KEY

export const auth = (req, res, next)=>{
    const authHeader = req.headers.authorization || ""
    const [schema, tokenFromHeader] = authHeader.split(' ')
    const tokenFromCookie = req.cookies?.accessToken
    const token = schema === "Bearer" && tokenFromHeader ? tokenFromHeader : tokenFromCookie
    if(!token) return res.status(404).json({errorInfo:{all:"Invalid Login"}})
    try{
        const decode = jwt.verify(token, jwt_key)
        req.user = {id:decode.id, user_name:decode.user_name, user_mailid:decode.user_mailid}
        next()
    }catch(err){
        if(err.name === "TokenExpiredError")
            return res.status(401).json({errorInfo:{all:"Access Token Expired"}})
        return res.status(401).json({errorInfo:{all:"Token Invalid"}})
    }
}