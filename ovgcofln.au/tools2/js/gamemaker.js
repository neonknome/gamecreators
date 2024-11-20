	var SERVICE_NM = new Array();
	var ALLTEMPLATES= new Array();
	var index = 0;
	var root = new Object();
	var HASH = new Array();
	var breakCache = false;

	function Page(page) {
		this.ordinal = page;
		return this;
	}

	function DEFAULT() {
		this.items = queryString("items") != 'false' ? queryString("items") : 4; 	
		this.id= queryString("id") != 'false' ? queryString("id") : 1; 	
		this.display= queryString("display") != 'false' ? queryString("display") : 1; 	
		this.mode = queryString("mode") != 'false' ? queryString("mode") : "prod"; 	
	}

	var param = new DEFAULT();

	function doReload() {
		window.location.reload(true);
	}

	/* Request object encapsulates stuff we care about in order to 
	* make a cross domain request
        * svc - service to call
	* template - domId of template to use for merging (may be the same as domId)
	* extraArgs - any extra arguments
	*/
	function Request(svc,templateId,pageNum,typeNum,domId) {
		var templateId = templateId;
		var svc = svc;
		var templateHTML = null;
		var domId = null;
		var extraArgs = null;

		param.extraArgs = "";

		if(arguments.length == 4) {
			domId = templateId;
		} else {
			domId = domId;
		}

		this.withArgs = function(args) {
			if(args.indexOf("=") > -1) {
				extraArgs = args;
				param.extraArgs = args;
			} else {
				param.extraArgs = "d=12";
				extraArgs = "d=12";
			}
			return this;
		}


		var doReload = function() {
			window.location.reload(true);
		}

		var _getTemplate = function() {
			var masterTemplate = null;
			if(!ALLTEMPLATES[domId]){
				masterTemplate = document.getElementById(domId).innerHTML.replace(/\[<!--/,"").replace(/\/\/-->]/,"");
				ALLTEMPLATES[domId] = masterTemplate;
			} else {
				masterTemplate = ALLTEMPLATES[domId];
			}
			return masterTemplate;
		}
		this.send = function(reload) {
			var _parse = function(obj,idFromOutside,configObj) {
		 		var TemplateObject = 
				TrimPath.parseTemplate(_getTemplate());
				root = new Object();
				root.serviceName = svc;
		 		root.ctx = eval("obj[0]." + svc + ".content");
				root.ctx.status = eval("obj[0]." + svc + ".status");
				root.ctx.msg = eval("obj[0]." + svc + ".msg");
				root.ctx.extraArgs = "";
				//Convenience attribute for accessing what we care about (Pagination Object)
				//root.ctx = root.func;
				if(!window[domId + "lastRequest"]) {
					window[domId + "lastRequest"] = param.extraArgs;
				} else {
					param.extraArgs += "&" + window[domId + "lastRequest"];
					window[domId + "lastRequest"] = param.extraArgs;
				}
				root.ctx.extraArgs =  param.extraArgs; 
				root.ctx.svc = svc;
				root.ctx.asArray = function(arg) {
					a = new Array();
					for(xx=0; xx < arg;xx++)
					{
						a[a.length] = xx;	
					}
					return a;
				}
		 		pages = new Array();
		 		for (i=0; i < root.ctx.totalNumberOfPages; i++) {
					pages[pages.length] = new Page(i+1);	
		 		}
				root.ctx.pages = pages;
		 		var result = TemplateObject.process(root);
		 		document.getElementById(templateId).style.display="block";
		 		return result;
			}

			var cfunc = arguments.length ==1 && arguments[0] == true ? doReload : _parse;
			mgr = CSIManager.getInstance();
				tempSVCPath = svc + typeNum + pageNum + '.html';
//                	mgr.call('http://teg8fref1.cartoonnetwork.com:7738/gamecreator/call.service', 'mode=json_html&requestType=' + svc +  '&' + param.extraArgs + '&Creator.id=' + param.id +'&Game.creator.id=' + param.id + '&pageToDisplay=' + param.display + '&numberOfItemsPerPage=' + param.items, domId, cfunc);
                	mgr.call('http://'+my_domain+'/data/' + tempSVCPath, '', domId, cfunc);
//                	mgr.call('/data/' + tempSVCPath, '', domId, cfunc);
//                	mgr.call('http://gamecreator.cartoonnetwork.com/data2/' + tempSVCPath, '', domId, cfunc);
		}
		return this;
	}

function oldRequest (svc,templateId,domId) {
		var templateId = templateId;
		var svc = svc;
		var templateHTML = null;
		var domId = null;
		var extraArgs = null;

		param.extraArgs = "";

		if(arguments.length == 2) {
			domId = templateId;
		} else {
			domId = domId;
		}


		this.withArgs = function(args) {
			if(args.indexOf("=") > -1) {
				extraArgs = args;
				param.extraArgs = args;
			} else {
				param.extraArgs = "d=12";
				extraArgs = "d=12";
			}
			return this;
		}


		var doReload = function() {
			window.location.reload(true);
		}

		var _getTemplate = function() {
			var masterTemplate = null;
				if(!ALLTEMPLATES[domId]) {
					masterTemplate = document.getElementById(domId).innerHTML.replace(/\[<!--/,"").replace(/\/\/-->]/,"");
					ALLTEMPLATES[domId] = masterTemplate;
				} else {
					masterTemplate = ALLTEMPLATES[domId];
				}
			return masterTemplate;
		}
		this.send = function(reload) {
			var _parse = function(obj,idFromOutside,configObj) {
		 		var TemplateObject = TrimPath.parseTemplate(_getTemplate());
				root = new Object();
				root.serviceName = svc;
		 		root.ctx = eval("obj[0]." + svc + ".content");
				root.ctx.status = eval("obj[0]." + svc + ".status");
				root.ctx.msg = eval("obj[0]." + svc + ".msg");
				root.ctx.extraArgs = "";
				//Convenience attribute for accessing what we care about (Pagination Object)
				//root.ctx = root.func;
				if(!window[domId + "lastRequest"]) {
					window[domId + "lastRequest"] = param.extraArgs;
				} else {

					param.extraArgs += "&" + window[domId + "lastRequest"];
					window[domId + "lastRequest"] = param.extraArgs;
				}
				root.ctx.extraArgs =  param.extraArgs; 
				root.ctx.svc = svc;
				root.ctx.asArray = function(arg) {
					a = new Array();
					for(xx=0; xx < arg;xx++)
					{
						a[a.length] = xx;	
					}
					return a;
				}
		 		pages = new Array();
		 		for (i=0; i < root.ctx.totalNumberOfPages; i++) {
					pages[pages.length] = new Page(i+1);	
		 		}
				root.ctx.pages = pages;
		 		var result = TemplateObject.process(root);
		 		document.getElementById(templateId).style.display="block";
		 		return result;
			}

			var cfunc = arguments.length ==1 && arguments[0] == true ? doReload : _parse;
			mgr = CSIManager.getInstance();
			//alert('mode=json_html&requestType=' + svc +  '&' + param.extraArgs + '&Creator.id=' + param.id +'&Game.creator.id=' + param.id + '&pageToDisplay=' + param.display + '&numberOfItemsPerPage=' + param.items);
			//mgr.call('http://gamecreatorsvcs.cartoonnetwork.com/gamecreator/call.service', 'mode=json_html&requestType=' + svc +  '&' + param.extraArgs + '&Creator.id=' + param.id +'&Game.creator.id=' + param.id + '&pageToDisplay=' + param.display + '&numberOfItemsPerPage=' + param.items, domId, cfunc);
			mgr.call('http://'+my_domain+'/gateway.php', 'mode=json_html&requestType=' + svc +  '&' + param.extraArgs + '&Creator.id=' + param.id +'&Game.creator.id=' + param.id, domId, cfunc);
			//mgr.call('/gateway.php', 'mode=json_html&requestType=' + svc +  '&' + param.extraArgs + '&Creator.id=' + param.id +'&Game.creator.id=' + param.id + '&pageToDisplay=' + param.display + '&numberOfItemsPerPage=' + param.items, domId, cfunc);

		}

		return this;
}

function newRequest (svc,templateId,domId) {
		var templateId = templateId;
		var svc = svc;
		var templateHTML = null;
		var domId = null;
		var extraArgs = null;

		param.extraArgs = "";

		if(arguments.length == 2) {
			domId = templateId;
		} else {
			domId = domId;
		}

		this.withArgs = function(args) {
			if(args.indexOf("=") > -1) {
				extraArgs = args;
				param.extraArgs = args;
			} else {
				param.extraArgs = "d=12";
				extraArgs = "d=12";
			}
			return this;
		}

		var doReload = function() {
			window.location.reload(true);
		}

		var _getTemplate = function() {
			var masterTemplate = null;
			if(!ALLTEMPLATES[domId]) {
				masterTemplate = document.getElementById(domId).innerHTML.replace(/\[<!--/,"").replace(/\/\/-->]/,"");
				ALLTEMPLATES[domId] = masterTemplate;
			} else {
				masterTemplate = ALLTEMPLATES[domId];
			}
			return masterTemplate;
		}
		this.send = function(reload) {
			var _parse = function(obj,idFromOutside,configObj) {
		 		var TemplateObject = TrimPath.parseTemplate(_getTemplate());
				root = new Object();
				root.serviceName = svc;
		 		root.ctx = eval("obj[0]." + svc + ".content");
				root.ctx.status = eval("obj[0]." + svc + ".status");
				root.ctx.msg = eval("obj[0]." + svc + ".msg");
				root.ctx.extraArgs = "";
				//Convenience attribute for accessing what we care about (Pagination Object)
				//root.ctx = root.func;
				if(!window[domId + "lastRequest"]) {
					window[domId + "lastRequest"] = param.extraArgs;
				} else {

					param.extraArgs += "&" + window[domId + "lastRequest"];
					window[domId + "lastRequest"] = param.extraArgs;
				}
				root.ctx.extraArgs =  param.extraArgs; 
				root.ctx.svc = svc;
				root.ctx.asArray = function(arg) {
					a = new Array();
					for(xx=0; xx < arg;xx++)
					{
						a[a.length] = xx;	
					}
					return a;
				}
		 		pages = new Array();
		 		for (i=0; i < root.ctx.totalNumberOfPages; i++) {
					pages[pages.length] = new Page(i+1);	
		 		}
				root.ctx.pages = pages;
		 		var result = TemplateObject.process(root);
		 		document.getElementById(templateId).style.display="block";
		 		return result;
			}
			var cfunc = arguments.length ==1 && arguments[0] == true ? doReload : _parse;
			mgr = CSIManager.getInstance();
			mgr.call('http://'+my_domain+'/gateway.php', 'mode=json_html&requestType=' + svc +  '&' + param.extraArgs, domId, cfunc);
			//mgr.call('/gateway.php', 'mode=json_html&requestType=' + svc +  '&' + param.extraArgs + '&Creator.id=' + param.id +'&Game.creator.id=' + param.id + '&pageToDisplay=' + param.display + '&numberOfItemsPerPage=' + param.items, domId, cfunc);
		}
		return this;
}

	function formatDate(timeInMilliSeconds) {
		d = new Date(timeInMilliSeconds);
		return (d.getMonth() + 1) + '/' + (d.getDate()) + '/' + d.getFullYear()
	}



	function shareGame(url) {
		if(prompt("Copy the game location to your email or IM client.","http://"+my_domain+"?" + url)) {
			new Request("submitTimesShared","result").withArgs(url).send(true);
		}
	}
