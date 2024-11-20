/* ********** */
// editorial vars

// featuredCateogories array deterimes which categories appear in featured section
// and detemines their display order
// to change a featured category, make a list of the parameters needed to request those games
// see gameCreatorListQuery for all possible params
// adding or removing array members adds or removes featured displays
var featuredCategory = new Array();
featuredCategory[0]  = { listtype : "most-played", limit : "alltime" , name : "Most Popular of All Time", page: 1 };
featuredCategory[1]  = { listtype : "most-played" , limit : "weekly" , name : "Most Popular This Week", page: 1 };
featuredCategory[2]  = { listtype : "latest" , name: "New Games", page: 1 };
featuredCategory[3]  = { listtype : "most-played", limit : "millionmark" , name : "Million Mark", page: 1 };
featuredCategory[4]  = { listtype : "hero" , hero : '15' , name : "Top Rook Games", page: 1 };
featuredCategory[5]  = { listtype : "hero" , hero : '16' , name : "Top Kickin' Hawk Games", page: 1 };
featuredCategory[6]  = { listtype : "hero" , hero : '14' , name : "Top Bloxx Games", page: 1 };
featuredCategory[7]  = { listtype : "hero" , hero : '11' , name : "Top Feedback Games", page: 1 };
featuredCategory[8]  = { listtype : "hero" , hero : '13' , name : "Top Ball Weevil Games", page: 1 };
featuredCategory[9]  = { listtype : "hero" , hero : '12' , name : "Top Gravattack Games", page: 1 };
featuredCategory[10] = { listtype : "hero" , hero : '2' , name : "Top Humongousaur Games", page: 1 };
featuredCategory[11] = { listtype : "hero" , hero : '6' , name : "Top Waterhazard Games", page: 1 };

// CN property associated with this game creator; check with AMPT for value
var gameProperty = "ben10gc";


/* ********** */
/* static vars and gathering data to inform page load */
var passedVal;				// will hold the ID of any game passed on the query string
var passedCreator;			// will hold the ID of any user passed on the query string or from the SWF

// determine environment
var serverEnv;				// substituted into data requests and used for reporting
if (location.hostname.indexOf('staging') > -1) {
	serverEnv = "staging";
} else {
	serverEnv = "www";
}

// parse any query string passed into an array of name value pairs
var qString = location.search.substr(1);
// remove anchor link hash mark, if any
if (qString.indexOf("#") > -1) {
	chopHash = qString.split("#");
	qString = chopHash[0]
}
// break up and analyze name-value pairs
var nvPairs = new Array();
nvPairs = qString.split('&');
if (nvPairs.length > -1) {
	for (i = 0; i < nvPairs.length; i++) {
		tempArr = nvPairs[i].split('=');
		// if there is an ID
		if (tempArr[0].toLowerCase() == "id" && tempArr[1] != "") {
			passedVal = tempArr[1];
		}
		if (tempArr[0].toLowerCase() == "getcreator" && tempArr[1] != "") {
			passedCreator = toTitleCase(tempArr[1]);
		}
	}
}


/* ********** */
// environmental vars specific to this game creator
// AMPT service type; basically the bin directory that houses the service
// papi, dragonsvc, etc, or whatever
var serviceType = "";  // AMPT service type
if (serverEnv.toLowerCase() == "staging") {
	serviceType = "dragonsvc";
} else {
	serviceType = "papi-ben10gc";
}
var servicePath = "";  // AMPT service path
if (serverEnv.toLowerCase() == "staging") {
	servicePath = "v2/game-creator-list";
} else {
	servicePath = "v2/game-creator-list";
}
var heroServicePath = "" // AMPT service path; used for generating menues
if (serverEnv.toLowerCase() == "staging") {
	heroServicePath = "v2/game-creator-goal-hero"
} else {
	heroServicePath = "v2/game-creator-goal-hero"
}

/* ********** */
// leftovers from the original site

// generic receiver for requests made from the SWF
function swfReceiver (rAction,param01,param02,param03) {
	if (rAction == "swf_loaded") {
		if (passedCreator != undefined) {
			location.href = "#htmlTop";
			b10gc.init('browse');
		} else {
			b10gc.init('featured');
		}
	} else if (rAction == "browse") {
		b10gc.getContent('browse',{listtype:'latest', page:'1'});
	} else if (rAction == "full_profile") {
		if (LoginModule.isLoggedIn) {
			b10gc.getContent('profile',{listtype:'player', player:readCookie('dname'), page:'1'});
		} else {
			b10gc.profileError('login');
		}
	} else if (rAction == "tutorial") {
		window.open ('tutorial/index.html');
	} else if (rAction == "get_help") {
		window.open ('faq/index.html');
	} else if (rAction == "for_parents") {
		window.open ('faq/index.html#parents');
	}
}

// determines if the browser is IE or other
function isGCIE () {
	var hasMS = navigator.appName.indexOf("Microsoft") != -1;
	return hasMS;
}

// determines the DOM name of the swf object
function thisMovie(movieName) {
	if (isGCIE ()) {
		return window[movieName];
	} else {
		return document[movieName];
	}
}

// sends the swf to the build state
function swfSendGame (gameID,gameCreator,gameFilter) {
	thisMovie("gamecreator").swfCallGame(gameID,gameCreator);
	location.href = "#swfTop";
}

// sends game IDs into the swf
function swfCall() {
	thisMovie("gamecreator").fromJS();
	location.href = "#swfTop";
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
}

function gamecreatorCancelCall() {
	thisMovie("gamecreator").onCanceledReceived();
}

function getMoreGames (one, two, three, four, five) {
	b10gc.getContent('browse');
}

// form handler for free text search
function doFreeTextRequest () {
	var creatorArg = toTitleCase(jQuery('#gcFreeText').attr('value'));
				if (typeof console == "object") {
					console.log("creator is");
					console.log(creatorArg);
				}
	if (creatorArg != "" && creatorArg != "Search by Creator Name") {
		b10gc.getContent('browse',{listtype:'player', player:creatorArg, page:'1'});
	}
}

// transform user names to title case
function toTitleCase (player) {
	return player.replace(/(?:^|\s)\w/g, function(match) {
		return match.toUpperCase();
	});
}




var goingGlobal;
/* ********** */
// render HTML from the JSON data
function gcHTML() {
	// save state
	this.currentContent = "featured";
	this.featuredContent = false;
	// store data for "by user" requests while additional data is requested
	this.userParams;
	this.userGameData;
	this.userGamesTotal;
	this.userTarget;

	var self = this;

	// start it all
	this.init = function (targetContent) {
		if (targetContent == "browse") {
			self.getContent("browse",{listtype:'player',player:passedCreator,page:'1'})
		} else {
			self.getContent("featured");
		}
		self.browseMenuDataQuery('hero');
		self.browseMenuDataQuery('goal');
	}


	// requesting and displaying data

	// request content for an HTML section
	// deterimine what to display and request necessary data
	// also, fork to login prompt for requests that need it
	this.getContent = function (targetContent, params) {

		if (targetContent.toLowerCase() == "featured") {
			if (self.featuredContent == false) {
				self.getFeaturedData();
			} else {
				self.revealContent(targetContent);
			}
		} else if (targetContent.toLowerCase() == "browse") {
			if (params == undefined) {
				self.getPagedData('browse',{listtype:'latest', page:'1'});
			} else {
				self.getPagedData('browse',params);
			}
		} else if (targetContent.toLowerCase() == "profile") {
			if (LoginModule.isLoggedIn) {
				if (params == undefined) {
					self.getPagedData('profile',{listtype:'player',player:readCookie('dname'),page:'1'});
				} else {
					self.getPagedData('profile',params);
				}
			} else {
				// prompt for log-in
				self.profileError('login');
			}
		} else {
			if (typeof console == "object") {
				console.log("ERROR: unknown content type");
				console.log(targetContent);
			}
		}

	}

	// retrieve all the featured category data
	this.getFeaturedData = function () {
		// if the data hasn't already been requested
		if (self.featuredContent == false) {
			// loop through the editoral array and make the proper request based on list type
			for (i = 0; i < featuredCategory.length; i++) {
				if (featuredCategory[i]["listtype"] == "hero") {
					self.gameCreatorListQuery({subdomain:serverEnv,gcproduct:gameProperty,service:servicePath,listtype:featuredCategory[i]['listtype'],hero:featuredCategory[i]['hero'],path:serviceType}, "featured", i);
				} else if (featuredCategory[i]["listtype"] == "goal") {
					self.gameCreatorListQuery({subdomain:serverEnv,gcproduct:gameProperty,service:servicePath,listtype:featuredCategory[i]['listtype'],hero:featuredCategory[i]['goal'],path:serviceType}, "featured", i);
				} else if (featuredCategory[i]["listtype"] == "player") {
					self.gameCreatorListQuery({subdomain:serverEnv,gcproduct:gameProperty,service:servicePath,listtype:featuredCategory[i]['listtype'],player:featuredCategory[i]['player'],path:serviceType}, "featured", i);
				} else if (featuredCategory[i]["listtype"] == "most-played") {
					self.gameCreatorListQuery({subdomain:serverEnv,gcproduct:gameProperty,service:servicePath,listtype:featuredCategory[i]['listtype'],limit:featuredCategory[i]['limit'],path:serviceType}, "featured", i);
				} else if (featuredCategory[i]["listtype"] == "highest-rated" || featuredCategory[i]["listtype"] == "latest") {
					self.gameCreatorListQuery({subdomain:serverEnv,gcproduct:gameProperty,service:servicePath,listtype:featuredCategory[i]['listtype'],path:serviceType}, "featured", i);
				} else {
					if (typeof console == "object") {
						console.log("ERROR: unable to request featured data for list type");
						console.log(featuredCategory[i]["listtype"]);
					}
				}
			}
			// set to true so the data isn't requested again
			self.featuredContent = true;
		}
		// reveal the featured panel
		self.revealContent('featured');
	}

	// add a featured category to the featured section
	this.generateFeaturedHTML = function (data, params, targetContent, member) {
		var writeString = "";
		writeString = "<div class=\"sfhdr\"><h3>" + featuredCategory[member]['name'] + "</h3></div>";
		var i = 0;
		jQuery.each(data, function(key, val) {
			if (i < 5) {
				writeString += "<div class=\"sfgame\" onclick=\"javascript:swfSendGame('" + val.id + "','" + val.playerName + "');\">";
				writeString += "<div class=\"sfgamebk\">";
				writeString += "<span class=\"gname\">" + val.gameName + "</span><br />";
				writeString += "<span class=\"cname\">by: " + val.playerName + "</span><br />";
				writeString += "<div class=\"img\"><img src=\"/i.cdn.turner.com/toon/games/gamecreator/tools/img/ratings/r." + self.roundRating(val.rating, val.ratingCount) + ".gif\" width=\"74\" height=\"14\" alt=\"rating\" border=\"0\"></div>";
				writeString += "</div>";
				writeString += "</div>";
			}
			i++;
		});
		writeString += "<div class=\"sfftr\"><a href=\"javascript:b10gc.getContent('browse'," + self.returnParams(featuredCategory[member]) + ")\"><span class=\"txt\">MORE </span><span class=\"char\">&raquo;</span></a></div>";
		writeString += "</div>";
		jQuery("#f"+member).html(writeString);
	}

	// retrieve all the category data for paged display - browse and profile
	this.getPagedData = function (targetContent, params) {
		if (params.listtype == "hero") {
			self.gameCreatorListQuery({subdomain:serverEnv,gcproduct:gameProperty,service:servicePath,listtype:params.listtype,hero:params.hero,path:serviceType,page:params.page},targetContent);
		} else if (params.listtype == "goal") {
			self.gameCreatorListQuery({subdomain:serverEnv,gcproduct:gameProperty,service:servicePath,listtype:params.listtype,goal:params.goal,path:serviceType,page:params.page},targetContent);
		} else if (params.listtype == "player") {
			self.gameCreatorListQuery({subdomain:serverEnv,gcproduct:gameProperty,service:servicePath,listtype:params.listtype,player:params.player,path:serviceType,page:params.page},targetContent);
		} else if (params.listtype == "most-played") {
			self.gameCreatorListQuery({subdomain:serverEnv,gcproduct:gameProperty,service:servicePath,listtype:params.listtype,limit:params.limit,path:serviceType,page:params.page},targetContent);
		} else if (params.listtype == "highest-rated" || params.listtype == "latest") {
			self.gameCreatorListQuery({subdomain:serverEnv,gcproduct:gameProperty,service:servicePath,listtype:params.listtype,path:serviceType,page:params.page},targetContent);
		} else {
			if (typeof console == "object") {
				console.log("ERROR: unable to request data for list type");
				console.log(targetContent);
			}
		}
		self.revealContent(targetContent);
	}

	// insert the html for a single page of potentially multi-page content
	this.generatePagedHTML = function (data, params, targetContent) {
		// write it out as a string so it only hits the DOM once
		var writeString = "";

		// if it's a profile request, insert the user profile
		if (targetContent == "profile") {
			if (LoginModule.isLoggedIn) {
				self.insertProfile();
			} else {
				self.profileError('login');
			}
		}

		if (self.userGamesTotal < 1 && targetContent == "profile") {
			self.userGamesTotal = undefined;
			self.profileError('nogames');
		} else if (self.userGamesTotal < 1 && targetContent == "browse") {
			self.userGamesTotal = undefined;
			self.browseError();
		} else {
			// insert the pagination links
			var pages = self.generatePaginationLinks(data, params, targetContent);
			writeString += pages;

			// loop through up to 10 games and insert them
			jQuery.each(data, function(key, val) {
				if (val.timesPlayed > 999999) {
					writeString += "<div class=\"gamem\">";
				} else {
					writeString += "<div class=\"game\">";
				}
				writeString += "<div class=\"inner\">";
				writeString += "<div class=\"ie_fix\">";
				writeString += "<div class=\"img\">";
				writeString += "<a href=\"javascript:swfSendGame('" + val.id + "','" + val.playerName + "');\"><img src=\"" + val.thumbnailUrl + "\" width=\"105\" height=\"70\" alt=\"Click to play\" border=\"0\" /></a>";
				writeString += "</div>";
				writeString += "<div class=\"details\">";
				writeString += "<a class=\"title\" href=\"javascript:swfSendGame('" + val.id + "','" + val.playerName + "');\">" + val.gameName + "</a><br />";
				if (targetContent == "browse") {
					writeString += "<span>by: </span><a href=\"javascript:b10gc.getPagedData('browse',{listtype:'player',player:'" + val.playerName + "',page:1})\" class=\"name\" rel=\"nofollow\">" + val.playerName + "</a><br/><br/>";
				}
				writeString += "<span>Times Played: </span><span class=\"nmbr\">" + self.addCommas(val.timesPlayed) + "</span><br />";
				if (targetContent == "profile") {
					writeString += "<br /><span class=\"nmbr\">" + self.percentWon(val.timesPlayed,val.timesCompleted) + "%</span><span> of players have beaten this game</span>"
				}
				writeString += "</div>";
				writeString += "<div class=\"rating\">";
				writeString += "<span>Rating:</span><br/>";
				writeString += "<img src=\"/i.cdn.turner.com/toon/games/gamecreator/tools/img/ratings/r." + self.roundRating(val.rating, val.ratingCount) + ".gif\" width=\"74\" height=\"14\" alt=\"\" border=\"0\" />";
				writeString += "</div>";
				writeString += "<div class=\"difficulty\">";
				writeString += "<span>Difficulty:</span><br/>";
				writeString += "<img src=\"/i.cdn.turner.com/toon/games/gamecreator/tools/img/ratings/d." + self.roundDifficulty(val.difficulty, val.difficultyCount) + ".gif\" width=\"73\" height=\"10\" alt=\"\" border=\"0\" />";
				writeString += "</div>";
				writeString += "<div class=\"date\">";
				writeString += "<span>Date Created:</span><br/>";
				writeString += "<span>" + self.readableDate(val.createdDate) + "</span>";
				writeString += "</div>";
				writeString += "</div>";
				writeString += "</div>";
				writeString += "</div>";
			});
			writeString += pages;
			jQuery("#" + targetContent + "games").html(writeString);
		}
	}

	this.generatePaginationLinks = function(data, params, targetContent) {
		var pagiString = "";
		var currentPageNo = params.page;

		if (params.listtype == "player" && self.userGamesTotal > 0) {
			pageLoopLimit = Math.floor(parseInt(self.userGamesTotal)/10);
			modulus = parseInt(self.userGamesTotal)%10;
			if (modulus > 0) {
				pageLoopLimit = pageLoopLimit + 1;
			}
		} else if (params.listtype == "player" && self.userGamesTotal == 0) {
			pageLoopLimit = 1;
		} else {
			pageLoopLimit = 20;
		}

		pagiString += "<div class=\"paging\">";
		if (currentPageNo == 1 && params.listtype == "player" && self.userGamesTotal < 10) {
			pagiString += "<span id=\"results\" class=\"txt\">Results: (1 - " + self.userGamesTotal + " of " + self.userGamesTotal + ")</span>";
		} else {
			if (params.listtype == "player") {
				var endNo = 0;
				if (currentPageNo * 10 > self.userGamesTotal) {
					endNo = self.userGamesTotal;
				} else {
					endNo = currentPageNo * 10;
				}
				pagiString += "<span id=\"results\" class=\"txt\">Results: (" + (((currentPageNo - 1) * 10) + 1) + " - " + endNo + " of " + self.userGamesTotal + ")</span>";
			} else {
				pagiString += "<span id=\"results\" class=\"txt\">Results: (" + (((currentPageNo - 1) * 10) + 1) + " - " + (currentPageNo * 10) + " of " + 200 + ")</span>";
			}
		}
		pagiString += "<span class=\"txt\">Page: &nbsp;</span>";
		// add previous page link
		if (currentPageNo > 1) {
			params.page = currentPageNo - 1;
			pagiString += "<a href=\"javascript:b10gc.getContent('" + targetContent + "'," + self.returnParams(params) +");\"><span class=\"arws\">&laquo</span><span class=\"txt\">Previous</span></a>";
		}
		// add numbered page links and flag current page
		for (i = 1; i <= pageLoopLimit; i++) {
			params.page = i;
			if (i == currentPageNo) {
				pagiString += "<span class=\"crnt\">" + i + "</span> ";
			} else {
				pagiString += "<a class=\"page\" href=\"javascript:b10gc.getContent('" + targetContent + "'," + self.returnParams(params) +");\">" + i + "</a> ";
			}
		}
		// add next page link
		if (currentPageNo < pageLoopLimit) {
			params.page = parseInt(currentPageNo) + 1;
			pagiString += "<a href=\"javascript:b10gc.getContent('" + targetContent + "'," + self.returnParams(params) +");\"><span class=\"txt\">Next</span><span class=\"arws\">&raquo</span></a>";
		}
		pagiString += "</div>";

		return pagiString;
	}

	this.generateBrowseMenu = function(data, menuType) {
		var menuString = "";

		jQuery.each(data,function(key, val){
			if (menuType == "hero") {
				menuString += "<div class=\"mitem\" onclick=\"javascript:b10gc.getContent('browse',{listtype:'hero',hero:'" + val.heroId + "',gcproduct:'" + val.productName + "',page:'1'});\">";
				menuString += "<span>" + val.heroName + "</span>";
			} else {
				menuString += "<div class=\"mitem\" onclick=\"javascript:b10gc.getContent('browse',{listtype:'goal',goal:'" + val.goalId + "',gcproduct:'" + val.productName + "',page:'1'});\">";
				menuString += "<span>" + val.goalName + "</span>";
			}
			menuString += "</div>";
		});

		var targetDiv = "#by" + menuType;
		jQuery(targetDiv).html(menuString);
	}

	// utilities

	// insert user name and profile information
	this.insertProfile = function () {
		var profileString = "";
		profileString += "<div><span class=\"name\">" + readCookie('dname') + "</span></div>";
		profileString += "<div class=\"stack\"><span class=\"txt\">Games built:</span></div>";
		profileString += "<div class=\"stack\"><span class=\"number\">" + self.userGamesTotal + "</span></div>";
		profileString += "<div class=\"clr\"></div>";
		jQuery('#profile .profile').html(profileString);
	}

	// return all the parameters in an object as a string for writing into the HTML
	this.returnParams = function (params) {
		var pString = "";
		pString += "{";
		var i = 0;
		for (var key in params) {
			pString += key + ":'" + params[key] + "',";
		}
		pString = pString.slice(0,-1);

		pString += "}";
		return pString;
	}

	// show/hide content panels
	this.revealContent = function(targetContent) {
		jQuery('#' + self.currentContent).css('display','none');
		jQuery('#' + targetContent).css('display','block');
		self.currentContent = targetContent;
	}

	// format long numbers with commas
	this.addCommas = function(timesPlayed) {
		while (/(\d+)(\d{3})/.test(timesPlayed.toString())){
    		timesPlayed = timesPlayed.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
		}
		return timesPlayed;
	}

	// round rating values to the nearest half
	this.roundRating = function(rating,ratingCount) {
		var rR = 0;
		var roundedBase = 0;
		var base = 0;
		if (parseInt(ratingCount) > 0) {
			roundedBase = Math.round(parseInt(rating)/parseInt(ratingCount));
			base = parseInt(rating)/parseInt(ratingCount);
		}


			if ((base > (roundedBase + .4)) && (base < (roundedBase + .6))){
				rR = roundedBase + "5";
			} else {
				rR = roundedBase;
			}
		return rR;
	}

	// round difficulty ratings to the nearest whole
	this.roundDifficulty = function(rating,ratingCount) {
		var rD = 0;
		if (parseInt(ratingCount) > 0) {
			rD = Math.floor(rating/ratingCount);
		}
		return rD;
	}

	this.percentWon = function(timesPlayed,timesWon) {
		var pW = 0;
		if (parseInt(timesPlayed) > 0) {
			pW = Math.round((parseInt(timesWon)/parseInt(timesPlayed)) * 100);
		}
		return pW;
	}

	this.readableDate = function(utcTime) {
		var theDate = new Date(0);
		theDate.setUTCMilliseconds(utcTime);
		var dateString = (theDate.getMonth() + 1) + "/" + theDate.getDate() + "/" + theDate.getFullYear();

		if (dateString.indexOf('NaN') > -1) {
			var fakeDate = new Date();
			dateString = (fakeDate.getMonth() + 1) + "/" + fakeDate.getDate() + "/" + fakeDate.getFullYear();
		}
		return dateString;
	}

	this.browseError = function() {
		var browseError = "<div class=\"browseerror\">";
		browseError += "<h3>No results found</h3>";
		browseError += "<span>Sorry, we couldn't find the games you're looking for.<br>Please check your information and try again.</span>";
		browseError += "</div>";
		jQuery("#browsegames").html(browseError);
	}

	// reveal login or build prompt instead of profile
	this.profileError = function(eType) {
		var profileError = "";
		if (eType == "login") {
			profileError += "<div class=\"profileerror\">";
			profileError += "<div class=\"hdr\">";
			profileError += "<span>You must log in to see your games and to submit new ones.</span>";
			profileError += "</div>";
			profileError += "<div class=\"stack\">";
			profileError += "<ul>";
			profileError += "<li>Submit games to the gallery</li>";
			profileError += "<li>Track how many people play your games</li>";
			profileError += "<li>See how people rate your games</li>";
			profileError += "</ul>";
			profileError += "</div>";
			profileError += "<div class=\"stack\">";
			profileError += "<span>Need a user name to log in? Register here.</span>";
			profileError += "</div>";
			profileError += "<div class=\"buttons\">";
			profileError += "<div class=\"btn\" onclick=\"javascript:LoginModule.showLoginWindow({visible: true}, 'login');\">";
			profileError += "<div class=\"ie_fix\">";
			profileError += "<span>LOG IN</span>";
			profileError += "</div>";
			profileError += "</div>";
			profileError += "<div class=\"btn\" onclick=\"javascript:LoginModule.showLoginWindow({visible: true}, 'reg');\">";
			profileError += "<div class=\"ie_fix\">";
			profileError += "<span>REGISTER</span>";
			profileError += "</div>";
			profileError += "</div>";
			profileError += "</div>";
			profileError += "</div>";
			profileError += "<div class=\"clr\"></div>";
		} else {
			profileError += "<div class=\"profileerror\">";
			profileError += "<div class=\"hdr\">";
			profileError += "<span class=\"largeWhiteText\">Try building and sharing your own games!</span><br><br>";
			profileError += "</div>";
			profileError += "<div class=\"button\">";
			profileError += "<a href=\"#swfTop\">";
			profileError += "<div class=\"btn\">";
			profileError += "<div class=\"ie_fix\">";
			profileError += "<span>BUILD NOW!</span>";
			profileError += "</div>";
			profileError += "</div>";
			profileError += "</a>";
			profileError += "</div>";
			profileError += "</div>";
		}

		jQuery('#profilegames').html(profileError);
		self.revealContent('profile');	
	}

	// return the number of games made by a player
	this.returnTotalPlayerGames = function(player) {
		var urlString = "/i.cdn.turner.com/toon" + serviceType + "/" + servicePath + "/player/" + gameProperty + "/" + player + "/count";
		jQuery.ajax({
			// get the property meta XML
			type: "GET",
			url: urlString,
			dataType: "json",
			error: function (player) {
				if (typeof console == "object") {
					console.log("ERROR: unable to get game count");
					console.log(player);
				}
			},
			success: function(data) {
				self.userGamesTotal = data.gameCount;
				self.generatePagedHTML(self.userData, self.userParams, self.userTarget);
			}
		});
	}

	this.forkDataReturns = function(data, params, targetContent, member) {
		if (targetContent == "featured") {
			// generate the featured HTML
			self.generateFeaturedHTML(data, params, targetContent, member);
		} else if (targetContent == "profile" || (targetContent == "browse" && params.listtype == "player")) {
			// store the game data
			self.userData = data;
			self.userParams = params;
			self.userTarget = targetContent;

			// for player requests, browse or profile, get total number of available games
			self.returnTotalPlayerGames(params.player);
		} else {
			self.generatePagedHTML(data, params, targetContent);
		}
	}

	// request JSON data from the services and return it to the proper HTML generator
	this.gameCreatorListQuery = function(params, targetContent, member) {
		/* param definitions 
		subdomain - local subdomain for services
			possible values: www, staging
		gcproduct - gamecreator product requested
			possible values: ben10, batman, starwars, adventuretime
		service - service host name
			possible values: papi, dragonsvc, etc
		listtype - type of data to be returned
			possible values: featured, latest, hero, goal, player, most-played, highest-rated
		hero - name of the character in the games requested
			examples: four arms, bloxx, feedback, batman, yoda, finn
		goal - type of goal in the games requested
			possible values:
		player - user name of the requested games' creator
			examples: Zippy Zeb Zip
		limit - time frame for the requested games
			possible values: alltime, weekly, millionmark
		page - number of entries to return;
			possible values: any number
		path - version and service name; generally static and unlikely to ever be passed;
			included here to make changing the default easy
			possible values: /v2/game-creator-list/
		*/
	 	var subdomain	= params.subdomain || serverEnv;
		var gcproduct	= params.gcproduct || gameProperty;
		var service		= params.service || serviceType;
		var listtype	= params.listtype || 'latest';
		var hero 		= params.hero || '4';
		var goal 		= params.goal || '1';
		var player 		= params.player || 'Cartoon Network';
		var limit		= params.limit || 'alltime';
		var page		= params.page || '1';
		var path		= params.path || servicePath;

		var urlString 	= "/i.cdn.turner.com/toon" + "/" +  path + "/" +  service + "/" +  listtype + "/";
		var urlEnd;

		if (listtype == "hero") {
			urlEnd = gcproduct + "/" + hero + "/" + page;
		} else if (listtype == "goal") {
			urlEnd = gcproduct + "/" + goal + "/" + page;
		} else if (listtype == "player") {
			urlEnd = gcproduct + "/" + player + "/" + page;
		} else if (listtype == "most-played") {
			urlEnd = gcproduct + "/" + limit + "/" + page;
		} else {
			urlEnd = gcproduct + "/"  + page;
		}
		urlString = urlString + urlEnd;

		jQuery.ajax({
			// get the property meta XML
			type: "GET",
			url: urlString,
			dataType: "json",
			myParams: params,
			myListType: params.listtype,
			myHero: params.hero,
			myGoal: params.goal,
			myPlayer: params.player,
			myLimit: params.limit,
			myPage: params.page,
			myTargetContent: targetContent,
			myMember: member,
			error: function () {
				if (typeof console == "object") {
					if (targetContent == "featured") {
						console.log("ERROR: unable to request data for featured object");
						console.log(this.myMember);
					} else {
						console.log("ERROR: unable to request data for paged object");
					}
				}
			},
			success: function(data) {
				self.forkDataReturns(data,this.myParams,this.myTargetContent,this.myMember);
			}
		});
	}

	// query the database for possible heroes or goals
	this.browseMenuDataQuery = function(menuType) {
		var urlString = "/i.cdn.turner.com/toon" + "/" +  serviceType + "/" + heroServicePath + "/" +  menuType + "/all/" + gameProperty;
		jQuery.ajax({
			// get the property meta XML
			type: "GET",
			url: urlString,
			dataType: "json",
			myMenuType: menuType,
			error: function () {
				if (typeof console == "object") {
					console.log("ERROR: unable to get list for");
					console.log(this.myMenuType);
				}
			},
			success: function(data) {
				self.generateBrowseMenu(data, this.myMenuType);
			}
		});
	}

}

var b10gc = new gcHTML();
