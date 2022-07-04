if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
//  require('dotenv').config();This Example removes the rest of error stack if section 3 lines is commented out above but hAS MEMORY ISSUE 
// console.log(process.env.SECRET)
// console.log(process.env.API_KEY)

const express        = require("express");
const path           = require("path");
const mongoose       = require('mongoose');
const ejsMate        = require("ejs-mate");
const session        = require('express-session');
const flash          = require('connect-flash');
const ExpressError   = require("./utils/ExpressError");
const methodOverride = require('method-override');
const passport       = require('passport');
const LocalStrategy  = require('passport-local');
const User           = require('./models/user');
const helmet         = require('helmet');

const mongoSanitize    = require('express-mongo-sanitize');

const userRoutes     = require('./routes/users')
const campgroundRoutes    = require('./routes/campgrounds');
const reviewRoutes    = require('./routes/reviews');


mongoose.connect('mongodb://localhost 27017/yelp-camp', {
useNewUrlParser:true,
useCreateIndex: true,
useUnifiedTopology: true,
useFindAndModify: false
});
//const db shortens the code//product below ensure database is running
const db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error:"));
db.once("open", () => {
console.log("Database connected");
});

const app =  express();

app.engine("ejs", ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))
app.use(mongoSanitize({
    replaceWith: '_'
}));

const sessionConfig = {
    name:'session',//changed name of session from default
    secret:'thisshouldbeabettersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 *60 * 24 * 7,
        maxAge:  1000 * 60 *60 * 24 * 7
    }
}
app.use(session(sessionConfig))
app.use(flash());
app.use(helmet({ contentSecurityPolicy: false }));

  const scriptSrcUrls = [
    // "https://stackpath.bootstrapcdn.com/",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha3/dist/css/bootstrap.min.css",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
     "https://cdnjs.cloudflare.com/",
     "https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js",//just added
    "https://cdn.jsdelivr.net",
    "https://cdn.jsdelivr.net/npm/bs-custom-file-input/dist/bs-custom-file-input.min.js",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha3/dist/css/bootstrap.min.css",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net/npm/bs-custom-file-input/dist/bs-custom-file-input.min.js",
    "https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js",
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
    'https://res.cloudinary.com/yelpCamp/',
     'https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js',

];  
const fontSrcUrls = [];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "self:",
                "blob:",
                "data:",
                // 'https://res.cloudinary.com/duhibj2db/image/upload/v1612626465/YelpCamp/gaud6nsijwcg8arhmpsl.jpg',
                'https://res.cloudinary.com/duhibj2db/image/upload/v1612626465/YelpCamp/ctdujvuj8b0uptroobqh.jpg',
                "https://res.cloudinary.com/duhibj2db/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
                "https://images.unsplash.com/",
                'https://t3.ftcdn.net/jpg/02/80/97/74/240_F_280977466_ubxFr0JEOd3OebKMYoNIchR7w13SQjuB.jpg',
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    // console.log(req.session)
   // console.log(req.query);
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error')
    next();
})
app.use('/', userRoutes);
app.use('/campgrounds', campgroundRoutes)
app.use('/campgrounds/:id/reviews', reviewRoutes)

//Homepage route
app.get("/", (req, res) => {
    res.render('home')
});



app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found!', 404))
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message ="oh no,something went wrong!"
    res.status(statusCode).render('error', { err })
});

app.listen(3000, () => {
    console.log("Serving Yelpcamp on port 3000")
})
