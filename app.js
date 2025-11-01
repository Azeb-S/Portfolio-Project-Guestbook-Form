//Import The express
import express from 'express'

//Create an instance of an Express application 
const app = express()

//Set EJS as view engine
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

//Define an admin route
app.get('/admin', (req, res) => {
 res.render('admin', { orders })

})

// Define the submit route
app.post('/submit-order', (req, res) => {
 //create a JSON object to store the data

 const order = req.body
 orders.push(order)
 console.log(orders)

 res.render('confirmation', { order })

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
