SC.initialize({
	client_id: 'ceeba072aabff5f278ef8c0bb25c18c9',
	redirect_uri: 'http://www.csc.kth.se/~abdlwafa/soundcloud/callback.html'
});

SC.connect();
console.log("Connect ran");

// One track
var track_url = 'https://soundcloud.com/hexagon/madison-mars-milky-way-radio-edit';
SC.oEmbed(track_url, { auto_play: true }).then(function(response) {
	console.log('Object Response', response);
			// document.write(JSON.stringify(response));
});