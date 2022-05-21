const express = require('express')
const path = require('path')
const {engine} = require('express-handlebars')
const bodyParser = require('body-parser')

const app = express()

//Handlebars
app.engine('.hbs', engine({defaltLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');


// Set static folder
app.use(express.static(path.join(__dirname, 'public')))


app.get('/', (req, res) => {
    res.render('index');
})

app.get('/contact-us', (req, res) => {
    res.render('contact-us');
})

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server started on ${PORT}`))