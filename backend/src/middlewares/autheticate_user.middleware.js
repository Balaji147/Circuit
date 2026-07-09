import jwt from "jsonwebtoken"
const jwt_key = process.env.JWT_SECRET_KEY

export const auth = (req, res, next)=>{
    const authHeader = req.headers.authorization || ""
    const [schema, tokenFromHeader] = authHeader.split(' ')
    const tokenFromCookie = req.cookies?.accessToken
    const token = schema === "Bearer" && tokenFromHeader ? tokenFromHeader : tokenFromCookie
    if(!token) return res.status(404).json({warningInfo:{all:"Invalid Login"}})
    try{
        const decode = jwt.verify(token, jwt_key)
        req.user = {userid:decode.userid, user_name:decode.user_name, user_role:decode.user_role, user_mailid:decode.user_mailid, cid:decode.cid}
        next()
    }catch(err){
        if(err.name === "TokenExpiredError")
            return res.status(401).json({warningInfo:{all:"Access Token Expired"}})
        return res.status(401).json({warningInfo:{all:"Token Invalid"}})
    }
}