// const express = require('express')
// require('dotenv').config()
// const connectDB =require('./config/database')
// const authRoute = require('./Routes/authRoutes')

// const app = express()
// const cors = require('cors');

// app.use(cors());

// app.use(express.json())

// app.use('/auth' , authRoute )



// app.listen(process.env.PORT, ()=>{
//     console.log(`server is start on PORT ${process.env.PORT}`)
//     connectDB()
// })

const express = require('express');
require('dotenv').config();
const connectDB = require('./config/database');
const authRoute = require('./Routes/authRoutes');
const recipeRoute = require('./Routes/recipeRoutes'); // Import the new recipe routes

const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Existing auth routes
app.use('/auth', authRoute);

// New recipe routes
app.use('/api', recipeRoute); // Use the recipe routes under the /api prefix

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
  connectDB();
});