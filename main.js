var settings = new Store('settings', {"userkey" : ""});

function addUrl(url) {
	var pushBoardURL = "https://api.pushover.net/1/messages.json";
	var xhr = new XMLHttpRequest();
	var userkey = encodeURIComponent(settings.get('userkey'));
	var url = encodeURIComponent(url);
	var params = "token=MPBWmMId7EEMuimHlHaJMfJiOzoebl&user=" + userkey + "&title=Pushed+from+Chrome&message=" + url;
	console.log(params);
      xhr.open("POST", pushBoardURL, true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function() {if (xhr.readyState == 4) {
      console.log('Great success!');
      	}
      }
      xhr.send(params);
};

chrome.contextMenus.create({
	title: 'Push this Link',
	contexts: ['link'],
	'onclick': function(info, tab) {
console.log('Pushed link for: ' + info.linkUrl);
addUrl(info.linkUrl);
	}}, function() {
console.log('Link context menu added');
	}); 

chrome.contextMenus.create({
	title: 'Push this Page',
	contexts: ['page'],
	'onclick': function(info, tab) {
console.log('Pushed page for: ' + info.pageUrl);
addUrl(info.pageUrl);
	}}, function() {
console.log('Page context menu added');
	}); 
	
chrome.contextMenus.create({
	title: 'Push this Image',
	contexts: ['image'],
	'onclick': function(info, tab) {
console.log('Pushed Image for: ' + info.srcUrl);
addUrl(info.srcUrl);
	}}, function() {
console.log('Image context menu added');
	}); 
chrome.contextMenus.create({
	title: 'Push selected Text',
	contexts: ['selection'],
	'onclick': function(info, tab) {
console.log('Pushed Text for: ' + info.selectionText);
addUrl(info.selectionText);
	}}, function() {
console.log('Selection text context menu added');
	}); 

if (settings.get('userkey')=='') {
	var optionsPage = chrome.extension.getURL('index.html');
	chrome.tabs.create({
url: optionsPage
	});	
};