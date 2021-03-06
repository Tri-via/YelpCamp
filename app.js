var express    		 	 = require("express"),
		app        			 = express(),
    bodyParser 			 = require("body-parser"),
    mongoose   			 = require("mongoose"),
    Campground 			 = require("./models/campground"),
    seedDB     			 = require("./seeds"),
    Comment    			 = require("./models/comment"),
    passport      	 = require("passport"),
    LocalStrategy 	 = require("passport-local"),
    User             = require("./models/user"),
 		methodOverride   = require("method-override"),
 		flash            = require("connect-flash")
//Requiring Routes  
var commentRoutes    = require("./routes/comments"),
		campgroundRoutes = require("./routes/campgrounds"),
		indexRoutes      = require("./routes/index");
//heroku config:set MONGODB_URI="mongodb+srv://kushagra:allthebest@cluster0.nt9fa.mongodb.net/yelpcamp?retryWrites=true&w=majority";
mongoose.connect("mongodb+srv://kushagra:allthebest@cluster0.nt9fa.mongodb.net/yelpcamp?retryWrites=true&w=majority");
//mongodb://localhost/yelp_camp1"
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();	//seed the database

app.use(require("express-session")({
	secret: "YelpCamp Site",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/",indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.listen(process.env.PORT || 3000,function(){
	console.log("YelpCam Server has Started!");
});

/*INDEX    /dogs
  NEW 	   /	
  CREATE
  SHOW
*/