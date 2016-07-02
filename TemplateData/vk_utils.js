//alert("vk_utils");
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
			//alert("init: " + frameHref);
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

function WallPostRank(rankId, userId, textMsg, appLink) {
	var ranks = [
		423054174,423054264,423054284,423054304,423054316,423054328,423054336,423054346,423054375,423054398,423054418,423054430,423054451,423054456,423054467,423054479,423054503,423054511,423056491
	];
	
	var url = "photo-119588908_423055013";
	if (rankId < ranks.length){
		url = "photo-119588908_" + ranks[rankId];
	}
	
	VK.api('wall.post', {
		owner_id : userId,
		attachments : url+","+appLink,
		message : textMsg + "\n" + appLink + "\n #polygon #полигон",
		test_mode: testMode
	}, function (postResult) {
		//alert(JSON.stringify(postResult));
		SendMessage("GameManager", "WallPostResult", postResult.error == null ? postResult.response.post_id : "");
	});
	
}

function WallPostMedal(medalId, userId, textMsg, appLink) {
	var medals = [
		424497197,424497199,424497200,424497205
	];
	
	var url = "photo-119588908_423055013";
	if (medalId < medals.length){
		url = "photo-119588908_" + medals[medalId];
	}
	
	VK.api('wall.post', {
		owner_id : userId,
		attachments : url+","+appLink,
		message : textMsg + "\n" + appLink + "\n #polygon #полигон",
		test_mode: testMode
	}, function (postResult) {
		//alert(JSON.stringify(postResult));
		SendMessage("GameManager", "WallPostResult", postResult.error == null ? postResult.response.post_id : "");
	});
	
}

function WallPostAward(awardId, userId, textMsg, appLink) {
	var awards = [
		423055011,423055013
	];
	
	var url = "photo-119588908_423055013";
	if (awardId < awards.length){
		url = "photo-119588908_" + awards[awardId];
	}
	
	VK.api('wall.post', {
		owner_id : userId,
		attachments : url+","+appLink,
		message : textMsg + "\n" + appLink + "\n #polygon #полигон",
		test_mode: testMode
	}, function (postResult) {
		//alert(JSON.stringify(postResult));
		SendMessage("GameManager", "WallPostResult", postResult.error == null ? postResult.response.post_id : "");
	});
	
}

function WallPostSeason(userId, textMsg, appLink) {
	var url = "photo-119588908_423237342";
	
	VK.api('wall.post', {
		owner_id : userId,
		attachments : url+","+appLink,
		message : textMsg + "\n" + appLink + "\n #polygon #полигон",
		test_mode: testMode
	}, function (postResult) {
		//alert(JSON.stringify(postResult));
		SendMessage("GameManager", "WallPostResult", postResult.error == null ? postResult.response.post_id : "");
	});
	
}