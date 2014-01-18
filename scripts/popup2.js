// Copied form chrome example http://developer.chrome.com/extensions/getstarted.html

var unbabelGenerator = {
  /**
   * Flickr URL that will give us lots and lots of whatever we're looking for.
   *
   * See http://www.flickr.com/services/api/flickr.photos.search.html for
   * details about the construction of this URL.
   *
   * @type {string}
   * @private
   */
  getUnbabelTask_: 'http://127.0.0.1:8000/api/v1/tasksavailable/?limit=10',

  /**
   * Sends an XHR GET request to grab photos of lots and lots of kittens. The
   * XHR's 'onload' event is hooks up to the 'showPhotos_' method.
   *
   * @public
   */
  requestTasks: function() {
    var req = new XMLHttpRequest();
    req.open("GET", this.getUnbabelTask_, true);
    req.onload = this.showTasks_.bind(this);
    req.send(null);
  },

  /**
   * Handle the 'onload' event of our kitten XHR request, generated in
   * 'requestKittens', by generating 'img' elements, and stuffing them into
   * the document for display.
   *
   * @param {ProgressEvent} e The XHR ProgressEvent.
   * @private
   */
  showTasks_: function (e) {
      obj_str = e.srcElement.response
      var tasks = jQuery.parseJSON( e.srcElement.response )["objects"];
      for (var i = 0; i < tasks.length; i++) {
	  console.log( tasks[i])
	  $( ".container" ).append( "<p>"+tasks[i].status+ " " + tasks[i].id+ "</p>" );
      }
  },

};

// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  unbabelGenerator.requestTasks();
});
