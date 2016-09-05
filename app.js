// Dependencies

var express 	=	require("express"),
	app 		=	express(),
	path 		=	require("path"),
	request 	=	require("request"),
	jsdom 		=	require("jsdom").jsdom,
	document 	=	jsdom("<html></html>", {}),
	window 		=	document.defaultView,
	$ 			=	require("jquery")(window),
	searchFor 	=	require("./assets/scripts/search");

// Router

app.use(express.static(__dirname));

app.get("/", function(req, res){
	req.on('data', function(){
		alert("Searching...");
		search($("#filter").val(), $("#query").val());
		$("#search-results").html("<p>" + reply + "</p>");
	});
	res.write("Form Loading...");
	res.sendFile(path.join(__dirname + "/index.html"));
});

app.listen(8888);

// Test API call
/*
searchFor.search("artist", "beatles");
searchFor.search("track", "hey jude");
searchFor.search("album", "abbey road");
*/