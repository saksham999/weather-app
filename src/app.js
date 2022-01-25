const express= require('express')
const path= require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app= express()
const port = process.env.PORT || 3000

// Define Path for Express config
const publicDirectoryPath= path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Sak'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About App',
        name: 'Sak'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText: 'Help page',
        title:'Help',
        name:'sak'
    })
})

/*app.get('',(req, res)=>{
    res.send('<h1>Weather</h1>')
})

app.get('/help' , (req,res)=>{
    res.send([{
        name:'Saksham'
    },{
        name:'Sak'
    }])
})

app.get('/about' , (req,res)=>{
    res.send('<h1>About</h1>')
}) */

app.get('/weather' , (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'you must provide address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=>{

    if(!req.query.search){
        return res.send({
            error: 'you must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404' ,
        name: 'Sak',
        message: 'Help Page not found.'
    })
})

app.get('*', (req,res)=>{
    res.render('404',{
        title: '404' ,
        name: 'Sak',
        message: 'Page not found.'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port.' + port)
})