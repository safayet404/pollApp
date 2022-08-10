const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const pollController = require('./pollController')
 
const app = express();

app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.set('view engine','ejs')

app.get('/',(req,res)=>{
   res.render('home')
})

app.get('/create' , pollController.createPollGetController)
app.post('/create' , pollController.createPollPostController)
app.get('/polls',pollController.getAllPolls)
app.get('/polls/:id',pollController.viewPollGetController)
app.post('/polls/:id',pollController.viewPollPostController)
// app.post('/create',(req,res)=>{
//     res.render('create')
// })

mongoose.connect('mongodb://localhost:27017/test')
    .then(()=>{
        app.listen(4545,()=>{
            console.log('Application is ready to serve at 4545')
        })

    })
    .catch(err => {
        console.log(err)
    })