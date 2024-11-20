function geoFilter() 
{
	if (document.cookie.indexOf('adDEmas') != -1) 
	{
		readingCookie = cnnad_readCookie('adDEmas');
		splitCookie = readingCookie.split('&');
		var geoLocation = splitCookie[4];
			if ((geoLocation == "usa")||(geoLocation == "can")||(geoLocation == "fra")||(geoLocation == "none")||(geoLocation == "***")) {
				return false;
			} else {
				top.location.href="/i.cdn.turner.com/toon/help/international.html";
		}
	}
}