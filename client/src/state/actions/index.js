export function updateRecipes() {
  return async function(dispatch) {
    try {
      // console.log('we are inside the action')
      // const response = await fetch('http://localhost:3001/filter/getall');
      // const json = await response.json();
      const theboys = [
        {
          "id": 1,
          "tittle": "salmon",
          "image": "https://i.blogs.es/be862d/salmon/840_560.jpg",
          "summary": "its just a bit of salmon",
          "health_score": 70.0, 
          "steps": "it is good bro :D",
          "diets": ["ovo leg", "no panties"],
        },
        {
          "id": 2,
          "tittle": "pollo",
          "image": "https://www.paulinacocina.net/wp-content/uploads/2021/11/pollo-asado.jpg",
          "summary": "its just a bit of pollo",
          "health_score": 50.0, 
          "steps": "it is good bro :D",
          "diets": ["ovo leg", "no cumties"],
      },
      {
          "id": 3,
          "tittle": "perro",
          "image": "https://www.paulinacocina.net/wp-content/uploads/2021/11/pollo-asado.jpg",
          "summary": "its just a bit of perro",
          "health_score": 50.0, 
          "steps": "it is good bro :D",
          "diets": ["ovo leg", "no cumties"],
      },
      {
          "id": 4,
          "tittle": "gato",
          "image": "https://www.paulinacocina.net/wp-content/uploads/2021/11/pollo-asado.jpg",
          "summary": "its just a bit of perro",
          "health_score": 50.0, 
          "steps": "it is good bro :D",
          "diets": ["ovo leg", "no cumties"],
      },
      {
          "id": 5,
          "tittle": "auto",
          "image": "https://www.paulinacocina.net/wp-content/uploads/2021/11/pollo-asado.jpg",
          "summary": "its just a bit of perro",
          "health_score": 50.0, 
          "steps": "it is good bro :D",
          "diets": ["ovo leg", "no cumties"],
      },
      {
          "id": 6,
          "tittle": "auto",
          "image": "https://www.paulinacocina.net/wp-content/uploads/2021/11/pollo-asado.jpg",
          "summary": "its just a bit of perro",
          "health_score": 50.0, 
          "steps": "it is good bro :D",
          "diets": ["ovo leg", "no cumties"],
      },
      {
          "id": 7,
          "tittle": "auto",
          "image": "https://www.paulinacocina.net/wp-content/uploads/2021/11/pollo-asado.jpg",
          "summary": "its just a bit of perro",
          "health_score": 50.0, 
          "steps": "it is good bro :D",
          "diets": ["ovo leg", "no cumties"],
      },
      {
          "id": 8,
          "tittle": "auto",
          "image": "https://www.paulinacocina.net/wp-content/uploads/2021/11/pollo-asado.jpg",
          "summary": "its just a bit of perro",
          "health_score": 50.0, 
          "steps": "it is good bro :D",
          "diets": ["ovo leg", "no cumties"],
      },
      {
          "id": 9,
          "tittle": "auto",
          "image": "https://www.paulinacocina.net/wp-content/uploads/2021/11/pollo-asado.jpg",
          "summary": "its just a bit of perro",
          "health_score": 50.0, 
          "steps": "it is good bro :D",
          "diets": ["ovo leg", "no cumties"],
      },
      ]
      dispatch({ type: 'update', payload: theboys });
      // dispatch({ type: 'update', payload: json });
      // console.log('we finished the action')
    } catch (err) {
      console.log(err)
      return dispatch({ type: 'default' });
    }
  }
}

// export function updateRecipes(payload) {
//   return {
//     type: 'update',
//     payload,
//   };
// }


