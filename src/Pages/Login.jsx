import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import image from "../Images/descarga.png";

export default function Login() {

    const [nombre, setNombre] = useState();
    const [edad, setEdad] = useState();

  return (
      <div>
        <div className="p-2 bg-[#9D5353] border-[2px] border-[#632626]">
            <div className="container mx-auto flex justify-center md:justify-end text-white font-bold md:px-12">
            <button className="text-white font-bold md:px-4 ">Iniciar Sesión</button>
            </div>
        </div>
    <div className="container px-6 mx-auto grid grid-cols-6 mt-24 ">
      <div className="col-span-6 md:col-start-2 md:col-span-4 mx-auto bg-[#9D5353] border-[2px] border-[#632626] text-white p-6 rounded-2xl">
        
      <div className="py-5 col-span-1 mx-auto">
        <img
          src={image}
          alt=""
          className="rounded-2xl border-2 border-gray-600 h-32 w-32 mx-auto"
        />
      </div>

        <div className="py-4">
          <h5 className="pb-1"> Correo</h5>
          <input
            class=" rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            value={nombre}
            onChange={ (e) => setNombre(e.target.value) }
            placeholder="Correo"
          ></input>
        </div>

        <div className="py-2">
          <h5>Password</h5>
          <input
            class=" rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            value={edad}
            onChange={ (e) => setEdad(e.target.value) }
            placeholder="number"
          ></input>
        </div>

        <div className="grid grid-cols-2 py-5">
          <div className="col-span-1">
            <input type="checkbox" /> Recuerdame
          </div>

          <div className="col-span-1 pl-12">
            <a className="text-blue-400 cursor-pointer">
              Olvide mi contraseña?
            </a>
          </div>
        </div>

        <div className="py-4">
          <Link to={"/"}>
            <button class=" w-full bg-[#632626] text-white font-bold py-2 px-4 rounded" /* onClick={guardarDatos} */>
              Iniciar Sesión
            </button>
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
}
