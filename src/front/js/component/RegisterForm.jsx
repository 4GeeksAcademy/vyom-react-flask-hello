import React, { useContext } from 'react'
import { Context } from '../store/appContext'

const RegisterForm = () => {
    const { actions } = useContext(Context)

    let colorInput = '#262128'

    const handleSubmit = (e) => {
        e.preventDefault()
        let dataUser = {
            user_name: e.target.user_name.value,
            email: e.target.email.value,
            first_name: e.target.first_name.value,
            last_name: e.target.last_name.value,
            password: e.target.password.value
        }
        actions.createUser(dataUser)
        console.log({ "Datos enviados a la db": dataUser })
        e.target.user_name.value = "";
        e.target.email.value = '';
        e.target.first_name.value = "";
        e.target.last_name.value = "";
        e.target.password.value = "";

    }


    return (
        <>
            <h1>Register</h1>
            <form className='d-flex p-5 rouded flex-column gap-4 fs-5 align-items-start fw-bold' style={{ background: '#343449', borderRadius: '10px' }} onSubmit={handleSubmit}>

                <div className=''>
                    <label htmlFor="user_name" style={{minWidth: '110px'}}>User Name: </label>
                    <input className='ms-2 rounded p-2' style={{ outline: 'none', background: `${colorInput}`, border: 'none', caretColor: '#37d33c', color: 'white' }} type="text" id='user_name' required autoComplete='off' />
                </div>
                <div className=''>
                    <label htmlFor="fist_name" style={{minWidth: '110px'}}>First Name: </label>
                    <input className='ms-2 rounded p-2' style={{ outline: 'none', background: `${colorInput}`, border: 'none', caretColor: '#37d33c', color: 'white' }} type="text" id='first_name' required autoComplete='off' />
                </div>
                <div>
                    <label htmlFor="last_name" style={{minWidth: '110px'}}>Last Name: </label>
                    <input className='ms-2 rounded p-2' style={{ outline: 'none', background: `${colorInput}`, border: 'none', caretColor: '#37d33c', color: 'white' }} type="text" id='last_name' required autoComplete='off' />
                </div>
                <div>
                    <label htmlFor="email" style={{minWidth: '110px'}}>Email:</label>
                    <input className='ms-2 rounded p-2' style={{ outline: 'none', background: `${colorInput}`, border: 'none', caretColor: '#37d33c', color: 'white' }} type="text" id='email' required autoComplete='off' />
                </div>
                <div>
                    <label htmlFor="password" style={{minWidth: '110px'}}>Password: </label>
                    <input className='ms-2 rounded p-2' style={{ outline: 'none', background: `${colorInput}`, border: 'none', caretColor: '#37d33c', color: '#06f50e' }} type="password" id='password' required autoComplete='off' />
                </div>
                <div className='d-flex justify-content-center w-100'>
                    <button className='btn btn-primary'>Send</button>
                </div>
            </form>
        </>
    )
}

export default RegisterForm