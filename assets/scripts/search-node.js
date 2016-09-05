exports.search = function(filter, query){
	var api = "https://api.spotify.com/v1/search?type=" + filter + "&q=" + query;
	request(api, function(error, response, body){
		if(!error && response.statusCode == 200){
			var searchResults = JSON.parse(body),
				list,
				reply = [];
			if(filter === "artist"){
				list = searchResults.artists;
			} else if(filter === "track"){
				list = searchResults.tracks;
			} else if(filter === "album"){
				list = searchResults.albums;
			}
			for(var i = 0; i < list.items.length; i++){
				reply += (i + 1) + " | " + list.items[i].name + "\n";
			}
			console.log(reply);
			return reply;
		}
	});
};