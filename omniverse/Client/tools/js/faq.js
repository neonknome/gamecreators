var queryString = location.search.substr(1);
var allPairs = queryString.split("&");
var indvPairs = new Array ();
var rootId = "help";
var activeTab = "help";

function rollImg (targetId, imgPath) {
	if (document.images) {
		document.images[targetId].src = imgPath;
	}
}

function rollTab (targetId, imgPath) {
	if (targetId != activeTab) {
		rollImg (targetId, imgPath);
	}
}

for (i=0; i<allPairs.length; i++){
	indvPairs[i] = new Array();
	indvPairs[i] = allPairs[i].split("=");
}

function backOne() {
	history.back();
}

function rollAllTabs (targetId) {
	if (document.images) {
		if (targetId == "safety") {
			document.help.src = "/i.cdn.toon/games/gamecreator/tools/img/faq/help.off.gif";
			document.forparents.src = "/i.cdn.toon/games/gamecreator/tools/img/faq/forparents.off.gif";
			document.safety.src = "/i.cdn.toon/games/gamecreator/tools/img/faq/safety.on.gif";
		} else if (targetId == "forparents" ) {
			document.help.src = "/i.cdn.toon/games/gamecreator/tools/img/faq/help.off.gif";
			document.forparents.src = "/i.cdn.toon/games/gamecreator/tools/img/faq/forparents.on.gif";
			document.safety.src = "/i.cdn.toon/games/gamecreator/tools/img/faq/safety.off.gif";
		} else {
			document.help.src = "/i.cdn.toon/games/gamecreator/tools/img/faq/help.on.gif";
			document.forparents.src = "/i.cdn.toon/games/gamecreator/tools/img/faq/forparents.off.gif";
			document.safety.src = "/i.cdn.toon/games/gamecreator/tools/img/faq/safety.off.gif";
		}
	}
}


function setFramePaths (targetPathId) {
	if (targetPathId != undefined) {
		rootId = targetPathId;
		activeTab = targetPathId;
	} else {
		if (queryString.length > 0) {
			for (i=0; i<indvPairs.length; i++) {
				if (indvPairs[i][0] == "section") {
					rootId = indvPairs[i][1];
					activeTab=indvPairs[i][1];;
				}
			}
		}
	}
	rollAllTabs (rootId);
	queWin.location.replace("faq_q_" + rootId + ".html");
	ansWin.location.replace("faq_a_" + rootId + ".html");
}

