// Dependencies

var express 	=	require("express"),
	app 		=	express(),
	path 		=	require("path"),
	bodyParser 	= 	require('body-parser'),
	request 	=	require("request"),
	jsdom 		=	require("jsdom").jsdom,
	document 	=	jsdom("<html></html>", {}),
	window 		=	document.defaultView,
	$ 			=	require("jquery")(window);

// Router

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
	res.sendFile(path.join(__dirname + "/index.html"));
});

app.post("/search", function(req, res){
	var params = req.body,
		filter = params.type,
		query = params.q,
		reply = [],
		list = "",
		api = "https://api.spotify.com/v1/search?type=" + filter + "&q=" + query,
		template = {
			open: `<div class="full">`,
			close: `</div>`
		};

	request(api, function(error, response, body){
		var searchResults = JSON.parse(body);
		if(!error && response.statusCode == 200){
			if(filter === "artist"){
				list = searchResults.artists;
			} else if(filter === "track"){
				list = searchResults.tracks;
			} else if(filter === "album"){
				list = searchResults.albums;
			}
			reply += template.open;
			for(var i = 0; i < list.items.length; i++){
				var item = list.items[i];
				if(item.images[0]){
					reply +=	`<a class="card" href="${item.external_urls.spotify}" target="_blank" style="background-image: url(${item.images[0].url})">
									${item.name}
								</a>`;
				} else {
					reply +=	`<a class="card" href="${item.external_urls.spotify}" target="_blank">
									${item.name}
								</a>`;
				}
			}
			reply += template.close;
		}
		res.end(reply);
	});
});

app.listen(8888);

// Spotify API search
/*
function search(filter, query){
	var api = "https://api.spotify.com/v1/search?type=" + filter + "&q=" + query;
	request(api, function(error, response, body){
		var searchResults = JSON.parse(body),
			reply = [],
			list;
		if(!error && response.statusCode == 200){
			if(filter === "artist"){
				list = searchResults.artists;
			} else if(filter === "track"){
				list = searchResults.tracks;
			} else if(filter === "album"){
				list = searchResults.albums;
			}
			reply += "<ul>";
			for(var i = 0; i < list.items.length; i++){
				reply += `<li>${i + 1} | ${list.items[i].name}</li>`;
			}
			reply += "</ul>";
			console.log(reply);
		}
	}).end();
};
*/