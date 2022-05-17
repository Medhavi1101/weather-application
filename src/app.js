const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()

//Define paths for Express congfig
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

 // Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory  to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
      title:"Weather",
      name:'Andrew'  
    })
})
app.get('/about',(req,res) => {
    res.render('about', {
        title:'About me',
        name:'Andrew'
    })
})
app.get('/help',(req,res) => {
    res.render('help', {
      
        msg:'If any queries, please go through our faqs',
        title: 'Help',
        name:'Andrew'
    })
})

app.get("/Weather",(req, res) => {
    if(!req.query.address){
        return res.send({
            error:"You must provide an address!"
        })
    }
    else{
    geocode(req.query.address, (error,{ latitude , longitude , location} ={}) =>{
     if(error){
         return res.send({error})
     }
    
    forecast(latitude,longitude,(error,forecastdata) => {
    if(error){
        return res.send(error)
    }
    
    res.send({
        forecast: forecastdata,
        location: location,
        address: req.query.address
    })
   
 })
    
 })
   


}

    
})

app.get('/products',(req,res) => {
    if(!req.query.search) {
        return res.send({
            error:"You must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []

    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Andrew',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title:'404',
        name:'Andrew',
        errorMessage:"Page not found."
    })
})

app.listen(3000,() => {
    console.log("Server is up on the port 3000.")
})