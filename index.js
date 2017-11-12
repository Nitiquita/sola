const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router(); 

const User; 

//morgan for logging requests and responses in dev environment
app.use(logger('dev')); 

//body-parser for accessing body object with req.body
//.json to parse json data
app.use(bodyParser.json());  
//parse URL in GET requests and false to access querystring module
app.use(bodyParser.urlencoded({ extended: false }));  

//path 
app.use(express.static(path.join(__dirname, 'public'))); 

app.use(Router)





/*--------*/
/*ROUTING*/
/*--------*/

//POST new user 
router.post('/signup',(req, res, next) => {
  User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    gender: req.body.gender,
    age: req.body.age,
    profession: req.body.profession,
    email: req.body.email,
    phone_number: req.body.phone_number,
    hometown: req.body.hometown,
  })
  .then(user => { res.status(201).json(user)  })
  .catch(next)
})

//GET suggested cities
router.get('/cities/suggested', (req, res, next) => {
  UserInterests.findAll({ 
    where: {
      user_id: req.user
    }
  })
  .then((interestIds) => {
    let cities = [];
    interestIds.forEach((interest) => {
      UserCities.findAll({
        where: {
          interest_id: interest
        }
      })
      .then((city) => {
        cities.push(city)
    })
    res.status(201).json(cities)
  })
})
  .catch(next);
})

//GET selected destination 
//check if it will get to this route, maybe place this route in above route
router.get('/destinations/:id', (req, res, next) => {
  Destinations.findOne({
    where: {
      destination_id: req.param
    }
  })
  .then(destination => {res.status(201).json(destination)})
  .catch(next)
})

//GET users messages
router.get('/messages', (req, res, next) => {
  Messages.findAll({
    where: {
      user_id: req.user
    }
  })
  .then(messages => res.status(201).json(messages))
  .catch(next)
})

//GET recommended reviews for cities 
router.get('/cities/good', (req, res, next) => {
  UserCities.findAll({
    where: {
      is_recommended: true
    }
  }) 
  .then(cities => { res.status(201).json(cities) })
  .catch(next)
})

//GET recommended reviews for sights 
router.get('/sights/good', (req, res, next) => {
  UserSights.findAll({
    where: {
      is_recommended: true
    }
  }) 
  .then(sights => { res.status(201).json(sights) })
  .catch(next)
})

//GET recommended reviews for lodging 
router.get('/lodging/good', (req, res, next) => {
  UserLodging.findAll({
    where: {
      is_recommended: true
    }
  }) 
  .then(lodging => { res.status(201).json(lodging) })
  .catch(next)
})

//GET recommended reviews for dining 
router.get('/dining/good', (req, res, next) => {
  UserDining.findAll({
    where: {
      is_recommended: true
    }
  }) 
  .then(dining => { res.status(201).json(dining) })
  .catch(next)
})

//GET bad reviews for cities 
router.get('/cities/good', (req, res, next) => {
  UserCities.findAll({
    where: {
      is_recommended: false
    }
  }) 
  .then(cities => { res.status(201).json(cities) })
  .catch(next)
})

//GET bad reviews for sights 
router.get('/sights/good', (req, res, next) => {
  UserSights.findAll({
    where: {
      is_recommended: false
    }
  }) 
  .then(sights => { res.status(201).json(sights) })
  .catch(next)
})

//GET bad reviews for lodging 
router.get('/lodging/good', (req, res, next) => {
  UserLodging.findAll({
    where: {
      is_recommended: false
    }
  }) 
  .then(lodging => { res.status(201).json(lodging) })
  .catch(next)
})

//GET bad reviews for dining 
router.get('/dining/good', (req, res, next) => {
  UserDining.findAll({
    where: {
      is_recommended: false
    }
  }) 
  .then(dining => { res.status(201).json(dining) })
  .catch(next)
})

//GET suggested connections 
router.get('/connections', (req, res, next) => {
  UserInterests.findAll({ 
    where: {
      user_id: req.user
    }
  })
  .then((interestIds) => {
    let users = [];
    interestIds.forEach((interest) => {
      Users.findAll({
        where: {
          interest_id: interest
        }
      })
      .then((user) => {
        users.push(user)
    })
    res.status(201).json(users)
  })
})
  .catch(next);
})

//GET profile information for a specific user 
router.get('/users/:uid', (req, res, next) => {
  User.findOne({
    where: {
      id: req.param
    }
  })
  .then(user => { res.status(201).json(user) })
})

//POST incomplete or complete recommendation form for cities
router.post('/cities/recommend', (req, res, next) => {
  UserCities.create({
    user_id: req.body.user,
    city_name: req.body.city_name,
    interest_id: req.body.interest_id,
    review: req.body.review,
    safety_rating: req.body.safety_rating,
    is_bus: req.body.is_bus,
    is_train: req.body.is_train,
    is_subway: req.body.is_subway,
    is_bike: req.body.is_bike,
    is_walk: req.body.is_walk,
    is_cab: req.body.is_cab,
    is_car: req.body.is_car,
    is_tram: req.body.is_tram
  })
  .then(city => { res.status(201).json(city)})
})

//GET incomplete recommendation form 
router.get('/cities/:cid', (req, res, next) => {
  UserCities.findOne({
    where: {
      id: req.param
    }
  })
  .then(city => { res.status(201).json(city) })
  .catch(next)
})

//GET updated friend's list 
router.get('/user/friends', (req, res, next) => {
  Friends.findAll({
    where: {
      user_id: req.user,
      status: true
    }
  })
  .then(friends => { res.status(201).json(friends)})
  .catch(next)
})

//GET a saved trip
router.get('/user/:tid', (req, res, next) => {
  UserSavedTrip.findOne({
    where: {
      id: req.param
    }
  })
  .then(trip => { res.status(201).json(trip)})
  .catch(next)
}) 

//add error handling 
//for dev environment only
app.use((req, res, next) => {  
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {  
  app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
          message: err.message,
          error: err
      });
  });
}

app.use(function(err, req, res, next) {  
  res.status(err.status || 500);
  res.render('error', {
      message: err.message,
      error: {}
  });
});



const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at localhost', host, port);
});