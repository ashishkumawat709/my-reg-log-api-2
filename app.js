const express = require('express')
const app = express()
const mongoose = require('./db/conn')
const router = require('./routes/studentRoute')
const hbs = require('hbs')
const path = require('path')

const temppath = path.join(__dirname, './templates/views')
const partialspath = path.join(__dirname, './templates/partials')
app.set('view engine', 'hbs')
app.set('views', temppath)
hbs.registerPartials(partialspath)

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/', router)


app.listen(3000, ()=>{
    console.log('listening 3000');
})