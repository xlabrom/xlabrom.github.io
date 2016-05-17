var locale = "ru_ru";

function GetXMLHttpRequest(path, timeout) {
    var infoXhr = new XMLHttpRequest();
	infoXhr.timeout = timeout;
	infoXhr.open('GET', path);
	return infoXhr;
}