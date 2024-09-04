import React, { useContext, useState } from 'react'
import { Context } from '../store/appContext'
const LoginForm = () => {
    const [isPassword, setIsPassword] = useState(false)
    const { actions, store } = useContext(Context)

    let colorInput = '#262128'

    const handleSubmit = (e) => {
        e.preventDefault()
        const data_login = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        console.log(data_login)
        actions.loginUser(data_login)

        e.target.email.value = ""
        e.target.password.value = ""
    }

    return (
        <div>
            <h1>Loig In</h1>
            <form className='d-flex p-5 rouded flex-column gap-4 fs-5 align-items-start fw-bold' style={{ background: '#343449', borderRadius: '10px' }} onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" style={{ minWidth: '110px' }}>Email:</label>
                    <input className='ms-2 rounded p-2' style={{ outline: 'none', background: `${colorInput}`, border: 'none', caretColor: '#37d33c', color: 'white' }} type="text" id='email' required autoComplete='off' />
                </div>
                <div>
                    <label htmlFor="password" style={{ minWidth: '110px' }}>Password: </label>
                    <input className='ms-2 rounded p-2' style={{ outline: 'none', background: `${colorInput}`, border: 'none', caretColor: '#37d33c', color: 'white' }} type="password" id='password' required autoComplete='off' />
                </div>
                <div className='d-flex justify-content-center w-100'>
                    <button className='btn btn-primary'>Send</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm