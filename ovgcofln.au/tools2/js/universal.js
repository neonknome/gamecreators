// receives requests from the swf
// the first param is the type of action
function swfReceiver (rAction,param01,param02,param03) {
	if (rAction == "swf_loaded") {
		if (passedCreator != false) {
			swapContent ('browse','getGamesByCreator','Creator.name=' + passedCreator + '&numberOfItemsPerPage=10&pageToDisplay=1&sortByColumn=1&sortBy=0&Game.statistic.timesShared=0&Game.statistic.timesPlayed=0');
			/*
			var s=s_gi('carnetnmcom');
			s.linkTrackVars="prop7,events";  
			s.linkTrackEvents="event2";        
			s.prop7='gc1_allbrowse_go';
			s.events="event2";
			s.tl('byCreator','o','gc1_allbrowse_go');
			*/
			location.href = "#htmlTop";
		} else {
			initFeatured ();
		}
	} else if (rAction == "browse") {
		swapContent ('browse','getNew','.1','');
	} else if (rAction == "full_profile") {
		swapContent ('profile')
	} else if (rAction == "tutorial") {
		window.open ('tutorial/index.html');
	} else if (rAction == "get_help") {
		window.open ('faq/index.html?section=help');
	} else if (rAction == "for_parents") {
		window.open ('faq/index.html?section=forparents');
	} else if (rAction == "starwargc") {
		swtcwgc = my_domain.replace(/gamecreator/i,"starwarsgamecreator");
		location.href = "http://"+swtcwgc;
	} else if (rAction == "batmangc") {
		batmangc = my_domain.replace(/gamecreator/i,"batmangamecreator");
		location.href = "http://"+batmangc;
	} else if (rAction == "login_success"){
		rollStyle ("loginBlock", "loginBlockOff");
		rollStyle ("logoutBlock", "logoutBlockOn");
		
		window.sso_center.logged_in = 1;
	
	}
}

function getRandom () {
	mill = new Date ();
	randomNum = Math.round(Math.random() * mill.getMilliseconds());
	return randomNum;
}

function openModTest (gameId) {
	window.open ('http://gamecreator.cartoonnetwork.com/index.html?id='+gameId);
}

// simple image swapper
function rollImg (imgName, imgSrc) {
	if (document.images) {
		document[imgName].src = imgSrc;
	}
}

function rollStyle (styleObj, styleName) {
	if (styleObj.className) {
		styleObj.className = styleName;
	} else {
		document.getElementById(styleObj).className = styleName;
	}
}

function rollBrowseClass (styleObj, styleName) {
	if (styleObj != activeFilterShell) {
		rollStyle (styleObj, styleName);
	}
}

// parses any query string passed into an array of name value pairs
var qString = location.search.substr(1);
if (qString.indexOf("#") > -1) {
	chopHash = qString.split("#");
	qString = chopHash[0]
}
var nvPairs = new Array();
nvPairs = qString.split('&');
var passedVal = "";
var passedCreator = false;
if (nvPairs.length > -1) {
	for (i = 0; i < nvPairs.length; i++) {
		tempArr = nvPairs[i].split('=');
		if (tempArr[0] == "id") {
			passedVal = tempArr[1];
		}
		if (tempArr[0] == "getCreator") {
			passedCreator = tempArr[1];
		}
	}
}

// determines if the browser is IE or other
function isIE () {
	var hasMS = navigator.appName.indexOf("Microsoft") != -1;
	return hasMS;
}

// determines the DOM name of the swf object
function thisMovie(movieName) {
	if (isIE ()) {
		return window[movieName];
	} else {
		return document[movieName];
	}
}

// sends the swf to the build state
function swfSendGame (gameID,gameCreator,gameFilter) {
	thisMovie("gamecreator").swfCallGame(gameID,gameCreator);
	/*
	var s=s_gi('carnetnmcom');
	s.linkTrackVars="prop7,events";  
	s.linkTrackEvents="event2";        
	s.prop7=gameFilter;
	s.events="event2";
	s.tl(gameID,'o',gameFilter);
	*/
	location.href = "#swfTop";
}

function swfLogout() {
	thisMovie("gamecreator").swfLogout();
	cartoonLogOut();
}

// sends game IDs into the swf
function swfCall() {
	thisMovie("gamecreator").fromJS();
	location.href = "#swfTop";
}

function getMoreGames (one, two, three, four, five) {
	swapContent(one,two,three,four);
	/*
	var s=s_gi('carnetnmcom');
	s.linkTrackVars="prop7,events";  
	s.linkTrackEvents="event2";        
	s.prop7=five;
	s.events="event2";
	s.tl(one,'o',five);
	*/

}

var currentContent;
var currentFilter;
var currentArgs;
var activeFilterShell;
var currentTypeId;
// stupid workaround, like most of the rest of this page
function initFeatured () {

	CSIManager.getInstance().useDelayedCSI=true;

	new Request("getMostPopularAllTime","catMostPopAll",".1","").send();
	new Request("getMostPopularThisWeek","catMostPopWeek",".1","").send();
	new Request("getMostDifficult","catMostDifficult",".1","").send();
//	new Request("getTopRating","catTopRating",".1","").send();

//	new Request("getNew","catNew",".1","").send();
//	new Request("getPlatinum","catMillionMark",".1","").send();
	new Request("getBestRatedByHero","catTopHumongo",".1",".2").withArgs(".2").send();
	new Request("getBestRatedByHero","catTopSwamp",".1",".1").withArgs(".1").send();
	new Request("getBestRatedByHero","catTopJetray",".1",".3").withArgs(".3").send();
	new Request("getBestRatedByHero","catTopSpider",".1",".4").withArgs(".4").send();
//	new Request("getBestRatedByGoal","catTopBattle",".1",".3").withArgs(".3").send();
//	new Request("getBestRatedByGoal","catTopCollect",".1",".2").withArgs(".2").send();
	new Request("getBestRatedByHero","catTopBrain",".1",".5").withArgs(".5").send();
	new Request("getBestRatedByHero","catTopGwen",".1",".20").withArgs(".20").send();
	new Request("getBestRatedByHero","catTopEcho",".1",".21").withArgs(".21").send();
	new Request("getBestRatedByHero","catTopGoop",".1",".22").withArgs(".22").send();
	new Request("getBestRatedByHero","catTopKevin",".1",".23").withArgs(".23").send();
	new Request("getBestRatedByHero","catTopWaterhazard",".1",".6").withArgs(".6").send();
	new Request("getBestRatedByHero","catTopTerraspin",".1",".7").withArgs(".7").send();
	new Request("getBestRatedByHero","catTopUltimateEchoEcho",".1",".9").withArgs(".9").send();
	new Request("getBestRatedByHero","catTopUltimateCannonbolt",".1",".8").withArgs(".8").send();
	new Request("getBestRatedByHero","catTopUltimateBigChill",".1",".10").withArgs(".10").send();
	new Request("getBestRatedByHero","catTopRook",".1",".15").withArgs(".15").send();
	new Request("getBestRatedByHero","catTopKickinHawk",".1",".16").withArgs(".16").send();
	new Request("getBestRatedByHero","catTopFeedback",".1",".11").withArgs(".11").send();
	new Request("getBestRatedByHero","catTopGravattack",".1",".12").withArgs(".12").send();
	new Request("getBestRatedByHero","catTopBallWeevil",".1",".13").withArgs(".13").send();
	new Request("getBestRatedByHero","catTopBloxx",".1",".14").withArgs(".14").send();
//	new Request("getFromTheVault","catTopClassic",".1","").send();
	new Request("getMostShared","catMostShare",".1","").send();
//	new Request("getFeaturedCreator","catPicks",".1","").send();

	currentFilter = undefined;
	currentArgs = undefined;
	currentContent = "featured";
	rollImg ('featuredGamesBtn', '/tools/img/universal/nav.btn.featured.on.jpg');
	document.getElementById('featuredMasterShell').className = "masterShellOn";
	if (passedVal != undefined) {
		/*
		var s=s_gi('carnetnmcom');
		s.linkTrackVars="prop7,events";  
		s.linkTrackEvents="event2";        
		s.prop7='gc1_from_shared_link';
		s.events="event2";
		s.tl(gameID,'o','gc1_from_shared_link');
		*/
		location.href = "#swfTop";
	}
}

//
// keeps track of which data set is currently displayed
// defaults to featured content
function swapContent (requestedContent, contentFilter, otherArgs, typeNum) {
	previousContent = currentContent + "MasterShell";
	nextContent = requestedContent + "MasterShell";
	if (contentFilter == "repeat") {
		contentFilter = currentFilter;
	}
	if (requestedContent != currentContent || ((requestedContent == currentContent) && ((contentFilter != currentFilter) || (contentFilter == currentFilter)))) {
		if (currentContent != undefined) {
			previousMainNav = currentContent + "GamesBtn";
			nextMainNav = requestedContent + "GamesBtn";
			rollImg (previousMainNav, '/tools/img/universal/nav.btn.' + currentContent + '.off.jpg');
			rollImg (nextMainNav, '/tools/img/universal/nav.btn.' + requestedContent + '.on.jpg');
			document.getElementById(previousContent).className="masterShellOff";
		} else {
			nextMainNav = requestedContent + "GamesBtn";
			rollImg (nextMainNav, '/tools/img/universal/nav.btn.' + requestedContent + '.on.jpg');
		}
		if (requestedContent == "featured") {
			new Request("getMostPopularAllTime","catMostPopAll",".1","").send();
			new Request("getMostPopularThisWeek","catMostPopWeek",".1","").send();
			new Request("getMostDifficult","catMostDifficult",".1","").send();
//			new Request("getTopRating","catTopRating",".1","").send();
//			new Request("getNew","catNew",".1","").send();
//			new Request("getPlatinum","catMillionMark",".1","").send();
			new Request("getBestRatedByHero","catTopHumongo",".1",".2").withArgs(".2").send();
			new Request("getBestRatedByHero","catTopSwamp",".1",".1").withArgs(".1").send();
			new Request("getBestRatedByHero","catTopJetray",".1",".3").withArgs(".3").send();
			new Request("getBestRatedByHero","catTopSpider",".1",".4").withArgs(".4").send();
//			new Request("getBestRatedByGoal","catTopBattle",".1",".3").withArgs(".3").send();
//			new Request("getBestRatedByGoal","catTopCollect",".1",".2").withArgs(".2").send();
			new Request("getBestRatedByHero","catTopBrain",".1",".5").withArgs(".5").send();
			new Request("getBestRatedByHero","catTopGwen",".1",".20").withArgs(".20").send();
			new Request("getBestRatedByHero","catTopEcho",".1",".21").withArgs(".21").send();
			new Request("getBestRatedByHero","catTopGoop",".1",".22").withArgs(".22").send();
			new Request("getBestRatedByHero","catTopKevin",".1",".23").withArgs(".23").send();
			new Request("getBestRatedByHero","catTopWaterhazard",".1",".6").withArgs(".6").send();
			new Request("getBestRatedByHero","catTopTerraspin",".1",".7").withArgs(".7").send();
			new Request("getBestRatedByHero","catTopUltimateEchoEcho",".1",".9").withArgs(".9").send();
			new Request("getBestRatedByHero","catTopUltimateCannonbolt",".1",".8").withArgs(".8").send();
			new Request("getBestRatedByHero","catTopUltimateBigChill",".1",".10").withArgs(".10").send();
			new Request("getBestRatedByHero","catTopRook",".1",".15").withArgs(".15").send();
			new Request("getBestRatedByHero","catTopKickinHawk",".1",".16").withArgs(".16").send();
			new Request("getBestRatedByHero","catTopFeedback",".1",".11").withArgs(".11").send();
			new Request("getBestRatedByHero","catTopGravattack",".1",".12").withArgs(".12").send();
			new Request("getBestRatedByHero","catTopBallWeevil",".1",".13").withArgs(".13").send();
			new Request("getBestRatedByHero","catTopBloxx",".1",".14").withArgs(".14").send();
//			new Request("getFromTheVault","catTopClassic",".1","").send();
			new Request("getMostShared","catMostShare",".1","").send();
//			new Request("getFeaturedCreator","catPicks",".1","").send();
			currentFilter = undefined;
			currentArgs = undefined;
		} else if (requestedContent == "profile") {			
			if (otherArgs == undefined) {
				otherArgs = "Game.status=1,0&numberOfItemsPerPage=10&pageToDisplay=1&sortByColumn=1&sortBy=0";
				new oldRequest("getMyGames","profileShell").withArgs(otherArgs+"&displayName=" + getRandom()).send();

			} else {
				otherArgs += "&displayName = " + getRandom();
				new oldRequest("getMyGames","profileShell").withArgs(otherArgs).send();

				}
			currentFilter = undefined;
			//currentArgs = undefined;
			currentArgs = otherArgs;
		} else {
			if (contentFilter == undefined) {
				new Request("getNew","browseGamesShell",".1","").send();
			} else if (contentFilter == "getGamesByCreator") {
//				alert(otherArgs);
				new newRequest(contentFilter,"browseGamesShell").withArgs(otherArgs).send();
			} else {
				new Request(contentFilter,"browseGamesShell",otherArgs,typeNum).send();
			}
			currentFilter = contentFilter;
			currentArgs = otherArgs;
			currentTypeId = typeNum;
			if (contentFilter == "getBestRatedByHero") {
				if (typeNum == ".1") {
					textFiller = "Swampfire";
				} else if (typeNum == ".2") {
					textFiller = "Humongousaur";
				} else if (typeNum == ".3") {
					textFiller = "Jetray";
				} else if (typeNum == ".4") {
					textFiller = "Spidermonkey";
				} else if (typeNum == ".5") {
					textFiller = "Brainstorm";
				} else if (typeNum == ".20") {
					textFiller = "Gwen";
				} else if (typeNum == ".21") {
					textFiller = "Goop";
				} else if (typeNum == ".22") {
					textFiller = "Kevin";
				} else if (typeNum == ".6") {
					textFiller = "Waterhazard";
				} else if (typeNum == ".7") {
					textFiller = "Terraspin";
				} else if (typeNum == ".9") {
					textFiller = "Echo Echo";
				} else if (typeNum == ".8") {
					textFiller = "Cannonbolt";
				} else if (typeNum == ".10") {
					textFiller = "Big Chill";
				} else if (typeNum == ".15") {
					textFiller = "Rook";
				} else if (typeNum == ".16") {
					textFiller = "Kickin Hawk";
				} else if (typeNum == ".11") {
					textFiller = "Feedback";
				} else if (typeNum == ".12") {
					textFiller = "Gravattack";
				} else if (typeNum == ".13") {
					textFiller = "Ball Weevil";
				} else if (typeNum == ".14") {
					textFiller = "Bloxx";					
				} else {
					textFiller = "Echo Echo";
				}
				document.getElementById('allGamesImageShell').className = "allGamesImageShellOff";
				document.getElementById('byGoalsImageShell').className = "menuGamesImageShellOff";
				document.getElementById('byGoalsImageShell').innerHTML = "Browse by Goal";
				document.getElementById('byHeroesImageShell').className = "menuGamesImageShellOn";
				document.getElementById('byHeroesImageShell').innerHTML = textFiller;
				document.nameSearch.freeText.className = "textFieldOff";
				document.nameSearch.freeText.valuee = "Search by Creator Name";
				activeFilterShell = "byHeroesImageShell";
			} else if (contentFilter == "getBestRatedByGoal") {
				if (typeNum == ".1") {
					textFiller = "Get to the Door";
				} else if (typeNum == ".2") {
					textFiller = "Collect All Orbs";
				} else if (typeNum == ".3") {
					textFiller = "Battle All Enemies";
				} else {
					textFiller = "Battle & Collect";
				}
				document.getElementById('allGamesImageShell').className = "allGamesImageShellOff";
				document.getElementById('byGoalsImageShell').className = "menuGamesImageShellOn";
				document.getElementById('byGoalsImageShell').innerHTML = textFiller;
				document.getElementById('byHeroesImageShell').className = "menuGamesImageShellOff";
				document.getElementById('byHeroesImageShell').innerHTML = "Browse by Hero";
				activeFilterShell = "byGoalsImageShell";
				document.nameSearch.freeText.className = "textFieldOff";
				document.nameSearch.freeText.value = "Search by Creator Name";
			} else if (contentFilter == "getGamesByCreator") {
				document.getElementById('allGamesImageShell').className = "allGamesImageShellOff";
				document.getElementById('byGoalsImageShell').className = "menuGamesImageShellOff";
				document.getElementById('byGoalsImageShell').innerHTML = "Browse by Goal";
				document.getElementById('byHeroesImageShell').className = "menuGamesImageShellOff";
				document.getElementById('byHeroesImageShell').innerHTML = "Browse by Hero";
				document.nameSearch.freeText.className = "textFieldOn";
				activeFilterShell = "byCreatorBtnShell";
			} else {
				document.getElementById('allGamesImageShell').className = "allGamesImageShellOn";
				document.getElementById('byGoalsImageShell').className = "menuGamesImageShellOff";
				document.getElementById('byGoalsImageShell').innerHTML = "Browse by Goal";
				document.getElementById('byHeroesImageShell').className = "menuGamesImageShellOff";
				document.getElementById('byHeroesImageShell').innerHTML = "Browse by Hero";
				document.nameSearch.freeText.className = "textFieldOff";
				document.nameSearch.freeText.value = "Search by Creator Name";
				activeFilterShell = "allGamesImageShell";
			}
		}
		currentContent = requestedContent;
	}
	document.getElementById(nextContent).className = "masterShellOn";
	location.href="#htmlTop";
}

function doFreeTextRequest () {
	creatorArg = document.nameSearch.freeText.value;
	if (creatorArg != "") {
		swapContent ('browse','getGamesByCreator','Creator.name=' + creatorArg + '&numberOfItemsPerPage=10&pageToDisplay=1&sortByColumn=1&sortBy=0&Game.statistic.timesShared=0&Game.statistic.timesPlayed=0');
		/*
		var s=s_gi('carnetnmcom');
		s.linkTrackVars="prop7,events";  
		s.linkTrackEvents="event2";        
		s.prop7='gc1_allbrowse_go';
		s.events="event2";
		s.tl('byCreator','o','gc1_allbrowse_go');
		*/
		location.href = "#htmlTop";
	}
}

function rollMainNav (imgName, imgSrc) {
	if (imgName.indexOf(currentContent) < 0) {
		rollImg (imgName, imgSrc);
	}
}

var currentBrowseFilterBtn;
function rollBrowseNav (imgName, imgSrc) {
//	if (imgName != currentBrowseFilterBtn) {
		rollImg (imgName, imgSrc);
//	}
}


var activeModalGame;
var activeModalShell;
function launchModal (gameId, elementId, newClassName,gameCreator) {
	if (activeModalShell != undefined) {
		document.getElementById(activeModalShell).className = "modalOff";
	}
	document.getElementById(elementId).className = "modalOn";
	stfWin.location.href = "/stf/index.php?id=" + gameId;
	//document.cnpSTFForm.directLinkText.value = "http://gamecreator.cartoonnetwork.com/index.php?id=" + gameId;
	document.cnpSTFForm.directLinkText.value = "http://"+my_domain+"/index.php?id=" + gameId;
	activeModalGame = gameId;
	activeModalShell = elementId;
	location.href = "#htmlTop";
}

function closeModal () {
	document.getElementById(activeModalShell).className = "modalOff";
	activeModalGame = undefined;
	activeModalShell = undefined;
	//swapContent('profile','repeat','Game.status=1,0&numberOfItemsPerPage=10&pageToDisplay=1&sortByColumn=1&sortBy=0');
}

function launchRegSwf (entryPoint) {
	if (entryPoint == "register") {
		thisMovie("gamecreator").swfCallReg();
	} else {
		thisMovie("gamecreator").swfCallLogin();
	}
	location.href = "#swfTop";
}

var tenDigitString = "";
function getRandom10 () {
	for (i=0; i<10; i++) {
		tenDigitString += (Math.floor(Math.random() * 10)).toString();
	}
	return tenDigitString;
}

var my10Digit = getRandom10();


var cookieVal = null;
function getCookieByName (cookieName) {
	var cookieDomain = self.location.host;
	if (/^[^.]+\.[^.]+\.[^.]+$/.test(cookieDomain)) {
		cookieDomain = cookieDomain.substring(cookieDomain.indexOf('.')+1);
	}
	var allCookies = unescape(document.cookie);
	var cookieArray = allCookies.split(";");
	for (i=0; i<cookieArray.length; i++) {
		if (cookieArray[i].indexOf(cookieName) > -1) {
			cookieCrumbs = cookieArray[i].split("=");
			cookieVal = cookieCrumbs[1];
		} else {
			cookieVal = null;
		}
	}
	return cookieVal;
}

function cartoonLogOut(){
	
	CSIManager.getInstance().useDelayedCSI=true;
	mgr = CSIManager.getInstance();
	
	//mgr.call('http://'+my_domain+'/membership/sso.php', 'cmd=logout&#38;no-cache=3jj4dkjaf89', "trashCan");
	//mgr.call('http://'+my_domain+'/membership/sso_logout.php', '', "trashCan");
	if (/^[^.]+\.[^.]+\.[^.]+$/.test(my_domain)) {
		dpath = my_domain.substring(my_domain.indexOf('.')+1);
	}else{
		dpath = my_domain.replace(/gamecreator/i,"");
	}

	document.cookie = "TEGid=null; 			expires=Thu, 01-Jan-70 00:00:01 GMT path=/; domain="+dpath;
	document.cookie = "authid=null; 		expires=Thu, 01-Jan-70 00:00:01 GMT path=/; domain="+dpath;
	document.cookie = "authz=null; 			expires=Thu, 01-Jan-70 00:00:01 GMT path=/; domain="+dpath;
	document.cookie = "authpass=null; 		expires=Thu, 01-Jan-70 00:00:01 GMT path=/; domain="+dpath;
	document.cookie = "displayname=null; 	expires=Thu, 01-Jan-70 00:00:01 GMT path=/; domain="+dpath;

	document.cookie = "gc_userid=null; 	expires=Thu, 01-Jan-70 00:00:01 GMT path=/; domain="+dpath;
	document.cookie = "gc_userid=null; 	expires=Thu, 01-Jan-70 00:00:01 GMT path=/; domain="+my_domain;
	window.sso_center.logged_in = 0;		
	
	//initFeatured();
	swapContent('featured');
	rollStyle ("loginBlock", "loginBlockOn");
	rollStyle ("logoutBlock", "logoutBlockOff");
	//document.location.href = document.location.href;
	//window.location.reload();
	LoginModule.logout(false);
}

function CB_cartoonLogOut() {

	/*
	if (/^[^.]+\.[^.]+\.[^.]+$/.test(my_domain)) {
		dpath = cookieDomain.substring(my_domain.indexOf('.')+1);
	}

	document.cookie = "TEGid=null; 			expires=Thu, 01-Jan-70 00:00:01 GMT path=/; domain="+dpath;
	document.cookie = "authid=null; 		expires=Thu, 01-Jan-70 00:00:01 GMT path=/; domain="+dpath;
	document.cookie = "authz=null; 			expires=Thu, 01-Jan-70 00:00:01 GMT path=/; domain="+dpath;
	document.cookie = "authpass=null; 		expires=Thu, 01-Jan-70 00:00:01 GMT path=/; domain="+dpath;
	document.cookie = "displayname=null; 	expires=Thu, 01-Jan-70 00:00:01 GMT path=/; domain="+dpath;

	document.cookie = "gc_userid=null; 	expires=Thu, 01-Jan-70 00:00:01 GMT path=/; domain="+dpath;
	document.cookie = "gc_userid=null; 	expires=Thu, 01-Jan-70 00:00:01 GMT path=/; domain="+my_domain;
	//initFeatured();
	swapContent('featured');
	rollStyle ("loginBlock", "loginBlockOn");
	rollStyle ("logoutBlock", "logoutBlockOff");
	document.location.href = document.location.href;
	*/
}

//sends user name to swf
var gamecreatorDisplayNameCallTimer;

function gamecreatorDisplayNameCall(p_name) {
	var o = new Object();
	o.displayname = p_name;

	if(thisMovie("gamecreator")){
		clearTimeout(gamecreatorDisplayNameCallTimer);
		thisMovie("gamecreator").onReceiveDisplayName(o);
	
	}else{
		gamecreatorDisplayNameCallTimer=setTimeout("gamecreatorDisplayNameCall('"+p_name+"')",1000);
	}
	swfReceiver('login_success');
}

function gamecreatorCancelCall() {
	thisMovie("gamecreator").onCanceledReceived();
}