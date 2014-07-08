var unbabel_url = "https://www.unbabel.com/streamv2/simple/";
var notification_id = "show_paid_tasks";


/* For demonstration purposes, the notification creation
 * is attached to the browser-action's `onClicked` event.
 * Change according to your needs. */
setInterval(function(){
    $.ajax({
        type : "GET",
        url: "https://www.unbabel.com/api/v1/tasksavailable/?limit=1&paid=True&new_arch=True",
        dataType: "json",
        success: function(response){
            if(response.meta.total_count > 0){
                chrome.notifications.clear(notification_id, function(){
                    chrome.notifications.create(notification_id, {
                        "type"          : "basic",
                        "iconUrl"       : "notification.png",
                        "title"         : "Hi there!",
                        "message"       : "There are new paid tasks available!",
                        "contextMessage": "www.unbabel.com"

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
                    "message"       : "To receive notifications you must login at unbabel.",
                    "contextMessage": "www.unbabel.com"

                }, function(id) {
                    console.log("Create notification with ID: "+ notification_id);
                });
            });
        }
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
