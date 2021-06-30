var mongoose = require("mongoose");
var Campground = require ("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
		name : "Cloud's Rest",
		image : "https://image.shutterstock.com/image-photo/camping-caravans-cars-parked-on-260nw-1388851691.jpg",
		description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		name : "Desert Mesa",
		image : "",
		description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		name : "Canyon Floor",
		image : "",
		description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	}
]

function seedDB(){
	Campground.remove({},function(err){
		if(err){
			console.log(err);
		}
		console.log("Removed Campgrounds!");
		//Add few campgrounds
		data.forEach(function(seed){
			Campground.create(seed,function(err, campground){
				if(err){
					console.log(err);
				} else{
					console.log("Added a Campground!");
					//create a comment
					Comment.create(
						{
							text:"This place is great but wish this has internet",
							author: "Homer"
						},function(err, comment){
							if(err){
								console.log(err);
							} else{
								campground.comments.push(comment);
								campground.save();
								console.log("Created a new comment");
							}
						});
				}
			});
		});
	});
}

module.exports = seedDB;

