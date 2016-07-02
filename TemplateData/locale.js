//alert("locale");
locale = "ru_ru";
frameHref = "";
frameReferrer = "";

// Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
// Firefox 1.0+
isFirefox = typeof InstallTrigger !== 'undefined';
// At least Safari 3+: "[object HTMLElementConstructor]"
isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
// Internet Explorer 6-11
isIE = /*@cc_on!@*/false || !!document.documentMode;
// Edge 20+
isEdge = !isIE && !!window.StyleMedia;
// Chrome 1+
isChrome = !!window.chrome && !!window.chrome.webstore;

// Blink engine detection
isBlink = (isChrome || isOpera) && !!window.CSS;

isMobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|windows phone|wpdesktop|fennec|windows mobile|opera mini|nokia|mobi/i.test(navigator.userAgent.toLowerCase()));

browsers = [
	isOpera ? "1" : "0",
	isFirefox ? "1" : "0",
	isSafari ? "1" : "0",
	isIE ? "1" : "0",
	isEdge ? "1" : "0",
	isChrome ? "1" : "0",
];

servers = ["poligonserv1.gamenasia.net", "poligonserv1.gamenasia.net"];
canvasId = "canvas";
testMode = 1;

function GetXMLHttpRequest(path, timeout) {
    var infoXhr = new XMLHttpRequest();
	infoXhr.open('GET', path);
	infoXhr.timeout = timeout;
	return infoXhr;
}

/*function loadScriptSync (src, onLoad) {
    var s = document.createElement('script');
    s.src = src;
    s.type = "text/javascript";
    s.async = false;
    document.getElementsByTagName('head')[0].appendChild(s);
}

loadScriptSync("TemplateData/vk_utils.js");
loadScriptSync("TemplateData/main.js");*/