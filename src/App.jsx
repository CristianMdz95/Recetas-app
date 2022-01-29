import { useEffect, useState } from "react";
import { db } from "./firebase.config";
import {
  collection,
  onSnapshot,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";

function App() {
  /* Conexión */
  const recipesCollectionRef = collection(db, "recipes");

  const [recipes, setRecipes] = useState([]);
  const [popUpActive, setPopUpActive] = useState(false);
  const [form, setForm] = useState({
    title: "",
    desc: "",
    ingredients: [],
    steps: [],
  });

  useEffect(() => {
    onSnapshot(recipesCollectionRef, (snapShot) => {
      setRecipes(
        snapShot.docs.map((doc) => {
          return {
            id: doc.id,
            viewing: false,
            ...doc.data(),
          };
        })
      );
    });
  }, []);

  const handleView = (id) => {
    const recipesClone = [...recipes];

    recipesClone.forEach((recipe) => {
      if (recipe.id === id) {
        recipe.viewing = !recipe.viewing;
      } else {
        recipe.viewing = false;
      }
    });

    setRecipes(recipesClone);
  };

  const handleIngredient = (e, i) => {
    const ingredientsClone = [...form.ingredients];
    ingredientsClone[i] = e.target.value;

    setForm({
      ...form,
      ingredients: ingredientsClone,
    });
  };

  const handleRemoveIngredient = (i) => {
    const ingredientsClone = [...form.ingredients];
    ingredientsClone.splice(i, 1);

    setForm({
      ...form,
      ingredients: ingredientsClone,
    });
  };

  const handleRemoveStep = (i) => {
    const stepsClone = [...form.steps];
    stepsClone.splice(i, 1);

    setForm({
      ...form,
      steps: stepsClone,
    });
  };

  const handleIntruccion = (e, i) => {
    const stepsClone = [...form.steps];
    stepsClone[i] = e.target.value;

    setForm({
      ...form,
      steps: stepsClone,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.desc) {
      alert("No se puede registrar una receta sin titulo y descripción");
      return;
    }

    addDoc(recipesCollectionRef, form);

    setForm({
      title: "",
      desc: "",
      ingredients: [],
      steps: [],
    });

    setPopUpActive(false);
  };

  const handleIngredienteCount = () => {
    setForm({
      ...form,
      ingredients: [...form.ingredients, ""],
    });
  };

  const handleIntruccionCount = () => {
    setForm({
      ...form,
      steps: [...form.steps, ""],
    });
  };

  const removeRecipe = (id) => {
    deleteDoc(doc(db, "recipes", id));
  };

  const handleRemoveIngredientDB = (id, name) => {
    updateDoc(doc(db, "recipes", id), {
      ingredients: arrayRemove(name),
    });
  };

  const handleRemoveStepDB = (id, name) => {
    updateDoc(doc(db, "recipes", id), {
      steps: arrayRemove(name),
    });
  };

  return (
    <div className="">
      <div className="container mx-auto p-5">
        <div className="grid place-content-center">
          <h1 className="text-5xl uppercase font-mono font-bold text-white">Mis Recetas</h1>
          <button
            className="mt-5 border-2 border-black bg-purple-300 p-2 rounded-xl text-black uppercase font-semibold font-sans hover:bg-purple-400 shadow-lg shadow-purple-900/40" 
            onClick={() => setPopUpActive(!popUpActive)}
          >
            Agregar Receta
          </button>
        </div>

        {/* LadingPage */}
        <div className="p-6 ">
          {recipes.map((recipe) => (
            <div
              className="text-white font-mono bg-purple-600 p-8 my-6 border-purple-900 border-[3px] rounded-2xl shadow-lg shadow-purple-900/70"
              key={recipe.id}
            >
              <h3 className="text-4xl font-semibold ">{recipe.title}</h3>

              <p
                className="text-3xl mt-2 font-mono"
                dangerouslySetInnerHTML={{ __html: recipe.desc }}
              ></p>

              {recipe.viewing && (
                <div className="grid grid-cols-2 mt-4 p-4 ">
                  <div className="col-span-1 mt-6">
                    <h4 className="text-2xl uppercase font-mono">
                      Ingredientes
                    </h4>
                    <ul className="p-6 list-disc">
                      {recipe.ingredients.map((ingredient, i) => (
                        <li
                          className="text-xl mt-2  col-span-2 font-mono"
                          key={i}
                        >
                          {ingredient}
                          <button
                            className="text-sm ml-2 "
                            type="button"
                            onClick={() =>
                              handleRemoveIngredientDB(recipe.id, ingredient)
                            }
                          >
                            ❌
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="col-span-1 mt-6">
                    <h4 className="text-2xl uppercase font-mono">
                      Instrucciones
                    </h4>
                    <ol className="p-7 list-decimal">
                      {recipe.steps.map((step, i) => (
                        <li
                          className="text-xl mt-2  col-span-2 font-mono"
                          key={i}
                        >
                          {step}
                          <button
                            className="text-sm ml-2"
                            type="button"
                            onClick={() => handleRemoveStepDB(recipe.id, step)}
                          >
                            ❌
                          </button>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}

              {console.log(JSON.stringify(recipe))}
              <div className="buttons">
                <button
                  className="mt-5 border-2 border-black bg-purple-300 p-2 rounded-xl text-black uppercase font-semibold font-sans hover:bg-purple-400 shadow-lg shadow-purple-900/40"
                  type="button"
                  onClick={() => handleView(recipe.id)}
                >
                  VER {recipe.viewing ? "MENOS" : "MAS"}
                </button>
                <button
                  className="mt-5 mx-5 border-2 border-black bg-red-300 p-2 rounded-xl text-black uppercase font-semibold font-sans hover:bg-red-400 shadow-lg shadow-purple-900/40"
                  onClick={() => removeRecipe(recipe.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Create */}
        {popUpActive && (
          <div className="bg-opacity-70 bg-purple-900 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 ">
          <div className="text-white w-[90%] sm:w-[80%] md:w-[60%] lg:w-[60%] xl:w-[40%] font-mono bg-purple-600 p-8 my-6 border-purple-900 border-[3px] rounded-2xl shadow-lg shadow-purple-900/70">
            <div className="p-4">
              <h2 className="text-4xl font-semibold grid place-content-center uppercase mb-9"> Agregar una nueva receta</h2>

              <form onSubmit={handleSubmit}>
                <div>
                  <label className="text-2xl uppercase">Titulo: </label> <br/>
                  <input
                    type="text"
                    className="p-2 w-[100%] rounded-md bg-purple-200 text-black"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                  />
                </div>
                <br />
                <div>
                  <label className="text-2xl uppercase" >Descripción: </label>
                  <br/>
                  <input
                    type="text"
                    className="p-2 w-[100%] rounded-md bg-purple-200 text-black"
                    value={form.desc}
                    onChange={(e) => setForm({ ...form, desc: e.target.value })}
                  />
                </div>
                <br />

                <div>
                  <label className="text-2xl uppercase">Ingredientes: </label>
                  {form.ingredients.map((ingredient, i) => (
                    <div key={i} className="mt-2">
                      <input
                        type="text"
                        className="p-2 w-[95%] rounded-md bg-purple-200 text-black"
                        value={ingredient}
                        onChange={(e) => handleIngredient(e, i)}
                      />
                      <button
                        type="button"
                        className="ml-2"
                        onClick={() => handleRemoveIngredient(i)}
                      >
                        ❌
                      </button>
                    </div>
                  ))}
                  <button className="text-md uppercase bg-white hover:bg-gray-300 text-black border-black border-[2px] px-2 mt-2 rounded-md" type="button" onClick={handleIngredienteCount}>
                  + 
                  </button>
                </div>

                <div className="pt-4">
                  <label className="text-2xl uppercase">Instrucciones: </label>
                  {form.steps.map((step, i) => (
                    <div className="" key={i}>
                      <textarea
                        className="w-[95%] rounded-md bg-purple-200 text-black p-2"
                        type="text"
                        value={step}
                        onChange={(e) => handleIntruccion(e, i)}
                      />
                      <button className="ml-2" type="button" onClick={() => handleRemoveStep(i)}>
                       ❌
                      </button>
                    </div>
                  ))}
                  <button className="text-md uppercase bg-white hover:bg-gray-300 text-black border-black border-[2px] px-2 mt-2 rounded-md" type="button" onClick={handleIntruccionCount}>
                    +
                  </button>
                </div>

                <div className="buttons">
                  <br />
                  <button type="submit" className="mt-5 border-2 border-black bg-green-200 p-2 rounded-xl text-black uppercase font-semibold font-sans hover:bg-green-400 shadow-lg shadow-purple-900/40"> Agregar </button>
                  <button className="mt-5 mx-2 border-2 border-black bg-red-300 p-2 rounded-xl text-black uppercase font-semibold font-sans hover:bg-red-400 shadow-lg shadow-purple-900/40" type="button" onClick={() => setPopUpActive(false)}>
                    Cerrar{" "}
                  </button>
                </div>
              </form>
            </div>
          </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
