const { static } = require('express');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { render } = require('ejs');
const blogRoutes=require('./routes/blogRoutes')

const app = express();

//connect to mongo db atlas 
const dbURI = 'mongodb+srv://<username>:<password>@nodelearndb.rgxuc.mongodb.net/node-learn-db?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

//register view engine and ap p.set lets us configure some application settings and here we'll use EJS view engine to create our templates and views folder is the default value it's gonna look for
app.set('view engine', 'ejs');

//if you want to name the folder something else then you  can use it like this: app.set('view engine','folder-name');


//middleware and static files public here means that those static files are contained inside public folder
app.use(express.static('public'));

//Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option
app.use(express.urlencoded({ extended: true }));

//we can change this dev written below more info on documentation it's basically just difference in outputing the get post result in terminal that's all 
app.use(morgan('dev'));

//mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'SpongeBobSquarePants',
//         snippet: 'hey my new blog 2',
//         body: 'Woah nice blog!'
//     });
//     blog.save()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => console.log(err));
// });

// app.get('/all-blogs',(req,res)=>{
//     Blog.find()
//     .then((result)=>{
//         res.send(result);
//     })
//     .catch((err)=>{
//         console.log(err)
//     });
// });

// app.get('/single-blog',(req,res)=>{
//     Blog.findById('5f3eb3dcf4864c2fd406008b')
//     .then((result)=>{
//         res.send(result)
//     })
//     .catch((err)=>{
//         console.log(err)
//     });
// });


// app.use((req,res,next)=>{
//     console.log('New Request was made');
//     console.log('Host: ',req.hostname);
//     console.log('Path: ',req.path);
//     console.log('Method: ',req.method );
//     next();
//     //next tells this middleware to now move on to next handlers after performing the above tasks
// });


// app.use((req,res,next)=>{
//     console.log('In next middleware..............');
//     next();
// });

app.get('/', (req, res) => {
    // res.send('<p>home</p>');
    // res.sendFile('./views/index.html', { root: __dirname });
    //below is when i used ejs package here express will look for index file
    // const blogs = [
    //     { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    //     { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    //     { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    // ];
    // res.render('index', { title: 'Home', blogs });
    res.redirect('/blogs');

});

app.get('/about', (req, res) => {
    //res.send('<p>about page</p>');
    //res.sendFile('./views/about.html', { root: __dirname })
    res.render('about', { title: 'About' });
});

app.use('/blogs',blogRoutes);

//redirecting in express
// app.get('/about-us', (req, res) => {
//     res.redirect('/about');

// });

//setting up a 404 page
//here use function is going to fire for every single request coming in but only if the request reaches this point in the code
// IMPORTANT: THIS 404 PAGE SHOULD BE ALWAYS AT THE BOTTOM OF THE PAGE
app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html', { root: __dirname })
    res.status(404).render('404', { title: '404' });
});
