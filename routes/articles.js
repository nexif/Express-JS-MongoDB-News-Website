var express = require('express');
var router = express.Router();
var Article = require('./../models/article');
var marked = require('marked'); //pozwala na Markdown i konwertuje go na HTML
var slugify = require('slugify'); //pozwala skracać linki
var methodOverride = require('method-override');



router.get('/', function(req, res, next) {
    res.render('articles', { title: 'Articles' });
});

router.get('/edit/:id', async (req,res) => {
    const article = await Article.findById(req.params.id);
    res.render('articles/edit', {article: article})
})

router.get('/:slug', async (req,res,next) => {
    const article = await Article.findOne({slug: req.params.slug});
    // jeśli podamy niepoprawny adres ID artykułu - zostaniemy przeniesieni do strony głównej
    if (article == null) res.redirect('/');
    res.render('articles/show', {article:article});
})





router.post('/', async (req, res, next) =>{
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
    })
    try{
        article = await article.save(); // ta funkcja jest asynchroniczna i musimy poczeać na nią
        res.redirect('articles/' + article.slug);
    } catch(e){
        console.log(e);
        res.render('articles/new', {article: article});
    }
})

// router.use('_method', methodOverride);
router.delete('/:id', async (req,res) =>{
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/');
})

module.exports = router;