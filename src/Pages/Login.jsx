import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import image from "../Images/descarga.png";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithRedirect, GoogleAuthProvider, PopupRedirectResolver, FacebookAuthProvider } from "firebase/auth";
import {db, firebaseApp} from '../Config/firebase.config'

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();


export default function Login() {
  
  const [nombre, setNombre] = useState();
  const [edad, setEdad] = useState();
  const [registrado, setRegistrado] = useState(false);
  

  const submitHandler = async (e) => {
    e.preventDefault();
    const correo = e.target.formEmail.value;
    const password = e.target.formPassword.value;

    if(registrado){
        //Se esta registrando
        const usuario = await createUserWithEmailAndPassword(auth, correo, password);
    }else{
        //Se esta iniciando sesión
        signInWithEmailAndPassword(auth, correo, password);
    }
  };


  return (
    
    <div>
      <div className="container px-6 mx-auto grid grid-cols-6 mt-24 ">
        <div className="col-span-6 md:col-start-2 md:col-span-4 mx-auto bg-[#9D5353] border-[2px] border-[#632626] text-white p-6 rounded-2xl">
          <div className="py-5 col-span-1 mx-auto">
            <img
              src={image}
              alt=""
              className="rounded-2xl border-2 border-gray-600 h-32 w-32 mx-auto"
            />
            <br></br>
            <h5 className="text-3xl font-thin text-center">
              {registrado ? "REGÍSTRATE" : "INICIAR SESIÓN"}
            </h5>
          </div>
          <form className="" onSubmit={submitHandler}>
            <div className="py-4">
              <h5 className="pb-1"> Correo</h5>
              <input
                className=" rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Correo"
              ></input>
            </div>

            <div className="py-2">
              <h5>Password</h5>
              <input
                className=" rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                value={edad}
                onChange={(e) => setEdad(e.target.value)}
                placeholder="number"
              ></input>
            </div>
            </form>
            <div className="grid grid-cols-2 py-5">
              <div className="col-span-1">
                <input type="checkbox" /> Recuerdame
              </div>

              <div className="col-span-1 pl-16" onClick={() => setRegistrado(!registrado)}>
                <a className="text-blue-400 cursor-pointer" >
                {registrado
                ? "¿Ya tienes Cuenta? Inicia Sesión"
                : "¿No tienes cuenta? Regístrate"}
                </a>
              </div>
            </div>
          
          <div className="py-4">
            <Link to={"/Recetas-app"}>
              <button
                className=" w-full bg-[#632626] hover:bg-[#a03939] text-white font-bold py-2 px-4 rounded" /* onClick={guardarDatos} */
              >
                Envíar
              </button>
            </Link>
          </div>

          <div>
            <hr></hr>
            <br></br>
          </div>
          
          <div className="py-1">
              <button
                className=" w-full bg-gray-100 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={() => signInWithRedirect(auth, googleProvider)}
              >
                Iniciar Sesión con Google
              </button>
          </div>

          <div className="py-1">
              <button
                className=" w-full bg-[#1f4886] hover:bg-[#1354b6] text-white font-bold py-2 px-4 rounded"
                onClick={() => signInWithRedirect(auth, facebookProvider)}
              >
                Iniciar sesión con Facebook
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}
