// import { useEffect } from "react"
//import styles from './index.module.scss'

import { useState } from "react"
import jwt from 'jsonwebtoken'



// function Heading(props)
// {
//   return <div>
//     <h1 className="red">{props.heading}</h1>
//     {/* <style jsx global>
//       {
//         `h1{ color: cyan;}`
//       }
//       </style> */}
//   </div>
// }

export default function Home() {

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [message, setMessage] = useState<string>('You are not logged in')
  //showing secret value to admin only
  const [secret, setSecret] = useState<string>('')

  async function submitForm() {
    const res = await fetch('/api/login', {
      method: 'POST',
      //header will put submitted admin name in message h1
      headers:{
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({username, password})
    }).then((t) => t.json())

    const token = res.token

    if(token) {
      const json = jwt.decode(token) as {[key: string]: string}
      console.log(json);
      
      setMessage(` Welcome ${json.username} You are ${json.admin? 'an admin' : 'not an admin'}`)

      //secret message code start here
      const res = await fetch('/api/secret', {
        method: 'POST',
        //header will put submitted admin name in message h1
        headers:{
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ token })
      }).then((t) => t.json())

      if(res.secretAdminCode)
      {
        setSecret(res.secretAdminCode)
      }
      else{
        setSecret('Nothing available')
      }

    }
    else{
      setMessage('Something went wrong')
    }
    
  }

  // async function submitForm() {
  //   await    console.log('form submitted');
    
    
  // }

  return (
    <>
    <div>
    <h1>{message}</h1>
    <h2> Secret: {secret}</h2>
      <form method="POST" action="/api/login">
       
        <input type="text" 
               name="username" 
               value={username}
               onChange={(e) => setUsername(e.target.value)}
        />
        <br/>
        <input type="password" 
               name="password" 
               value={password}
               onChange={(e)=> setPassword(e.target.value)}
        />
        <br/>
        <input type="button" 
               value="Login" 
               onClick={submitForm }
               
        />
      </form>
    </div>

      {/* <h1 className={styles.red}>Hello there!!
        <span>I'm red</span>
      </h1>
      <div>
        <h1 className="title">
          Hello World
        </h1>
        <style jsx>
          {
            `
            .title{
              color:green;
            }
            `
          }

        </style>
      </div>
      <div>
        <Heading heading="Heading"/>
        <h1>Red</h1>
      </div> */}
    </>
  
  )
}
