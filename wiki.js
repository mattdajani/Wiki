var searchButton = document.getElementById('searchButton');
var searchText = document.getElementById('searchBox');
var randomButtom = document.getElementById('randomButton');
var clearButton = document.getElementById('clearBox');
searchButton.addEventListener('click', searchWiki, false);
searchText.addEventListener('keypress',keySearch, false);
randomButton.addEventListener('click', randomPage, false);
clearButton.addEventListener('click', clearSearchBox, false);
clearButton.addEventListener('click', focusSearchBox, false);

window.onload = clearSearchBox(); // clear search box on page load

function keySearch(event){
	var key = event.which || event.keyCode;
	if(key === 13) { // if key press is enter
		searchButton.click();
	}
};

function clearSearchBox(){
	searchText.value = '';
};

function focusSearchBox(){
	searchText.focus();
};

function searchWiki(){
	var searchTopic = searchText.value;
	var searchUrl = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&generator=search&exsentences=1&exlimit=10&exintro=1&explaintext=1&gsrsearch=' + searchTopic;
	queryWikiApi(searchUrl);
};

function randomPage(){
	var randomUrl = 'https://en.wikipedia.org/wiki/Special:Random';
	window.open(randomUrl);
};

function queryWikiApi(searchUrl){
$.ajax({
	url: searchUrl,
	dataType: 'jsonp',
	type: 'GET',
	headers: { 'Api-User-Agent': 'MattsTestProject' },
	success: displayResults
});
};

function displayResults(data){
	var wikiObj = data.query.pages;
	$('#displayBox').html('');
	for(var prop in wikiObj){
	$('#displayBox').append('<div class="results"><a href="https://en.wikipedia.org/?curid=' + wikiObj[prop].pageid + '" target="_blank"><h4 class="title">' + wikiObj[prop].title + '</h4><p class="extract">' + wikiObj[prop].extract  + '</p></a></div>');
	}
	$('.results').fadeIn();
};