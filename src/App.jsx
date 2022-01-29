import { useEffect, useState } from "react";
import { db } from "./firebase.config";
import { collection, onSnapshot, doc, addDoc, deleteDoc } from "firebase/firestore";

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

  const handleIngredient = (e,i) => {

    const ingredientsClone = [...form.ingredients];
    ingredientsClone[i] = e.target.value;

    setForm({
      ...form,
      ingredients: ingredientsClone
    });

  };

  const handleIntruccion = (e,i) => {

    const stepsClone = [...form.steps];
    stepsClone[i] = e.target.value;

    setForm({
      ...form,
      steps: stepsClone
    });

  };

  const handleSubmit = e => {
    e.preventDefault();

     if(!form.title || !form.desc){
       alert('No se puede registrar una receta sin titulo y descripción');
       return;
     }

     addDoc(recipesCollectionRef, form);

     setForm({
      title: "",
      desc: "",
      ingredients: [],
      steps: [],
     })

     setPopUpActive(false);
  };

  const handleIngredienteCount = () => {
    setForm({
      ...form,
      ingredients: [...form.ingredients, ""]
    })
  };

  const handleIntruccionCount = () => {
    setForm({
      ...form,
      steps: [...form.steps, ""]
    })
  };

  const removeRecipe = (id) => {
    deleteDoc(doc(db, "recipes", id));

  }

  return (
    <div>
      <h1>Mis Recetas</h1>

      <button onClick={() => setPopUpActive(!popUpActive)}> Agregar Receta </button>

      {/* LadingPage */}
      <div className="recetas">
        {recipes.map((recipe) => (
          <div className="receta" key={recipe.id}>
            <h3>{recipe.title}</h3>

            <p dangerouslySetInnerHTML={{ __html: recipe.desc }}></p>

            {recipe.viewing && (
              <div>
                <h4>Ingredientes</h4>
                <ul>
                  {recipe.ingredients.map((ingredient, i) => (
                    <li key={i}>{ingredient}</li>
                  ))}
                </ul>

                <div>
                  <h4>Instrucciones</h4>
                  <ol>
                    {recipe.steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            )}

            <div className="buttons">
              <button onClick={() => handleView(recipe.id)}>
                {" "}
                VER {recipe.viewing ? "MENOS" : "MAS"}{" "}
              </button>
              <button className="remove" onClick={() => removeRecipe(recipe.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Create */}
      {popUpActive && (
        <div className="popup">
          <div className="popup-inner">
            <h2> Agregar una nueva receta</h2>

            <form onSubmit={handleSubmit}>
              <div>
                <label>Titulo: </label>
                <input 
                  type="text"
                  value={form.title} 
                  onChange={e => setForm({...form, title: e.target.value})} />
              </div>

              <div>
                <label>Descripción: </label>
                <input 
                  type="text"
                  value={form.desc} 
                  onChange={e => setForm({...form, desc: e.target.value})} />
              </div>

              <div>
                <label>Ingredientes: </label>
                {
                  form.ingredients.map((ingredient , i) => (
                    <div key={i}>
                      <input 
                        type="text"
                        value={ingredient} 
                        onChange={e => handleIngredient(e, i)} />
                    </div>
                  ))
                }
               <button type="button" onClick={handleIngredienteCount}>+ Ingrediente</button>
              </div>

              <div>
                <label>Instrucciones: </label>
                {
                  form.steps.map((step , i) => (
                    <div key={i}>
                      <textarea 
                        type="text"
                        value={step} 
                        onChange={e => handleIntruccion(e, i)} />
                      </div>
                  ))
                }
               <button type="button" onClick={handleIntruccionCount}>+ Ingrediente</button>
              </div>

                <div className="buttons">
                  <br/>
                    <button type="submit"> Agregar </button>
                    <button type="button" onClick={() => setPopUpActive(false)} > Cerrar </button>
                </div>
            </form>

          </div>
        </div>
      )}


    </div>
  );
}

export default App;
