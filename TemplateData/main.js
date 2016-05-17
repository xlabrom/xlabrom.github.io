var servers = ["poligonserv1.gamenasia.net", "poligonserv1.gamenasia.net"];
var canvasId = "canvas";
var frameHref = "";
var frameReferrer = "";
var testMode = 1;

VK.init(
	function () {
		//VK.addCallback('OnWindowBlur', function(settings) { u.getUnity().style.visibility = 'hiden'; });
		//VK.addCallback('OnWindowFocus', function(settings) { u.getUnity().style.visibility = 'visible'; });
		
		VK.addCallback('onOrderSuccess', function (order_id) {
			SendMessage("GameManager", "OnPurchase", 0);
		});
		VK.addCallback('onOrderFail', function () {
			SendMessage("GameManager", "OnPurchase", 1);
		});
		VK.addCallback('onOrderCancel', function () {
			SendMessage("GameManager", "OnPurchase", 2);
		});

		try {
			var randomServer = servers[Math.floor(Math.random() * servers.length)];
			frameHref = document.location.href + "&gameServers=" + randomServer;
			frameReferrer = document.referrer;
		} catch (err) {

		}

		/*document.onkeydown = function (evt) {
			evt = evt || window.event;
			if (evt.keyCode == 27) {
				//alert('Esc key pressed.');
				LoadFriends("online,photo_200_orig,sex,is_friend,can_send_friend_request", "", 1, 6);
			}
		};*/
	},
	function () {
		// API initialization failed
		//alert('VK API Loading Error!');
	},
'5.23');

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

function GetParams() {
	SendMessage("GameManager", "OnGetHrefString", frameHref);
	SendMessage("GameManager", "OnGetReferrer", frameReferrer);
}

function GetScrollParams() {
	SendMessage("GameManager", "GetScrollParams", "0.1|5|0.135");
}

function GetDayAwards() {
	SendMessage("GameManager", "GetDayAwards", "10|10|10|10|50");
}

function ShowPurchaseBox(itemName) {
	var params = {
		type: 'item',
		item: itemName
	};
	VK.callMethod('showOrderBox', params);
}

function GetEnemyInfo(options, users, extraData) {
	// { user_ids: "1,2" }
	VK.api("users.get", { user_ids: users, fields: options, test_mode: testMode }, function (data) {
		SendMessage("GameManager", "PrepareGetEnemyInfo", extraData);
		SendMessage("GameManager", "GetEnemyInfo", JSON.stringify(data));
	});
}

function OpenNewTab(url) {
	var newwindow = window.open(url, '_blank');
	if (newwindow != null) {
		newwindow.focus();
	} else {
		//SendMessage("GameManager", "OpenUrlError", "");
		OpenInNewTab1(url);
	}
}

function OpenInNewTab1(url) {
	var link = document.getElementById(canvasId);
	var val = 1;
	link.onmouseup = function () {
		if (val == 1) {
			var newwindow = window.open(url, '_blank');
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

function InviteInApp(users) {
	VK.callMethod('showInviteBox');
}

function LoadFriends(options, userId, offset, count) {
	count = 100;
	//console.log("LoadFriends " + offset + " / " + count);

	/*VK.api("friends.get", { user_id: userId, fields: options, offset: offset, count: count, test_mode: testMode }, function (data) {
		if (data.response != null) {
			if (data.response.items != null && data.response.items.length > 0) {
				friends.response = data.response.items;
				//setTimeout(function() { CheckInAppFriends(offset, count) }, 100);
				CheckInAppFriends(offset, count);
				return;
			}
		}
	});*/

	var code =
	//'var friends=API.friends.get({"user_id":"'+userId+'","fields":"'+options+'","test_mode":"'+testMode+'"});'+
	'var friends=API.friends.get({"user_id":"' + userId + '","test_mode":"' + testMode + '"}).items;' +
	'var inAppFriends=API.friends.getAppUsers({"test_mode":"' + testMode + '"});' +
	'var friendsLen = friends.length;' +
	'var inAppLen = inAppFriends.length;' +
	'var result=API.users.get({"user_ids":inAppFriends+friends,"fields":"' + options + '","test_mode":"' + testMode + '"});' +
	'return {"result": result.slice(' + offset + ', ' + (offset + count) + '), "inAppLen": inAppLen};';

	VK.api("execute", { code: code, test_mode: testMode }, function (data) {
		var info = new Object();
		info.response = data.response.result;
		info.inAppLen = data.response.inAppLen;
		info.offset = offset;
		info.count = count;
		//console.log(JSON.stringify(info));
		SendMessage("GameManager", "GetFriendsInfo", JSON.stringify(info));
	});
}

/*function CheckInAppFriends(offset, count) {
	if (friends.response.length > 0) {
		VK.api("friends.getAppUsers", { test_mode: testMode }, function (data) {
			if (data.response != null && data.response.length > 0) {
				var inAppFriend = data.response;
				for (var i = 0; i < friends.response.length; i++) {
					var user = friends.response[i];
					var indx = inAppFriend.indexOf(user.id);
					if (indx >= 0) {
						user.inApp = 1;
					} else {
						user.inApp = 0;
					}
				}
				//alert(JSON.stringify(friends));

				friends.offset = offset;
				friends.count = count;

				//

				SendMessage("GameManager", "GetFriendsInfo", JSON.stringify(friends));
				
				friends = null;
				return;
			}
		});
	}

}*/

function DebugAlert(err) {
	alert(err);
}

function ShowError(err) {
	alert(err);
}

var onError = false;
function Errorhandler(err, url, line) {
	if (onError) {
		return true;
	}

	onError = true;

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

	return true;
}

function Compatibilitycheck() {
	
}