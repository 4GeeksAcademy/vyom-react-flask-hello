import React, { useContext, useState } from 'react'
import { Context } from '../store/appContext'
const PrivateList = () => {
    const { actions, store} = useContext(Context)
    const [list, setList] = useState([])

    const handleClick = async () => {
        setList(await actions.getUsersList())
        console.log(list)
    }
    
    return (
        <>
            {store.token_user ? (
                <div className='d-flex p-5 flex-column gap-4 fs-5 align-items-center justify-content-center' style={{background: '#0b3b66', borderRadius: '10px' }}>
                    <h1>List Users</h1>
                    <button onClick={handleClick} className='btn btn-primary'>Get Users</button>
                    {list.length > 0 ? (
                        <ul className='list-group'>
                            {list?.map((user, index) => (
                                <li className='list-group-item' key={index} style={{background: 'transparent', color: 'white', border: 'none'}}>
                                    <span style={{color: '#06f50e'}}>{index + 1}.-</span>{user.email}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No se ha cargado ninguna lista de usuarios.</p>
                    )}
                </div>
            ) : (
                <h1>Inicie sesión para pedir la lista de usuarios</h1>
            )}
        </>
    )
}

export default PrivateList