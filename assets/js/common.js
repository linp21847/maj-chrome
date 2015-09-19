var SeoWorx = {
	_baseDomain: "",
	_anchorElements: [],
	_anchorTexts: {},
	_links: [],

	getDomain: function() {
		var hostname = window.location.hostname,
			self = SeoWorx,
			segs = hostname.split(".");

		return segs[segs.length - 2];
	},

	getAnchorElements: function() {
		if (this.getDomain() === "google") {
			return this.getAnchorElementsInGoogle();
		}

		return $("a[href^='http']");
	},

	getAnchorElementsInGoogle: function() {
		var elements = $("h3.r a"),
			self = this;

		self._anchorElements = elements;
		return elements;
	},

	pullMajesticData:function() {
		var elements = this.getAnchorElements(),
			items = [];

		for (var i = 0; i < elements.length; i++) {
			var item = elements[i].href;
			items.push(item);

			chrome.extension.sendMessage({
					msg: "majestic-pull",
					item: item
				}, function(response) {
					console.log(response);
				});
		}

		this._links = items;
	},

	updatePage: function(params) {
		var item = params.item,
			anchorText = params.anchorText,
			elIndex = this._links.indexOf(item),
			element = this._anchorElements[elIndex],
			majesticInfoPanel = $('<div/>', {class:""});

		if (anchorText.Data.length > 0) {
			majesticInfoPanel.append($("<span/>").text("EstimatedLinkCitationFlow: " + anchorText.Data[0].EstimatedLinkCitationFlow),
										$("<br/>"),
										$("<span/>").text("EstimatedLinkTrustFlow: " + anchorText.Data[0].EstimatedLinkTrustFlow));
			majesticInfoPanel.insertBefore($(element).parents("div.rc").children("div.s"))
		}
		console.log(element);
	}
}