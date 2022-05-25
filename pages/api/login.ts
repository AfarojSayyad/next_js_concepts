import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken'

const KEY ='Afaroj'

export default function (req: NextApiRequest, res: NextApiResponse)
{
    //console.log(req.body);
    
    if(!req.body){
        res.statusCode = 404
        res.end('Error')
        return
    }

    const {username, password} = req.body
    
    res.json({
        token: jwt.sign({
            username,
            //password
            admin: username === 'admin' && password === 'admin'
        }, KEY)
    })
    //console.log('REQUEST BODY',req.body.username)
    //it should not be a react component
    // res.json({num: Math.floor(Math.random() * 10)})
}