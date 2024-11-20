function LoginModule () {
	
}

LoginModule.isLoggedIn = false;
LoginModule.username = "";
LoginModule.toonixURL = "";
LoginModule.tokenId = "";
LoginModule.userId = "";

LoginModule.loginRefresh = false;

LoginModule.init = function (){

	var session_token = readCookie("session_token");

	if (session_token) {
	//alert('LoginModule.init go getInfo');
	    LoginModule.getInfo();
		
	} else {
	//alert('LoginModule.init 2');
	    LoginModule.attachURL();

	}
	
}

LoginModule.attachURL = function (){

	jQuery.ajax({
		url: '/membership/sso.php?cmd=getattachurl&#38;no-cache=3jj4dkjaf89',
		type: 'GET',
		cache: false,
		error: function(xhr) {
			//alert('Error');
		},
		success: function(data, statusText, jqXHR) {
			img = new Image();
			img.src = data;
	        img.onerror = function(e) {
	            //alert("Image loading error");
	        }
	        
	        img.onabort = function() {
	            //alert("Image loading aborted");
	        }
	        img.onload = function() {
	            LoginModule.getInfo();
	        }
		}

	});
	
}

				
				
LoginModule.gc_auth_token = function (){

	jQuery.ajax({
		url: '/membership/validation.php',
		type: 'POST',
		data: {pid: 'cn.gamemaker'},
		dataType: "html",
		cache: false,
		error: function(xhr) {
			//alert(xhr.status);
		},
		success: function(data, statusText, jqXHR) {

		},
		complete: function(xhr, statusText) {
			//alert('LoginModule.getInfo complete'+ xhr.status);
			switch(xhr.status) {
				case 401:					
					break;
				case 200:				
					if (LoginModule.username!=''){
						gamecreatorDisplayNameCall(LoginModule.username);
					
					}
					break;
			}
			
		}
	});
	
}
LoginModule.getInfo = function (init){

	jQuery.ajax({
		url: '/membership/sso.php?cmd=info&#38;no-cache=3jj4dkjaf89',
		type: 'GET',
		dataType: "xml",
		cache: false,
		error: function(xhr) {
			//alert(xhr.status);
		},
		success: function(data, statusText, jqXHR) {
			//alert('LoginModule.getInfo complete'+ data);
			var username = jQuery(data).find('user').attr('identity');
			var userId = jQuery(data).find('user').attr('uid');
			//alert(jQuery(data).find('user').attr('uid'));
			var tokenId = jQuery(data).find('info').text();
			LoginModule.username = username;
			LoginModule.userId = userId;
			LoginModule.tokenId = tokenId;
			
		},
		complete: function(xhr, statusText) {
			//alert('LoginModule.getInfo complete'+ xhr.status);
			switch(xhr.status) {
				case 401:
				
					LoginModule.username = '';
					LoginModule.userId = '';
					LoginModule.tokenId = '';
					LoginModule.isLoggedIn = false;
				
					break;
				case 200:
				
					LoginModule.isLoggedIn = true;
					if(init == "true") {
						initContent();
					}
					LoginModule.hidePopup();
					LoginModule.gc_auth_token();
					
					break;
			}
			/*LoginModule.writeLoginModule();*/
		}
	});
	
}

LoginModule.loginCheck = function (){
	jQuery.ajax({
		url: '/membership/sso.php?cmd=info&#38;no-cache=3jj4dkjaf89',
		type: 'GET',
		dataType: "xml",
		cache: false,
		error: function(xhr) {
			//alert(xhr.status);
		},
		success: function(data, statusText, jqXHR) {

		},
		complete: function(xhr, statusText) {
			switch(xhr.status) {
				case 401:
					isNotLoggedIn();
					break;
				case 200:
					isLoggedIn();
					break;
			}
			/*LoginModule.writeLoginModule();*/
		}
	});
	
}

LoginModule.writeLoginModule = function (){

	if(document.getElementById("cnLogInUI")){ 
		
		if(LoginModule.isLoggedIn) {
			
			document.getElementById("cnLogInUI").innerHTML = '<a href="/toonix"><div id="myAvatar" class="loginavatar"></div></a><div class="leftWrapper"><div class="left"><a href="/membership"><div class="cnclublogo"></div></a><div id="greeting" class="logintext"></div></div></div>';
		}else{
		
			document.getElementById("cnLogInUI").innerHTML = '<a href="/toonix"><div id="myAvatar" class="loginavatar"></div></a><div class="leftWrapper"><div class="left"><a href="/membership"><div class="cnclublogo"></div></a><div id="greeting" class="logintext"></div></div></div>';
		}
		LoginModule.getAvatar();
		LoginModule.doWriteMessage();
	}

}

LoginModule.getToonixThumb = function (width, height, callbackFunc){
	if(LoginModule.isLoggedIn) {
		var url = 'http://'+api_domain+'/toonix/2.0/toonixsvc.php?requestType=getToonixThumb&countryCode=' + ccode + '&debug=1&username=' + LoginModule.username + '&part=full&mode=json&jsoncallback=?';
		jQuery.getJSON(url, function(data){
			if(data.results.status == "success") {
				var data = data.results.data;
				var avatar = data.root.avatar.item;
				for(var i=0; i<avatar.length; i++) {
					var avaWidth = parseInt(avatar[i].width);
					var avaHeight = parseInt(avatar[i].height);
					if(avaWidth == width && avaHeight == height) {
						callbackFunc(avatar[i].url);
					}
				}
			}else{
				//error
			}

		});
		
	}
}

LoginModule.getAvatar = function (){

	if(LoginModule.isLoggedIn) {
		
		LoginModule.getToonixThumb(76, 74, 
			function(toonixURL){
				LoginModule.toonixURL = toonixURL;
				LoginModule.doWriteAvatar();
			}
		);
		
	}else{
	
		/*LoginModule.toonixURL = make_url('/layout/' + lang + '/loginModule/img/top_toonix_default.png', cdndomain);*/
		LoginModule.toonixURL = 'images/loginModule/img/top_toonix_default.png';

		LoginModule.doWriteAvatar();
	}

}

LoginModule.doWriteAvatar = function (){
//alert('LoginModule.doWriteAvatar');
	if(document.getElementById("myAvatar")){
		// have to offset avatar for user toonix 
		
		if(LoginModule.username != "") {
			document.getElementById("myAvatar").innerHTML = "<img class='navatar' src='" + LoginModule.toonixURL + "' border='0'>";
		}else{
			document.getElementById("myAvatar").innerHTML = "<img class='davatar' src='" + LoginModule.toonixURL + "' border='0'>";
		}
	}
//alert('LoginModule.doWriteAvatar end');	
}

LoginModule.doWriteMessage = function (){
	if(document.getElementById("greeting")){ 
	//alert('LoginModule.doWriteMessage');
		if(LoginModule.username != "") {
			document.getElementById("greeting").innerHTML = "<a href=\"/membership\">" + LoginModule.username + "</a><br><a href=\"javascript:LoginModule.logout(true);\">logout</a>";
		}else{
			//document.getElementById("greeting").innerHTML = "<a href=\"javascript:LoginModule.showPopup()\">login</a> <a href=\"javascript:LoginModule.showRegisterPopup();\">sign up</a>";
			document.getElementById("greeting").innerHTML = "<a href=\"javascript:LoginModule.showPopup()\">login</a> <a href=\"/signup\">sign up</a>";
		}
	}
}

LoginModule.goRegistration = function() {
	var cid = getQueryVariable('cid');
	window.location = "http://" + cndomain + "/signup?cid="+cid;
	return false;
}

LoginModule.showPopup = function(init) {

	if(popupType == "page") {
		window.location = "/membership/login.php";
	}else{
		
		if(!LoginModule.isLoggedIn) {
				
			LoginModule.hideRegisterPopup();
			
			if(init){
				LoginModule.loginRefresh = true;
			}
			jQuery("#ajax_loading").hide();
			document.getElementById("init").value = init;
			//document.getElementById("overlay").style.display='block';
			//document.getElementById("loginPopup").style.display='block';
			jQuery("#password").val('');
			document.getElementById("loginPopupContainer").style.display='block';
			
			if(document.getElementById("game")) {
				document.getElementById("game").style.visibility ='hidden';
			}
		}
	}
}

<!-- for Adventure Time: Finn and Jake's Epic Quest game -->
LoginModule.showLoginWindow = function (oParams, p_menuView) {
	/*
	if(oParams.visible){
		LoginModule.onShowLoginWindow();

		var loginView = p_menuView == "reg" ? "msib_register" : "msib_login";
		var loginPath = p_menuView == "reg" ? "http://" + LoginModule.loginModuleEnvironment + ".cartoonnetwork.com/accounts/register.html?pid="+LoginModule.MSIBpid :  "http://" + LoginModule.loginModuleEnvironment + ".cartoonnetwork.com/accounts/login.html?pid="+LoginModule.MSIBpid;

		CartoonMSIB.loadMSIB(loginView, loginPath);	
	}else{
		LoginModule.onHideLoginWindow();
	}
	*/

	if(popupType == "page") {
		window.location = "/membership/login.php";
	}else{
		if(!LoginModule.isLoggedIn) {
			LoginModule.hideRegisterPopup();
			if(init){
				LoginModule.loginRefresh = true;
			}
			jQuery("#ajax_loading").hide();
			document.getElementById("init").value = init;
			//document.getElementById("overlay").style.display='block';
			//document.getElementById("loginPopup").style.display='block';
			document.getElementById("loginPopupContainer").style.display='block';
			if(document.getElementById("game")) {
				document.getElementById("game").style.visibility ='hidden';
			}
		}
	}
}

LoginModule.showRegisterPopup = function(init) {
	if(popupType == "page") {
		window.location = "/signup";
	}else{
		if(!LoginModule.isLoggedIn) {
			// hide login popup
			LoginModule.hidePopup();
			
			if(init){
				LoginModule.loginRefresh = true;
			}
			jQuery("#ajax_loading").hide();
			document.getElementById("init").value = init;
			
			var regURL = jQuery("#regFrame").attr("src");
			if(regURL == undefined) {
				jQuery("#regFrame").attr('src','/signup/f889eb2df2153c83217a7069202b0811/lite_step2.php');
			}else{
				jQuery("#regFrame").attr('src','/signup/f889eb2df2153c83217a7069202b0811/lite_step2.php');
			}
			if(document.getElementById("game")) {
				document.getElementById("game").style.visibility ='hidden';
			}
			document.getElementById("registerPopupContainer").style.display='block';
		}
	}
}

LoginModule.hidePopup = function() {

	//document.getElementById("overlay").style.display='none';
	//document.getElementById("loginPopup").style.display='none';
	document.getElementById("loginPopupContainer").style.display='none';
	
	if(document.getElementById("game")) {
		document.getElementById("game").style.visibility ='visible';
	}
	
	if((LoginModule.isLoggedIn == false) && thisMovie("gamecreator")){
	//alert('Call LoginModule.hidePopup gamecreatorCancelCall'+LoginModule.isLoggedIn);
		gamecreatorCancelCall();
	}
}

LoginModule.hideRegisterPopup = function() {

	document.getElementById("registerPopupContainer").style.display='none';

	if(document.getElementById("game")) {

		document.getElementById("game").style.visibility ='visible';
		
	}

}

LoginModule.logout = function(refresh) {
	
	if (location.href.indexOf("signup") != -1){
		window.location = '/membership/logged_out.php';
	}else{
		jQuery.ajax({
			//url: '/membership/sso.php?cmd=logout&#38;no-cache=3jj4dkjaf89',
			url: '/membership/sso_logout.php',
			type: 'GET',
			cache: false,
			error: function(xhr) {
				//alert(xhr.status);
			},
			success: function(data, statusText, jqXHR) {
				LoginModule.hidePopup();
				LoginModule.getInfo(jQuery("#init").val());
			},
			complete: function(xhr, statusText) {
				if(refresh == true) {
					window.location.reload();
				}
			}
		});
	}
	
}

LoginModule.cnloginbox_login = function() {
	
	if (jQuery("#username").val() == '') {
		jQuery("#result").text("Please enter your username");
		jQuery("#result").show();
	} else if (jQuery("#password").val() == '') {
		jQuery("#result").text("Please enter your password");
		jQuery("#result").show();

	} else {

		jQuery('#ajax_loading').show();  
		jQuery('#submit').hide();  
		jQuery("#result").hide();
		
		hash_str = "username="+jQuery("#username")[0].value+"~!~password="+jQuery("#password")[0].value;
		hash = rc4Encrypt("komodo", hash_str);
		hash = hexEncode(hash);

		jQuery.ajax({
			url: '/membership/sso.php?cmd=slogin&#38;no-cache=3jj4dkjaf89',
			type: 'POST',
			cache: false,
			//data: {username: jQuery("#username")[0].value, password:jQuery("#password")[0].value},
			data: {hash:hash},
			error: function(xhr) {
				//alert(xhr.status);
			},
			success: function(data, statusText, jqXHR) {
				LoginModule.hidePopup();
				LoginModule.getInfo(jQuery("#init").val());
				reactive_ecard_with_toonix();
				if(LoginModule.loginRefresh){
					window.location.reload();				
				}
				
			},
			complete: function(xhr, statusText) {
				if(xhr.status == 401){
					jQuery("#result").show();
					jQuery("#result").text("Incorrect password. Please try again.")
					jQuery('#ajax_loading').hide();  
					jQuery('#submit').show();  
				}
			}
		});
	}

}

// for ecard
function thisMovie(movieName) {
    if (navigator.appName.indexOf("Microsoft") != -1) {
        return window[movieName];
    } else {
        return document[movieName];
    }
}
function reactive_ecard_with_toonix() {
	if (document.URL.indexOf("/ecard/") != -1)
	{
		thisMovie('ecard_show_content').load_toonix_ecard();
	}
}

LoginModule.init();

//Encodes data to Hex(base16) format
function hexEncode(data){
	var b16_digits = '0123456789abcdef';
	var b16_map = new Array();
	for (var i=0; i<256; i++) {
		b16_map[i] = b16_digits.charAt(i >> 4) + b16_digits.charAt(i & 15);
	}
	
	var result = new Array();
	for (var i=0; i<data.length; i++) {
		result[i] = b16_map[data.charCodeAt(i)];
	}
	
	return result.join('');
}