const path = require("path");
const express = require("express"); //importing th express module
//require function, whose job is to load modules and give you access to their exports
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();
const hbs = require("hbs");


//console.log(__dirname); //print the direactory in which the file is
//console.log(__filename); // print the full path of the file
//define paths for express config

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../src/templates/views");
const partialsPath = path.join(__dirname, "../src/templates/partials");

//setup handlers engine and views location

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath)//registerPartials take the path where we have our partialsFile


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
}); 
//setup static directory to serve)
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Darshan Khandelwal",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Darshan Khandelwal",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "This is text",
    name: "Darshan Khandelwal"
  });
});

app.get("/weather", (req, res) => {
  if(!req.query.address)
  {
    return res.send({
      error: 'You must provide an address'
    })
  }
  
    geocode(req.query.address, (error, {latitude , longitude , location} = {}) => {  
    
      if(error)
      {
          return res.send({error})
      }
      forecast(latitude , longitude , (error , forecastdata) =>
  {
      if(error)
      {
          return res.send({error});
      }
      res.send({
        forecast: forecastdata,
        location,
        address: req.query.address
      })
  })
  });
  
})

app.get('/products' , (req , res) =>
{
  if(!req.query.search)
  {
    //using return to stop the fn on the spot with the printing of this error
   return res.send({
     error: 'You must provide a search term'
   })
  }
  else{ }
  //console.log(req.query.search);//query is also an object and contains all of query string information
  res.send({
    products:[]
  })
})

app.get('/help/*' , (req,res) =>
{
res.render('404' , {
  title: '404',
  name: 'Darshan Khandelwal',
  errorMessage: 'Page Not found'
})
})
app.get('*', (req,res) =>
{
res.status('404').send({
  title: '404',
  name: 'Darshan Khandelwal',
  errorMessage: 'Page Not found'
})
})

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
