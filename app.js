//Import The module
import express from 'express'
import mysql2 from 'mysql2'
import dotenv from 'dotenv'

// Load the variables from .env file
dotenv.config()
const pool = mysql2.createPool({
 host: process.env.DB_HOST,
 user: process.env.DB_USER,
 password: process.env.DB_PASSWORD,
 database: process.env.DB_NAME,
 port: process.env.DB_PORT
}).promise()


//Create an instance of an Express application 
const app = express()

//Set EJS as view engine
// app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Enable static file serving
app.use(express.static('public'))

//Allow the app tp parse from data (req.body)
app.use(express.urlencoded({ extended: true }))

//Define the port number where our server will listen
const PORT = 3002

const orders = []

//Define a default "route"('/')
// req: contains information about the incoming request
// res: allows us to send back a response to the client
app.get('/', (req, res) => {

 // Send a response to the client

 //res.sendFile(`${import.meta.dirname}/views/home.html`)
 res.render('home')
})


// CONTACT PAGE route
app.get('/contact', (req, res) => {

 res.render('contact')
})

//Define an admin route
app.get('/admin', async (req, res) => {
 try {
  const [orders] = await
   pool.query('SELECT * FROM contacts ORDER BY created_at  DESC')

  res.render('admin', { orders })

 } catch (err) {
  console.error('Database error:', err)
 }
})
// Define the submit route
app.post('/submit-order', async (req, res) => {

 //create a JSON object to store the data
 const order = req.body
 order.timestamp = new Date()

 //Write a query to insert order into DB
 const sql = "INSERT INTO contacts (fname,lname,jobt,company,lurl,email,meet,otherinput,message,subscribe,format) VALUES(?,?,?,?,?,?,?,?,?,?,?)"

 // Map checkbox + radio properly
 const subscribe = req.body.subscribe ? 'yes' : 'no'  // checkbox
 const format = req.body.format || null               // radio, can be null

 console.log(orders)
 //Create array of Parameters of each placeholder
 const params = [
  order.fname,
  order.lname,
  order.jobt,
  order.company,
  order.lurl,
  order.email,
  order.meet,
  order.otherinput,
  order.message,
  order.subscribe,
  order.format
 ]
 try {
  const [result] = await pool.execute(sql, params)

  //Send User to confirmation page
  res.render('confirmation', { order })

 } catch (err) {

  console.log("Database Error", err)
  res.status(500).send('Database error')

 }



})

app.get('/confirmation', (req, res) => {
 const order = orders[orders.length - 1] || null
 res.render('confirmation', { order })
})



// Start the server and make it listen on the port 
// specified above

app.listen(PORT, () => {
 console.log(`Server is running at http://localhost:${PORT}`)
})
