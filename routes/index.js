var express = require('express');
const app = require("../app");
var router = express.Router();
var Article = require('./../models/article');


/* GET home page. */
router.get('/', async function(req, res, next) {
 const articles = await Article.find().sort({createdAt: 'desc'});
  res.render('articles/index', { title: 'HomePage', articles: articles});
});

router.get('/articles/new', (req,res) =>{
    res.render('articles/new', {article: new Article()})
})

router.post('/', (req, res, next) =>{

})


module.exports = router;
