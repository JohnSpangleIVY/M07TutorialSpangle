const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to mongodb
const dbURI = 'mongodb+srv://testuser123:jt3QhYVIheU2WYLk@node-tuts.kjiohpd.mongodb.net/node-tuts;'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');



/* not used anymore, kept for reference
app.use((req, res, next) => {
  console.log('new request made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method:', req.method);
  next();
});
*/



// middleware static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));



/* not used anymore, kept for reference

// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'new blog',
    snippet: 'about my new blog',
    body: 'more about my new blog'
  });

  blog.save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/single-blog', (req, res) => {
  Blog.findById('644b34e8f2dbb8a33c1d5306')
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use((req, res, next) => {
  console.log('in the next middleware:');
  next();
});
*/



// routes
app.get('/', (req, res) => {
  //res.send('<p>home page</p>');
  //res.sendFile('./views/index.html', { root: __dirname });
  /*
  const blogs = [
    {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat Bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'}
  ];
  res.render('index', { title: 'Home', blogs });
  */
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  //res.send('<p>about page</p>');
  //res.sendFile('./views/about.html', { root: __dirname });
  res.render('about', { title: 'About'});
});

// blog routes
app.use('/blogs', blogRoutes);


/* no longer needed, but kept for future reference!
// redirects
app.get('/about-us', (req, res) => {
  res.redirect('/about');
});
*/

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404'});
});
