import React, {useState} from 'react'
import Link from 'next/link';

type Props = {}

export default function SignUp({}: Props) {
    const [userName, setUserName] = useState<String>();
    const [email, setEmail] = useState<String>();
    const [password, setPassword] = useState<String>();
    const [repeat, setRepeat] = useState<String>();

    /*const signUp = () => {
fetch('http://')
    }*/

     return (
    <div>
        <h1>SignUp</h1>
        <input placeholder='Username' onChange={(e) => setUserName(e.target.value)} value={userName}/>
        <input placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email}/>
        <input placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password}/>
        <input placeholder='Repeat password' onChange={(e) => setRepeat(e.target.value)} value={repeat}/>
        <button>Sign up !</button>
<Link href="/">Back</Link>
    </div>
  )     

}