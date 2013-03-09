jQuery(".gen-list").on("click", function(){   
    chrome.windows.create({'width': 500, 'height': 400, 'type': 'panel', "focused": true, 'top': 300, 'left': 300}, function(window) {
        
    });
});
