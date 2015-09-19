(function(window, jQuery){
	chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {

		switch(request.msg) {
			case "majestic-pull":
				console.log("App is sending request to majestic api server for " + request.item);
				Majestic.GetAnchorText(request.item, 5, null, function(response) {
					if (response && response.DataTables)
						chrome.tabs.sendMessage(sender.tab.id, {item: request.item, anchorText: response.DataTables.AnchorText});
				});
				// IconosquareBot.start(request.hashtag, request.option, sendResponse);
				break;

			default:
				console.log("Unknown request was found.");
				break;
		}
			
	});
})(window, $);