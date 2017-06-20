var unbabel_url = "https://unbabel.com/editor/paid_tasks/";
var notification_id = "show_paid_tasks";


/* For demonstration purposes, the notification creation
 * is attached to the browser-action's `onClicked` event.
 * Change according to your needs. */
setInterval(function(){
    $.ajax({
        type : "GET",
        url: "https://unbabel.com/api/v1/newtranslatortask/?task_type=paid&device=web",
        dataType: "json",
        success: function(response){
            if(response.meta.total_count > 0){
                chrome.notifications.clear(notification_id, function(){
                    chrome.notifications.create(notification_id, {
                        "type"          : "basic",
                        "iconUrl"       : "notification.png",
                        "title"         : "Hi there!",
                        "message"       : "You have paid tasks available!",
                        "contextMessage": "unbabel.com"

                    }, function(id) {
                        console.log("Create notification with ID: "+ notification_id);
                    });
                });
            }
        },
        error: function(response){
            chrome.notifications.clear(notification_id, function(){
                chrome.notifications.create(notification_id, {
                    "type"          : "basic",
                    "iconUrl"       : "notification.png",
                    "title"         : "Sorry for that...",
                    "message"       : "To get notified you need to be logged in at Unbabel.",
                    "contextMessage": "unbabel.com"

                }, function(id) {
                    console.log("Create notification with ID: "+ notification_id);
                });
            });
        }
    });

//}, 10000);
}, (10000)); // minutes_wanted * seconds_per_minute * milliseconds

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
