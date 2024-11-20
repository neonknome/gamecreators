function make_url(path, myCDN) {
	var pos = path.indexOf("/");
	if (pos == -1 || pos != 0) {
		path = "/"+path;
	}
	var suffix = (path.length+1) % 6
	var array= myCDN.split(".");
	var subDomain = array.shift();
	var domain = array.join(".");
	
	var host = "";
	
	if(subDomain != "hkinteractive" && subDomain != "www") {
		if(subDomain.substr(subDomain.length-1, 1) == "0") {
			host = subDomain.substr(0, subDomain.length-1)+suffix+"."+domain;
		}else{
			host = subDomain+suffix+"."+domain;
		}
	}else{
		host = myCDN;
	}
	
	abs_href = "http://"+host+path;
	return abs_href;
}