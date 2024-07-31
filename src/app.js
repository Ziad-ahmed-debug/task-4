const express = require("express")
const path = require("path")

const app = express()
const x = path.join(__dirname , '../public')
app.use(express.static(x))

const port = process.env.PORT || 3000





 app.get( '/prices' , (req,res) => {
    res.send(" this is Price page content from route (/prices)")
 })


 app.get( '/about' , (req,res) => {
    res.send("this is About page content from route (/about)")
 })

 app.get( '/page1' , (req,res) => {
    res.send('<h2>this is Page1 content from route (/page1) </h2><h2>my name is Maram </h2>  <button>Submit</button>')
 })

 app.get( '/page2' , (req,res) => {
    res.send({
        name : "Ziad",
        age : 21,
        city : "Assiut",
        dec: "this is Page2 content from route (/page2)"
    })
 })


 app.get( '/page3' , (req,res) => {
    res.send({
        name : "Ahmed",
        age : 33,
        city : "Assiut",
         dec: "this is Page3 content from route (/page3)"
    })
 })

 /////////////////////////////////////////////////////////////////////////////////

 app.set('view engine', 'hbs');

 const viewsDirectory = path.join (__dirname , '../templates/views')
 app.set('views', viewsDirectory);

  // to read partials : 
  var hbs = require('hbs');
  const partialsPath = path.join(__dirname , "../templates/partials")
  hbs.registerPartials(partialsPath)

  app.use(express.urlencoded({
   extended: true
 }));


  app.get ('/' , (req,res) => {
   res.render('index' , {
       title : "HOME",
       desc : "This is hps home page",
       name: req.body.name
   })
})

app.get ('/service' , (req,res) => {
   res.render('service' , {
       title : "SERVICE",
       name: "Mohamed",
       city:"Assiut",
       age: 40,
       img1: "images/trainer-3.jpg"
   })
})


app.get ('/team' , (req,res) => {
   res.render('team' , {
       title : "TEAM",
       name: "abdo",
       city:"Assiut",
       age: 35,
       img2: "images/trainer-2.jpg"
   })
})

app.get ('/Employees' , (req,res) => {
   res.render('Employees' , {
       title : "Employees",
       name: "Essam",
       city:"Assiut",
       age: 30,
       img3: "images/trainer-1.jpg"
   })
})

app.get ('/FAQ' , (req,res) => {
   res.render('FAQ' , {
       title : "FAQ",
       Category: "Product",
       Question:"Question1",
       Answer: "Answer1"
      
   })
})



const forecast = require('./weatherAPIs/forecast.js')
const geocode = require('./weatherAPIs/geocode.js')

app.get('/weather',(req,res)=>{
   if(!req.query.address){
       return res.send({
           error:'Kindly insert the country name'
       })
   }
   geocode(req.query.address,(error,data)=>{
       if(error){
         
           return res.send({error})
       }
       forecast(data.latitude,data.longitude,(error,forecastData)=>{
           if(error){
               return res.send({error})
           }
           res.send({
               forecast:forecastData,
               location:req.query.address,
               latitude:data.latitude,
               longitude: data.longitude
           })
       })
   })
})



app.get('*' , (req , res)=> {
   res.send('404 Page Not Founded')
})


 app.listen( port , () => {
    console.log("app listening on port 3000")
})
