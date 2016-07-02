//alert("main: " + frameHref);

function SetStorageItem(itemName, itemValue) {
    try {
        if (supportsLocalStorage()) {
            localStorage.setItem(itemName, itemValue);
        }
    } catch (e) {

    }
}

function GetStorageItem(itemName) {
    try {
        if (supportsLocalStorage()) {
            var itemValue = localStorage.getItem(itemName);
            if (itemValue != null) {
                SendMessage("GameManager", "GetStorageItem", itemName + "=" + itemValue);
            } else {
                SendMessage("GameManager", "GetStorageItem", itemName + "=");
            }
        }
    } catch (e) {

    }
}

function DeleteStorageItem(itemName) {
    try {
        if (supportsLocalStorage()) {
            localStorage.removeItem(itemName);
        }
    } catch (e) {

    }
}

function SyncFiles() { FS.syncfs(false, function (err) { }); }

function GetBrowserInfo() {
	SendMessage("GameManager", "GetBrowserInfo", browsers.join(',') + "|" + (isMobile ? "1" : "0"));
}

function GetParams() {
	//alert("frameHref: " + frameHref);
	//alert("frameReferrer: " + frameReferrer);
	SendMessage("GameManager", "OnGetHrefString", frameHref);
	SendMessage("GameManager", "OnGetReferrer", frameReferrer);
}

function CanUseHardwareCursor() {
	SendMessage("GameManager", "CanUseHardwareCursor", (isEdge || isIE) ? "0" : "1");
}

function GetScrollParams() {
	SendMessage("GameManager", "GetScrollParams", "0.1|5|0.135");
}

function OpenNewTab(url) {
	var newwindow = window.open(url, '_blank');
	if (newwindow != null) {
		newwindow.focus();
	} else {
		//SendMessage("GameManager", "OpenUrlError", "");
		OpenUrl(url, '_blank');
	}
}

function OpenUrl(url, windowType) {
	var link = document.getElementById(canvasId);
	var val = 1;
	link.onmouseup = function () {
		if (val == 1) {
			var newwindow = window.open(url, windowType);
			if (newwindow != null) {
				newwindow.focus();
			} else {
				SendMessage("GameManager", "OpenUrlError", "");
			}
			val = 0;
		} else {
			// console.log("no");
		}
	}
}

function DebugAlert(err) {
	alert(err);
}

function ShowError(err) {
	alert(err);
}

function WrongBrowser() {
	var imgLoaded = false;
	var img = document.createElement("img");
	var onLoad = function () {
		if(imgLoaded){
			return;
		}
		imgLoaded=true;
		var w = document.documentElement.clientWidth, h = document.documentElement.clientHeight;
		img.style.position = 'absolute';

		var hOffset = (w / 2 - 650 / 2);
		var top = (h - 180) / 2 + window.pageYOffset;
		img.style.left = hOffset + 'px';
		img.style.top = top + 'px';

		var showInfo = function (text) {
			var infoBlock = document.createElement('div');
			var infoNode = document.createTextNode(text);
			infoBlock.appendChild(infoNode);

			infoBlock.style.color = "#222714";
			infoBlock.style.textAlign = "center";
			infoBlock.style.fontWeight = 'bold';
			infoBlock.style.fontSize = "20px";
			infoBlock.style.overflow = 'hidden';
			//infoBlock.style.verticalAlign = 'middle';

			infoBlock.style.position = img.style.position;
			infoBlock.style.left = hOffset + 185 + 'px';
			infoBlock.style.right = hOffset + 10 + 'px';
			infoBlock.style.top = top + 50 + 'px';
			infoBlock.style.bottom = top + 18 + 'px';

			document.body.appendChild(infoBlock);
		};
		//alert("try text");
		
		var infoXhr = GetXMLHttpRequest('StreamingAssets/GameAssets/Locale/' + locale + '/wrongBrowser.txt', 1000);

		/*infoXhr.onreadystatechange = function() {
			if (infoXhr.readyState == 4) {
				if(infoXhr.status == 200) {
					alert(infoXhr.responseText);
				}
			}
		};*/
		infoXhr.onload = function (e) {
			if (infoXhr.status != 200) {
				showInfo("\"Internet Explorer\" does not support this WebGL content fully. Use a different browser to start this game.");
			} else {
				showInfo(infoXhr.response);
			}
		};
		infoXhr.ontimeout = function (e) {
			showInfo("\"Internet Explorer\" does not support this WebGL content fully. Use a different browser to start this game.");
		};
		infoXhr.send();
		
		//img.style.visibility = 'visible';
	}

	img.onload = onLoad;

	img.setAttribute("src", 'StreamingAssets/wrongBrowser.jpg');
	img.style.visibility = 'visible';

	document.body.appendChild(img);
	
	//onLoad();
	
	/*try{
		var cnv = document.getElementById("canvas");
		cnv.parentElement.removeChild(cnv);
		//document.removeChild(oldcanv)
	}catch(e){
		//alert(e);
	}
	
	try{
		this.progress.Clear();
	}catch(e){}*/
	
}

var onError = false;
function Errorhandler(err, url, line) {
	if (onError) {
		return true;
	}

	onError = true;
	
	if(isIE){
		WrongBrowser();
		return true;
	}

	var img = document.createElement("img");

	img.onload = function () {
		var w = document.documentElement.clientWidth, h = document.documentElement.clientHeight;
		img.style.position = 'absolute';

		var hOffset = (w / 2 - img.offsetWidth / 2);
		var top = (h - img.offsetHeight) / 2 + window.pageYOffset;
		img.style.left = hOffset + 'px';
		img.style.top = top + 'px';

		var showTitle = function (text) {
			var titleBlock = document.createElement('div');
			var titleNode = document.createTextNode(text);
			titleBlock.appendChild(titleNode);

			titleBlock.style.color = "#a3ad82";
			titleBlock.style.textAlign = "center";
			titleBlock.style.fontWeight = 'bold';
			titleBlock.style.fontSize = "20px";
			titleBlock.style.overflow = 'hidden';

			titleBlock.style.position = img.style.position;
			titleBlock.style.left = hOffset + 120 + 'px';
			titleBlock.style.right = hOffset + 120 + 'px';
			titleBlock.style.top = top + 14 + 'px';
			titleBlock.style.bottom = top + 165 + 'px';

			document.body.appendChild(titleBlock);
		};

		var showInfo = function (text) {
			var infoBlock = document.createElement('div');
			var infoNode = document.createTextNode(text);
			infoBlock.appendChild(infoNode);

			infoBlock.style.color = "#222714";
			infoBlock.style.textAlign = "center";
			infoBlock.style.fontWeight = 'bold';
			infoBlock.style.fontSize = "20px";
			infoBlock.style.overflow = 'hidden';
			//infoBlock.style.verticalAlign = 'middle';

			infoBlock.style.position = img.style.position;
			infoBlock.style.left = hOffset + 10 + 'px';
			infoBlock.style.right = hOffset + 10 + 'px';
			infoBlock.style.top = top + 60 + 'px';
			infoBlock.style.bottom = top + 18 + 'px';

			document.body.appendChild(infoBlock);
		};

		var titleXhr = GetXMLHttpRequest('StreamingAssets/GameAssets/Locale/' + locale + '/warningTitle.txt', 1000);
		titleXhr.onload = function (e) {
			if (titleXhr.status != 200) {
				//alert( titleXhr.status + ': ' + titleXhr.statusText ); // пример вывода: 404: Not Found
				showTitle("Warning");
			} else {
				showTitle(titleXhr.response);
			}
		};
		titleXhr.ontimeout = function (e) {
			showTitle("Warning");
		};
		titleXhr.send();

		var infoXhr = GetXMLHttpRequest('StreamingAssets/GameAssets/Locale/' + locale + '/warningInfo.txt', 1000);
		infoXhr.onload = function (e) {
			if (infoXhr.status != 200) {
				showInfo("An unknown error occurred, please try to restart the browser page.");
			} else {
				showInfo(infoXhr.response);
			}
		};
		infoXhr.ontimeout = function (e) {
			showInfo("An unknown error occurred, please try to restart the browser page.");
		};
		infoXhr.send();

		img.style.visibility = 'visible';
	}

	img.setAttribute("src", 'StreamingAssets/servWinBg.png');
	img.style.visibility = 'hidden';

	document.body.appendChild(img);
	
	alert(err);

	return true;
}

function Compatibilitycheck() {
	//WrongBrowser();
}