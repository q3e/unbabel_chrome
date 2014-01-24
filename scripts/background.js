var unbabel_url = "https://www.unbabel.co/stream/";
var notification_id = "";

// setInterval(function(){
// 	chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
// 	chrome.browserAction.setBadgeText({text: 'new'});
// },3000);


/* For demonstration purposes, the notification creation 
 * is attached to the browser-action's `onClicked` event.
 * Change according to your needs. */
setInterval(function(){
    chrome.notifications.create(notification_id, {
        type:    "basic",
        iconUrl: "notification.png",
        title:   "Hi there!",
        message: "Have you checked for available tasks lately?",
        contextMessage: "www.unbabel.com"
    }, function(id) {
    	console.log("Create notification with ID: "+ notification_id);
    });

//}, 10000);
}, 1200000);

/* Add this to also handle the user's clicking 
 * the small 'x' on the top right corner */
//chrome.notifications.onClosed.addListener(function() {});

chrome.browserAction.onClicked.addListener(function(tab){ 
	openTab();
});

chrome.notifications.onClicked.addListener(function(notifId) {
	openTab();
});

function openTab(){
	var win = window.open(unbabel_url, '_blank');
	win.focus();
};