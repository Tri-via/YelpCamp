// all middlewares here
var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req,res,next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, fcampground){
			if(err){
				req.flash("error","Campground not found");
				res.redirect("back");
			} else{
				if(fcampground.author.id.equals(req.user._id)){
					next();
				}else{
					req.flash("error","Permission Denied!");
					res.redirect("back");
				}
			}
		});
	} else{
		req.flash("error","Pls Login!");
		res.redirect("back");
	}
}

middlewareObj.checkCommentOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, fcomment){
			if(err){
				res.redirect("back");
			} else{
				if(fcomment.author.id.equals(req.user._id)){
					next();
				}else{
					req.flash("error","Permission Denied!");
					res.redirect("back");
				}
			}
		});
	} else{
		req.flash("error","Pls Login!");
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","Please Login!");
	res.redirect("/login");
}

module.exports = middlewareObj;