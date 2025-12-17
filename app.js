const express = require('express');
const app = express();
const mongoose = require('mongoose');
const listing = require('./models/listing.js')
const path = require('path');
const methodoverride = require("method-override");
const ejsmate = require('ejs-mate');

app.set('view engine' , 'ejs')
app.set('views' , path.join(__dirname , 'views'))
app.use(express.urlencoded({extended : true}))
app.use(methodoverride('_method'));
app.engine('ejs', ejsmate);
app.use(express.static(path.join(__dirname , "/public")))
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


mongoose.connect('mongodb://127.0.0.1:27017/wonderland')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.get('/' , async (req , res)=>{
   const alllisting =  await listing.find({});
   res.render('listings/index.ejs' , {alllisting});
})

app.use('/uploads', express.static('uploads'));
// New Post
app.get('/listings/new' , (req , res)=>{
    res.render('listings/new.ejs')
})

app.post('/listings', upload.single('image'), async (req, res) => {

  const newlisting = new listing(req.body.listing);

  if (req.file) {
    newlisting.image = {
      url: `/uploads/${req.file.filename}`,
      filename: req.file.filename
    };
  }

  await newlisting.save();
  res.redirect('/');
});


// edit 

app.get('/listings/:id/edit' , async (req , res)=>{
    let {id} = req.params;
    const foundlisting = await listing.findById(id)
    res.render('listings/edit.ejs' , {foundlisting})
})

// update

app.put('/listings/:id' ,upload.single('image'), async (req , res)=>{
    let {id} = req.params;
    await listing.findByIdAndUpdate(id, req.body.listing);
    res.redirect('/')
})

// Delete

app.delete('/listings/:id' , async (req , res)=>{
    let {id} = req.params;
    await listing.findByIdAndDelete(id)
    res.redirect('/')
})

app.get('/listings/:id' , async (req , res)=>{
    let {id} = req.params;
    const foundlisting = await listing.findById(id);
    res.render('listings/show.ejs' , {foundlisting})
})


// data listing in models 

// app.get('/testlisting', (req, res) => {
//     let simplelisting = new listing({
//         title: 'My village',
//         discrption: 'By the Beach',
//         price: 500000,
//         location: "khanpur",
//         country: 'Pakistan'
//     });a
//     simplelisting.save().then((res) => {
//         console.log('data are save');
//     }).catch(err => {
//         console.log('error ha bro', err);
//     })
//     res.send("successful");
// })

app.listen(3000, () => {
    console.log('port is listening');
})