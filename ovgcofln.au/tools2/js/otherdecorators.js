function truncGameName (passedName) {
	if (passedName.length > 26) {
		passedName = passedName.substring(0,23) + "...";	
	}
	return passedName;
}

function truncDisplayName (passedDisplay) {
	if (passedDisplay.length > 20) {
		passedDisplay = passedDisplay.substring(0,17) + "...";	
	}
	return passedDisplay;
}

// parses rating information to round up or down to nearest half
// and returns the rounded number to the template
function roundRating (storedRating) {
	roundedBase = Math.round(storedRating);
	if ((storedRating > (roundedBase + .4)) && (storedRating < (roundedBase + .6))){
		storedRating = roundedBase + "5";
	} else {
		storedRating = roundedBase;
	}
	return storedRating;
}

function roundDifficulty (storedRating) {
	roundedBase = Math.round(storedRating);
	return roundedBase;
}

var totalPages;
var totalSets;
var lowerShiftLimit;
var upperShiftLimit;
var i;
var iLimiter;
var requestedPage;
function getTotalPages (totalGames) {
	if ((Math.round(totalGames/10)) < (totalGames/10)) {
		totalPages = (Math.round(totalGames/10)) + 1;
	} else {
		totalPages = (Math.round(totalGames/10));
	}
	return totalPages;
}
function getTotalSets (totalGames) {
	if ((Math.round(totalGames/200)) < (totalGames/200)) {
		totalSets = (Math.round(totalGames/200)) + 1;
	} else {
		totalSets = (Math.round(totalGames/200));
	}
	return totalSets;
}
function getLowerLimit (totalPages) {
	if (totalPages <= 20) {
		lowerShiftLimit = 20;
	} else {
		lowerShiftLimit = 10;
	}
}
function getUpperLimit (totalPages) {
	if (totalPages <= 20) {
		upperShiftLimit = totalPages;
	} else {
		upperShiftLimit = totalPages - 20;
	}
}
function getI (requestedPage) {
	if (requestedPage == undefined) {
		requestedPage = 1;
	}
	if ((requestedPage > lowerShiftLimit) && (requestedPage < upperShiftLimit)) {
		i = requestedPage - 9;
	} else if (requestedPage >= upperShiftLimit && requestedPage > lowerShiftLimit) {
		i = upperShiftLimit;
	} else {
		i = 1;
	}
	return i;
}
function getILimit () {
	if (totalPages <= 20) {
		iLimiter = totalPages;
	} else {
		iLimiter = i + 19;
	}
	return iLimiter;
}
function returnMaxEntries(numOfEntries) {
	if (numOfEntries < 200) {
		return numOfEntries;
	} else {
		return 200;
	}
}

function getPage (currentPage, pageVector, currentContent) {
//	alert("currentArgs = " + currentArgs);
	if (pageVector == "next") {
		if (currentPage < totalPages) {
			targetPage = currentPage + 1;
		} else {
			targetPage = totalPages;
		}
	} else if (pageVector == "previous") {
		if (currentPage > 0) {
			targetPage = currentPage - 1;
		} else {
			targetPage = 1;
		}
	} else {
		targetPage = currentPage;
	}
	requestedPage = targetPage;
	
	var newArgs = "";
	var tempArgs = currentArgs.split('&');
	for (i = 0; i < tempArgs.length; i++) {
		tempSplitArray = tempArgs[i].split('=');
		if (tempSplitArray[0] == "pageToDisplay") {
			tempArgs[i] = tempSplitArray[0] + "=" + targetPage;
		}
		if (i > 0) {
			newArgs += "&" + tempArgs[i];
		} else {
			newArgs = tempArgs[i];
		}
	}
	swapContent (currentContent,'repeat',newArgs);
}

function getFlatPage (currentPage, pageVector, currentContent) {
	if (pageVector == "next") {
		if (currentPage < totalPages) {
			targetPage = currentPage + 1;
		} else {
			targetPage = totalPages;
		}
	} else if (pageVector == "previous") {
		if (currentPage > 0) {
			targetPage = currentPage - 1;
		} else {
			targetPage = 1;
		}
	} else {
		targetPage = currentPage;
	}
	requestedPage = targetPage;
	dotPage = "." + targetPage;
	swapContent ('browse','repeat',dotPage,currentTypeId);
}

var base64ImgPath;
function setImgPath (imgVar) {
	//if (imgVar.indexOf('_') > -1) {
	//	base64ImgPath = "/static/images/" + imgVar;
	//} else {
		base64ImgPath = "/static/images2/" + imgVar;
	//}
	return base64ImgPath;
}

function getBrowseImgPath(img64, imgFull, CDNPath) {
	if (CDNPath==null)CDNPath='';
	if (imgFull != '' && imgFull != undefined) {
		imgPath = imgFull;
	}else{
		//if (img64.indexOf('_') > -1) {
		//	imgPath = "/static/images/" + img64;
		//} else {
			//imgPath = "/static/images2/" + img64;
			imgPath = CDNPath + "images2/" + img64;
		//}
	}
	return (imgPath);
}

function addCommas(passedVal) {
	var firstbit = "";
	var secondbit = "";
	var returnthis = "";
	var nextchunk = passedVal.toString();
	iteratorMax = Math.floor(nextchunk.length/3);
	if (nextchunk.length < 4) {
		returnthis = passedVal;
	} else {
		for (i=0; i <= iteratorMax; i++) {
			if ((nextchunk.length - 3) > 0) {
				firstbit = nextchunk.substring(0,nextchunk.length-3);
				secondbit = nextchunk.substring(nextchunk.length-3,nextchunk.length);
				if (returnthis == "") {
					returnthis = "," + secondbit;
				} else {
					returnthis = "," + secondbit + returnthis;
				}
				nextchunk = firstbit;
			} else if ((nextchunk.length - 3) == 0) {
				returnthis = firstbit + returnthis;
				break;
			} else {
				returnthis = firstbit + returnthis;
			}
		}
	}
	return(returnthis);
}