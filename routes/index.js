var express = require('express');
const app = require("../app");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
 const articles = [{
   title: 'test article',
   createdAt: new Date(),
   description: 'test description'
    },
     {
         title: 'test article 2',
         createdAt: new Date(),
         description: 'test description - article 2'
     }];
  res.render('index', { title: 'HomePage', articles: articles});
});

router.get('/new', (req,res) =>{
    res.render('articles/new')
})


module.exports = router;
