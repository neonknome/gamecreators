
function LoginModuleComm() {

}

LoginModuleComm.localConnSWF;
LoginModuleComm.swfIsReady = false;

LoginModuleComm.getFlashMovie = function(movieName){

	var isIE = navigator.appName.indexOf("Microsoft") != -1;
	return (isIE) ? window[movieName] : document[movieName];
}

LoginModuleComm.onReady = function (){

	LoginModuleComm.localConnSWF = LoginModuleComm.getFlashMovie("LoginModule_login_localconn");
	LoginModuleComm.swfIsReady = true;
}

LoginModuleComm.onAlert = function (val){

	alert(val);
}

LoginModuleComm.sendLoginData = function (p_val){

	var o = new Object();
	o.username = p_val;

	if(LoginModuleComm.swfIsReady){
		LoginModuleComm.localConnSWF.onLoginDataReceived(o);
	}else{
		LoginModuleComm.sendUserTimer =  setTimeout("LoginModuleComm.sendLoginData('"+p_val+"')", 500);
	}
}

LoginModuleComm.sendCancel = function (){

	if(LoginModuleComm.swfIsReady){
		LoginModuleComm.localConnSWF.onSendCancel();
	}else{
		LoginModuleComm.sendCancelTimer =  setTimeout("LoginModuleComm.sendCancel()", 500);
	}
}

LoginModuleComm.isLoggedIn = function (){

	if(LoginModule.isLoggedIn){
		LoginModuleComm.sendLoginData(LoginModule.userDisplayName);
	}else{
		LoginModule.showLoginWindow({visible: true}, "login"); 
	}
}

LoginModuleComm.openLoginWindow = function (){

	LoginModule.showLoginWindow({visible: true}, "login"); 
}

LoginModuleComm.openRegWindow = function (){

	LoginModule.showLoginWindow({visible: true}, "reg"); 
}

LoginModuleComm.logOut = function (){

	LoginModule.onCartoonLogOut();
}

