const express = require('express')
const path = require('path')
const {engine} = require('express-handlebars')
const bodyParser = require('body-parser')

const nodemailer = require('nodemailer')
const { text } = require('stream/consumers')

const app = express()

//Handlebars
app.engine('.hbs', engine({defaltLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(express.json())

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))



app.get('/', (req, res) => {
    res.render('index');
})

app.get('/about-us', (req, res) => {
    res.render('about-us');
})

app.get('/private-haven', (req, res) => {
    res.render('private-haven');
})

app.post('/', (req, res) => {
    // console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ojayconnect@gmail.com',
            password: 'ojima123'
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: 'ojayconnect@gmail.com',
        subject: `Message from ${req.body.email}: ${req.body.subject}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info)=>{
        if (error) {
            console.log('error');
            res.send('error')
        }else {
            console.log('Email sent: ' + info.response);
            res.send('Success')
        }
    })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server started on ${PORT}`))