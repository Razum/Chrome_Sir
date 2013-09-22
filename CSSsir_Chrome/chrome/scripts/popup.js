(function(){
    var generators = {
        "txtShadow": {url: "../chrome/dialogs/txtShadow.htm", 'width': 900, 'height': 550, 'type': 'popup', "focused": true, 'top': 300, 'left': 300},
        "rgba": {url: "../chrome/dialogs/rgba.htm", 'width': 800, 'height': 550, 'type': 'popup', "focused": true, 'top': 300, 'left': 300},
        "txtRotation": {url: "../chrome/dialogs/txtRotation.htm", 'width': 800, 'height': 550, 'type': 'popup', "focused": true, 'top': 300, 'left': 300},
        "transform": {url: "../chrome/dialogs/transform.htm", 'width': 800, 'height': 550, 'type': 'popup', "focused": true, 'top': 300, 'left': 300},
        "boxShadow": {url: "../chrome/dialogs/boxShadow.htm", 'width': 900, 'height': 550, 'type': 'popup', "focused": true, 'top': 300, 'left': 300},
        "borderRadius": {url: "../chrome/dialogs/borderRadius.htm", 'width': 800, 'height': 550, 'type': 'popup', "focused": true, 'top': 300, 'left': 300},
        "outline": {url: "../chrome/dialogs/outline.htm", 'width': 800, 'height': 550, 'type': 'popup', "focused": true, 'top': 300, 'left': 300},
        "txtColumn": {url: "../chrome/dialogs/txtColumn.htm", 'width': 900, 'height': 550, 'type': 'popup', "focused": true, 'top': 300, 'left': 300},
        "textfont": {url: "../chrome/dialogs/textfont.htm", 'width': 500, 'height': 500, 'type': 'popup', "focused": true, 'top': 300, 'left': 300},
        "lineargradient": {url: "../chrome/dialogs/lineargradient.htm", 'width': 900, 'height': 590, 'type': 'popup', "focused": true, 'top': 300, 'left': 300},
        "radialgradient": {url: "../chrome/dialogs/radialgradient.htm", 'width': 900, 'height': 590, 'type': 'popup', "focused": true, 'top': 300, 'left': 300},
        "bonus": {url: "../chrome/dialogs/bonus.htm", 'width': 500, 'height': 500, 'type': 'popup', "focused": true, 'top': 300, 'left': 300}
    }
    
    


jQuery(".gen-list a").on("click", function(){   
    var $this = jQuery(this);
    var $this_id = $this.attr("id");
    var genName = $this_id.replace(/sir-|\s/ig, "")

    chrome.windows.create(generators[genName], function(window) {
    });
});
})();