import React from 'react'
import { Link } from 'react-router-dom';

const Error404 = () => {
    return (
        <div>
            <h1>404 - Página no encontrada</h1>
            <p>Lo siento, la página que estás buscando no existe.</p>
            <Link to='/home'>
                <button>Back</button>
            </Link>
        </div>
    )
}

export default Error404;