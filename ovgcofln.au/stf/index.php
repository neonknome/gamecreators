<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">

<html>
<head><script type="text/javascript">window.NREUM||(NREUM={}),__nr_require=function(n,e,t){function r(t){if(!e[t]){var o=e[t]={exports:{}};n[t][0].call(o.exports,function(e){var o=n[t][1][e];return r(o?o:e)},o,o.exports)}return e[t].exports}if("function"==typeof __nr_require)return __nr_require;for(var o=0;o<t.length;o++)r(t[o]);return r}({QJf3ax:[function(n,e){function t(n){function e(e,t,a){n&&n(e,t,a),a||(a={});for(var u=c(e),f=u.length,s=i(a,o,r),p=0;f>p;p++)u[p].apply(s,t);return s}function a(n,e){f[n]=c(n).concat(e)}function c(n){return f[n]||[]}function u(){return t(e)}var f={};return{on:a,emit:e,create:u,listeners:c,_events:f}}function r(){return{}}var o="nr@context",i=n("gos");e.exports=t()},{gos:"7eSDFh"}],ee:[function(n,e){e.exports=n("QJf3ax")},{}],3:[function(n,e){function t(n){return function(){r(n,[(new Date).getTime()].concat(i(arguments)))}}var r=n("handle"),o=n(1),i=n(2);"undefined"==typeof window.newrelic&&(newrelic=window.NREUM);var a=["setPageViewName","trackUserAction","finished","traceEvent","inlineHit","noticeError"];o(a,function(n,e){window.NREUM[e]=t("api-"+e)}),e.exports=window.NREUM},{1:12,2:13,handle:"D5DuLP"}],gos:[function(n,e){e.exports=n("7eSDFh")},{}],"7eSDFh":[function(n,e){function t(n,e,t){if(r.call(n,e))return n[e];var o=t();if(Object.defineProperty&&Object.keys)try{return Object.defineProperty(n,e,{value:o,writable:!0,enumerable:!1}),o}catch(i){}return n[e]=o,o}var r=Object.prototype.hasOwnProperty;e.exports=t},{}],D5DuLP:[function(n,e){function t(n,e,t){return r.listeners(n).length?r.emit(n,e,t):(o[n]||(o[n]=[]),void o[n].push(e))}var r=n("ee").create(),o={};e.exports=t,t.ee=r,r.q=o},{ee:"QJf3ax"}],handle:[function(n,e){e.exports=n("D5DuLP")},{}],XL7HBI:[function(n,e){function t(n){var e=typeof n;return!n||"object"!==e&&"function"!==e?-1:n===window?0:i(n,o,function(){return r++})}var r=1,o="nr@id",i=n("gos");e.exports=t},{gos:"7eSDFh"}],id:[function(n,e){e.exports=n("XL7HBI")},{}],G9z0Bl:[function(n,e){function t(){var n=v.info=NREUM.info;if(n&&n.licenseKey&&n.applicationID&&f&&f.body){c(d,function(e,t){e in n||(n[e]=t)}),v.proto="https"===l.split(":")[0]||n.sslForHttp?"https://":"http://",a("mark",["onload",i()]);var e=f.createElement("script");e.src=v.proto+n.agent,f.body.appendChild(e)}}function r(){"complete"===f.readyState&&o()}function o(){a("mark",["domContent",i()])}function i(){return(new Date).getTime()}var a=n("handle"),c=n(1),u=(n(2),window),f=u.document,s="addEventListener",p="attachEvent",l=(""+location).split("?")[0],d={beacon:"bam.nr-data.net",errorBeacon:"bam.nr-data.net",agent:"js-agent.newrelic.com/nr-536.min.js"},v=e.exports={offset:i(),origin:l,features:{}};f[s]?(f[s]("DOMContentLoaded",o,!1),u[s]("load",t,!1)):(f[p]("onreadystatechange",r),u[p]("onload",t)),a("mark",["firstbyte",i()])},{1:12,2:3,handle:"D5DuLP"}],loader:[function(n,e){e.exports=n("G9z0Bl")},{}],12:[function(n,e){function t(n,e){var t=[],o="",i=0;for(o in n)r.call(n,o)&&(t[i]=e(o,n[o]),i+=1);return t}var r=Object.prototype.hasOwnProperty;e.exports=t},{}],13:[function(n,e){function t(n,e,t){e||(e=0),"undefined"==typeof t&&(t=n?n.length:0);for(var r=-1,o=t-e||0,i=Array(0>o?0:o);++r<o;)i[r]=n[e+r];return i}e.exports=t},{}]},{},["G9z0Bl"]);</script>
	<title>Untitled</title>
	<style>
		body {
			background: url('/tools/img/profile/stf.iframe.bk.jpg') no-repeat;
		}
		.greyText {
			font: 12px arial,helvetica,sans-serif;
			color: #999999;
		}
		.smallWhite {
			font: 10px arial,helvetica,sans-serif;
			color: #ffffff;
		}
	</style>
	<script>
		function rollImg (imgName, imgSrc) {
			if (document.images) {
				document[imgName].src = imgSrc;
			}
		}
		
		function doSubmit () {
			document.stfSender.url.value = "http://gamecreator.cartoonnetwork.com.au/index.php" + location.search;
			document.stfSender.submit();
		}
	</script>
</head>

<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
<table width="286" cellpadding="4" cellspacing="0" border="0">

	<form name="stfSender" action="/sendmail.php" onSubmit="return false;">
	<input type="hidden" name="url" value="">
	<input type="hidden" name="creator" value="foo">
	<tr align="center">
		<td colspan="2">
		<input type="text" name="name" value="Your name" size="30" onFocus="this.value='';" class="greyText" maxlength="10"></td>
	</tr>
	<tr align="center">
		<td colspan="2">

		<input type="text" name="friendemail" value="Your friend's email address" size="30" onFocus="this.value='';" class="greyText"></td>
	</tr>
	<tr align="center">
		<td>
		<a href="javascript: doSubmit();" 
			onMouseover="rollImg('sendButton','/tools/img/profile/btn.stf.send.over.gif');" 
			onMouseout="rollImg('sendButton','/tools/img/profile/btn.stf.send.off.gif');">
		<img src="/tools/img/profile/btn.stf.send.off.gif" width="88" height="22" alt="" border="0" name="sendButton"></a></td>
		<td>
		<a href="http://cartoonnetwork.com.au/help/privacy.html" target="_new" class="smallWhite">Privacy Policy</a></td>

	</tr>
	</form>
</table>
</div>
<script type="text/javascript">window.NREUM||(NREUM={});NREUM.info={"beacon":"bam.nr-data.net","licenseKey":"1b185cf1cf","applicationID":"1885019","transactionName":"blEGMEBTDUtVURVdC1cbMRZbHRBMUh0IWgBcTEoUWkI=","queueTime":0,"applicationTime":12,"ttGuid":"","agentToken":"","userAttributes":"","errorBeacon":"bam.nr-data.net","agent":"js-agent.newrelic.com\/nr-536.min.js"}</script></body>
</html>
