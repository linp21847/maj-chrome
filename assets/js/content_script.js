(function(window, jQuery) {
	
	
	SeoWorx.pullMajesticData();

	chrome.runtime.onMessage.addListener(function(params, sender, sendResponse) {
		console.log(params);
		SeoWorx._anchorTexts[params.item] = params.anchorText;
		SeoWorx.updatePage(params);
	});

	
})(window, $)