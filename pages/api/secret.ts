import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken'

const KEY = 'Afaroj'

export default function(req: NextApiRequest, res:NextApiResponse)
{
    const {token} = req.body

    const { admin } = jwt.verify(token, KEY) as {[key: string]: boolean}

    if(admin)
    {
        res.json({ secretAdminCode: new Date() })
    }
    else 
    {
        res.json({admin:false})
    }

}