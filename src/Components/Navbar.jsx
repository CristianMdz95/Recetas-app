import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(props) {

  return (
  <div className="p-2 bg-[#9D5353] border-[2px] border-[#632626]">
      <Link to={"/Login/"}>
        <button className="container mx-auto flex justify-center md:justify-end text-white font-bold md:px-12">
         {props.registrado ? 'Cerra Sesión' : 'Iniciar Sesión'}
        </button>
      </Link>
      
  </div>
  )
}
