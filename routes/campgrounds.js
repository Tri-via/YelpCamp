var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
//INDEX
router.get("/",function(req, res){
	//Get all campgrounds from DB
	Campground.find({},function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else{
			res.render("campgrounds/index", {campgrounds : allCampgrounds, currentUser:req.user});
		}
	});
});

//CREATE
router.post("/",middleware.isLoggedIn,function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var price = req.body.price;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {name: name, price:price, image: image, description:desc, author: author};
	//create a new campground and save to database
	Campground.create(newCampground,function(err, newlyCreated){
		if(err){
			console.log(err);
		} else{
			console.log(newlyCreated);
			res.redirect("/campgrounds");
		}
	});
});

//NEW
router.get("/new",middleware.isLoggedIn,function(req, res){
	res.render("campgrounds/new");
});

//SHOW
router.get("/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,fcampground){
		if(err){
			console.log(err);
		} else{
			res.render("campgrounds/show",{campground: fcampground});
		}
	});
});

//Edit Campground Routes

router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req, res){
	Campground.findById(req.params.id, function(err, fcampground){
		console.log(fcampground);
		res.render("campgrounds/edit",{campground: fcampground});
	});
});

//Update Campground Routes
router.put("/:id",middleware.checkCampgroundOwnership,function(req, res){
	//find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		} else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
	//redirect
});

// Destroy Campground Route
router.delete("/:id",middleware.checkCampgroundOwnership,function(req, res){
	Campground.findByIdAndDelete(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		} else{
			res.redirect("/campgrounds");
		}
	});
});


module.exports = router;