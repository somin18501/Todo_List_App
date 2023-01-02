const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyparser = require('body-parser')

const connectDB = require('./server/database/connection')

const app = express()

dotenv.config({path:'config.env'})
const port = process.env.PORT || 8080

// log request
app.use(morgan('tiny'))

// mongodb connection
connectDB()

// parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}))

// set view engin
app.set('view engine','ejs')
// app.set('views',path.resolve(__dirname,'views/ejs')) // use only if you store ejs files in another folder in views

// load assets
// css/style.css // i.e. instead of using full path we use virtual path (css) used below and file name in it 
app.use('/css',express.static(path.resolve(__dirname,'assets/css')))
app.use('/js',express.static(path.resolve(__dirname,'assets/js')))
app.use('/img',express.static(path.resolve(__dirname,'assets/img')))


// app.get('/',(req,res)=>{
//     // res.send('Crud Application') // instead this we want to render html file when '/' is requested
//     res.render('index')
// })
// app.get('/add-user',(req,res)=>{
//     // res.send('Crud Application') 
//     res.render('add_user')
// })
// app.get('/update-user',(req,res)=>{
//     // res.send('Crud Application') 
//     res.render('update_user')
// })
            

// load routes // instead of writing all routes in one server we write it in seperate file 
app.use('/',require('./server/routes/router'))

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})