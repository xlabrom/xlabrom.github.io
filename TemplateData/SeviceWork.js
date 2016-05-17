var dom = document.getElementById("canvas");

var background = document.createElement("div");
background.style.background = "#a9bb8e";
background.style.position = "absolute";
dom.parentNode.appendChild(background);
this.background = background;
background.style.display = "inline";
background.style.top = dom.offsetTop + 'px';
background.style.left = dom.offsetLeft + 'px';
background.style.width = dom.offsetWidth + 'px';
background.style.height = dom.offsetHeight + 'px';

var companyImage = document.createElement("img");
companyImage.src = "TemplateData/wait.png";
companyImage.style.position = "absolute";
dom.parentNode.appendChild(companyImage);
this.companyImage = companyImage;
companyImage.style.width = 198 + 'px';
companyImage.style.height = 151 + 'px';
companyImage.style.display = "inline";
var leftPos = dom.offsetLeft + (dom.offsetWidth * 0.5);
var topPos = dom.offsetTop + (dom.offsetHeight * 0.5);
companyImage.style.left = leftPos - companyImage.width/2 + 'px';
companyImage.style.top = topPos - companyImage.height + 'px';
companyImage.style.display = "inline";

/*var trimRight = function(src, charlist) {
	//if (charlist === undefined) charlist = "\s";
	
	src = src.replace(new RegExp("[" + document.location.hash + "]+$"), "");
	src = src.replace(new RegExp("[" + document.location.search + "]+$"), "");
	
	return src.replace(new RegExp("[" + charlist + "]+$"), "");
};
var srv = trimRight(document.location.href, "/index.html");*/

var infoPath = 'StreamingAssets/GameAssets/Locale/' + locale + '/serviceWorks.txt';
console.log(infoPath);

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

	infoBlock.style.position = "absolute";
	infoBlock.style.left = leftPos - 300 + 'px';
	infoBlock.style.right = leftPos - 300 + 'px';
	infoBlock.style.top = topPos + 10 + 'px';
	infoBlock.style.bottom = 0 + 'px';

	dom.parentNode.appendChild(infoBlock);
};

var infoXhr = GetXMLHttpRequest(infoPath, 1000);
infoXhr.onload = function (e) {
	//alert("status "+infoXhr.status + ' \n statusText ' + infoXhr.statusText + ' \n responseText ' + infoXhr.responseText);
	if (infoXhr.status != 200) {
		showInfo("The server is undergoing maintenance. Perhaps comes game update, or correction of errors found. For details, go to the official community.");
	} else {
		showInfo(infoXhr.response);
	}
};
infoXhr.ontimeout = function (e) {
	showInfo("An unknown error occurred, please try to restart the browser page.");
};
infoXhr.send();