// Search

$("#search-form").on("submit", function(event){
	event.preventDefault();
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8888/search',
        data: {type: $("#filter").val(), q: $("#query").val()}
    })
    .done(function(data){
		template = `${data}`;
		console.log("Data: " + data);
		$("#search-results").html(template);
	});
});