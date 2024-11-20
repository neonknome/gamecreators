function readCookie(cookieName) {
	var theCookie=""+document.cookie;
	var ind=theCookie.indexOf(cookieName);
	if (ind==-1 || cookieName=="") return ""; 
	var ind1=theCookie.indexOf(';',ind);
	if (ind1==-1) ind1=theCookie.length; 
	return unescape(theCookie.substring(ind+cookieName.length+1,ind1));
}
			

	
function setCookie(name,value,seconds,domain) {
	var expires = '';
	if (domain == null) {
		domain = cookieDomain();
	}
	if (seconds != 0) {
		var date = new Date();
		date.setTime(date.getTime() + seconds*1000);
		expires = '; expires=' + date.toGMTString();
	}
	document.cookie = name + '=' + escape(value) + expires + '; path=/; domain=.' + domain; 
}
	

function getCookies() {
	var hash = new Array;
	if (document.cookie != null) {
		var a = document.cookie.split('; ');
		for (var i=0; i < a.length; i++) {
			var nv = a[i].split('=');
			if (nv[1] != null) {
				hash[nv[0]] = unescape(nv[1]);
			}
		}
	}
	return hash;
}

function deleteCookie(name) {
	setCookie(name, 'x', -1);
}
    
function cookieDomain() {
	var d;
	var parts = window.location.hostname.split('.');
	if (parts[parts.length-1].length == 2) {
		// Domains like cnn.co.jp should retain 3 parts
		d = parts[parts.length-3] + '.' +
		    parts[parts.length-2] + '.' +
		    parts[parts.length-1];
	}
	else {
		// Other domains like cnn.com should retain 2 parts
		d = parts[parts.length-2] + '.' +
		parts[parts.length-1];
	}
	return d;
}
