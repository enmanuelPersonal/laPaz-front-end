import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
     return (
          <div>
               Home Page
               <Link to="/profile">Perfil</Link>
          </div>
     )
}

export default HomePage;
