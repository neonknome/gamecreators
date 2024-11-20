	
function endAd() {
	var tiTO = setTimeout(function(){doGCSwf();},0);
}

function doGCSwf() {

	jQuery('#contentHolder').css('display','block');

	gcFVars = { 
		metricsPath_fv	:	"/i.cdn.turner.com/toon/tools/media/as_metrics.swf", 
		fvXML			:	"/i.cdn.turner.com/toon/tools/xml/properties_LoginModule.xml", 
		gameID			:	passedVal, 
		gameCreator		:	passedCreator, 
		fvGameTitle		:	"gamemaker", 
		fvMenu			:	"false", 
		tile			:	cnnad_tileID, 
		color			:	"000000", 
		displayAd		:		"true"
	}
	swfobject.embedSWF("shell.swf", "gameSwf", "1000", "700", "9,0,45,0", "swf/expressInstall.swf", gcFVars, {quality:"high",bgcolor:"#000000",allowScriptAccess:"always",wmode:"direct" },{name:"gamecreator",id: "gamecreator"});

}