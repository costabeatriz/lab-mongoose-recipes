const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
   const newRecipe = {
    title: 'Potato Soup',
    level: 'Easy Peasy',
    ingredients : [
      "Potato",
      "Onions",
      "water",
    ],
    cuisine: "Brazilian",
    dishType: "soup",
    duration: 60,
    creator: "Henrique",
  }
    return Recipe.create(newRecipe)
  })
  .then((recipe) => {
    console.log(recipe)
  })

  Recipe.insertMany(data)
    .then((responseFromDB)=>{
      responseFromDB.forEach(elm =>{
        console.log(elm.title);
      })
  })

  .then(()=>{
  const newRecipe = Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'}, {$set: {duration:100}}, {new:true})
  return newRecipe
  }).then((recipe) => {console.log(recipe)})

  .then(()=>{
    const deleteRecipe =Recipe.deleteOne({title: "Carrot Cake"})
    return deleteRecipe
  })
.then((responseFromDB)=>{
  return mongoose.disconnect()
})
.then((responseFromDB) => {
  console.log("disconnected")
})
  
  .catch(error => {
    console.error('error', error);
  })






