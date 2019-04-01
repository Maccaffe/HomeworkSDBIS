var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

global.movies=[
  {
    "ID":1,
     "Title":"Avengers: Infinity War",
     "Year":2018,
     "Genres":[
        "Action",
        "Adventure",
        "Sci-Fi"
     ]
  },
  {
    "ID":2,
     "Title":"A Star Is Born",
     "Year":2018,
     "Genres":[
       "Drama",
       "Music",
       "Romance"
     ]
  },
  {
    "ID":3,
     "Title":"Green Book",
     "Year":2018,
     "Genres":[
       "Biography",
       "Comedy",
       "Drama"
     ]
  },
  {
    "ID":4,
     "Title":"Get Out",
     "Year":2017,
     "Genres":[
       "Horror",
       "Mystery",
       "Thriller"
     ]
  },
  {
    "ID":5,
     "Title":"Solace",
     "Year":2015,
     "Genres":[
       "Crime",
       "Drama",
       "Mystery"
     ]
  },
  {
    "ID":6,
     "Title":"Instant Family",
     "Year":2018,
     "Genres":[
        "Comedy",
        "Drama"
     ]
  },
  {
    "ID":7,
     "Title":"The Last Samurai",
     "Year":2003,
     "Genres":[
        "Action",
        "Drama",
        "War"
     ]
  }
];

//GET ALL
app.get('/movies',function(req,res){
  return res.status(200).json({
    movies: global.movies,
    error:false
  });
});

//POST
app.post('/movies',function(req,res){
  if(!req.body.Title){
    return res.status(501).json({
      message: "Title is missing, it is mandatory!",
      error:true
    });
  }
  global.movies.push(req.body);
  return res.status(200).json({
    message: "Success",
    error:false
  });
});

//PUT
app.put('/movies/:ID',function(req,res){
  for(let i=0;i<global.movies.length;i++){
    if(global.movies[i].ID === parseInt(req.params.ID)){
      global.movies[i].Title = req.body.Title;
      global.movies[i].Year = req.body.Year;
      global.movies[i].Genres=req.body.Genres;
      return res.status(200).json({
        message: "Success",
        error:false
      });
    }
  }
  return res.status(404).json({
    message: "Movie not found",
    error:true
  });
});
//DELETE ONE
app.delete('/movies/:ID',function(req,res){
  for(let i=0;i<global.movies.length;i++){
    if(global.movies[i].ID === parseInt(req.params.ID)){
      global.movies.splice(i,1);
      return res.status(200).json({
        message: "Success",
        error:false
      });
    }
  }
  return res.status(404).json({
    message: "Movie not found",
    error:true
  });
});
//GET ONE
app.get('/movies/:ID',function(req,res){
  for(let i=0;i<global.movies.length;i++){
    if(global.movies[i].ID === parseInt(req.params.ID)){
      return res.status(200).json({
        movie: global.movies[i],
        message: "Success",
        error:false
      });
    }
  }
  return res.status(404).json({
    message: "Movie not found",
    error:true
  });
});
//DELETE ALL
app.delete('/movies',function(req,res){
  global.movies.splice(0,global.movies.length);
  return res.status(200).json({
    message: "Success",
    error:false
  })
});


//Suplimentar
app.get('/movies/:ID/genres',function(req,res){
  for(let i=0;i<global.movies.length;i++){
    if(global.movies[i].ID === parseInt(req.params.ID)){
      return res.status(200).json({
        movie: global.movies[i].Title,
        genres: global.movies[i].Genres,
        message: "Success",
        error:false
      });
    }
  }
  return res.status(404).json({
    message: "Movie not found",
    error:true
  });
});

app.put('/movies/:ID/genres',function(req,res){
  for(let i=0;i<global.movies.length;i++){
    if(global.movies[i].ID === parseInt(req.params.ID)){
      global.movies[i].Genres=req.body.Genres;
      return res.status(200).json({
        message: "Success",
        error:false
      });
    }
  }
  return res.status(404).json({
    message: "Movie not found",
    error:true
  });
});

app.listen('3000', function(){
  console.log('Listen to 3000');
});
