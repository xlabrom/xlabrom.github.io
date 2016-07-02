// Instance method will be available to all instances but only load once in memory 
CustomLoader.prototype.publicMethod = function () {    
  alert(this.publicVariable);
};

// Static variable shared by all instances
CustomLoader.current = null;

function CustomLoader(dom) {
	
	this.progress = 0.0;
    this.message = "";
    this.dom = dom;
	this.bullets = null;
	this.bullets1 = null;
	var SetImagesPositions = null;
	var Update = null;
	var loadingImageCount = 0;
	
	//alert("onload before: " + this.dom + " / " + this.message + " / " + this.progress + " / " + loadingImageCount);

    var parent = dom.parentNode;

    var background = document.createElement("div");
    background.style.background = "#a9bb8e";
    background.style.position = "absolute";
    parent.appendChild(background);
    this.background = background;
	background.style.display = "inline";
	background.style.top = dom.offsetTop + 'px';
	background.style.left = dom.offsetLeft + 'px';
	background.style.width = dom.offsetWidth + 'px';
	background.style.height = dom.offsetHeight + 'px';

    var logoImage = document.createElement("img");
	//alert("onload before0: " + loadingImageCount);
	loadingImageCount++;
	//alert("onload before1: " + loadingImageCount);
	logoImage.onload = function (){
		//alert("onload before2: " + loadingImageCount);
		loadingImageCount--;
		if(loadingImageCount<=0){
			if(SetImagesPositions != null){
				SetImagesPositions();
			}
			if(Update != null){
				Update();
			}
		}
		//alert("onload: " + loadingImageCount+" / "+SetImagesPositions);
	};
    logoImage.src = "TemplateData/soldier.png";
    logoImage.style.position = "absolute";
    parent.appendChild(logoImage);
    this.logoImage = logoImage;
	logoImage.style.width = 127 + 'px';
    logoImage.style.height = 143 + 'px';
	logoImage.style.display = "inline";

    var companyImage = document.createElement("img");
	loadingImageCount++;
	companyImage.onload = function (){
		loadingImageCount--;
		if(loadingImageCount<=0){
			if(SetImagesPositions != null){
				SetImagesPositions();
			}
			if(Update != null){
				Update();
			}
		}
	};
    companyImage.src = "TemplateData/logo.png";
    companyImage.style.position = "absolute";
    parent.appendChild(companyImage);
    this.companyImage = companyImage;
	companyImage.style.width = 368 + 'px';
    companyImage.style.height = 17 + 'px';
	companyImage.style.display = "inline";
	
    var bullets = new Array(18);
    for (var i = 0; i < bullets.length; i++) {
        var bullet = document.createElement("img");
		loadingImageCount++;
		bullet.onload = function (){
			loadingImageCount--;
			if(loadingImageCount<=0){
				if(SetImagesPositions != null){
					SetImagesPositions();
				}
				if(Update != null){
					Update();
				}
			}
		};
        bullet.src = "TemplateData/emptyBullet.png";
        bullet.style.position = "absolute";
        parent.appendChild(bullet);
		bullet.style.width = 16 + 'px';
        bullet.style.height = 64 + 'px';
		bullet.style.display = "inline";
        bullets[i] = bullet;
    }
    this.bullets = bullets;

    var bullets1 = new Array(bullets.length);
    for (var i = 0; i < bullets.length; i++) {
        var bullet = document.createElement("img");
		loadingImageCount++;
		bullet.onload = function (){
			loadingImageCount--;
			if(loadingImageCount<=0){
				if(SetImagesPositions != null){
					SetImagesPositions();
				}
				if(Update != null){
					Update();
				}
			}
		};
        bullet.src = "TemplateData/fullBullet.png";
        bullet.style.position = "absolute";
        parent.appendChild(bullet);
		bullet.style.width = 16 + 'px';
        bullet.style.height = 64 + 'px';
		bullet.style.display = "inline";
        bullets1[i] = bullet;
    }
    this.bullets1 = bullets1;

    var messageArea = document.createElement("p");
    messageArea.style.position = "absolute";
    parent.appendChild(messageArea);
    this.messageArea = messageArea;
	messageArea.style.left = 0;
	messageArea.style.width = '100%';
	messageArea.style.textAlign = 'center';
	messageArea.style.display = "inline";

    this.SetProgress = function (progress) {
        if (this.progress < progress)
            this.progress = progress;
        //this.messageArea.style.display = "none";
        this.Update();
    }

    this.SetMessage = function (message) {
        this.message = message;
		this.messageArea.innerHTML = this.message;
		
        /*this.background.style.display = "inline";
        this.logoImage.style.display = "inline";
        for (var i = 0; i < bullets.length; i++) {
            var bullet = this.bullets[i];
            bullet.style.display = "inline";
        }
        for (var i = 0; i < bullets1.length; i++) {
            var bullet = this.bullets1[i];
            bullet.style.display = "inline";
        }*/
        
		//this.Update();
    }

    this.Clear = function () {
        this.background.style.display = "none";
        this.logoImage.style.display = "none";
		this.companyImage.style.display = "none";
        for (var i = 0; i < bullets.length; i++) {
            var bullet = this.bullets[i];
            bullet.style.display = "none";
        }
        for (var i = 0; i < bullets1.length; i++) {
            var bullet = this.bullets1[i];
            bullet.style.display = "none";
        }
    }
	
	SetImagesPositions = this.SetImagesPositions = function () {
		if(this.bullets1 == null){
			return;
		}
		this.interval = this.bullets[0].width + 5;
		this.leftPos = dom.offsetLeft + (dom.offsetWidth * 0.5 - this.interval * bullets.length + logoImage.width);
		this.topPos = dom.offsetTop + (dom.offsetHeight * 0.5 - logoImage.height * 0.5);
		logoImage.style.top = this.topPos + 'px';
		logoImage.style.left = this.leftPos + 'px';

		this.leftPos += logoImage.width - 25;
		this.topPos += logoImage.height * 0.5 - this.bullets[0].height * 0.5;
		
		companyImage.style.top = this.topPos + this.bullets[0].height + 5 + 'px';
		companyImage.style.left = this.leftPos + this.interval * bullets.length - companyImage.width - 5 + 'px';
		
		this.messageArea.style.top = this.topPos + this.bullets[0].height + 25 + 'px';
	}
	
	this.SetImagesPositions();

    Update = this.Update = function () {
        if(this.bullets1 == null){
			return;
		}
		
		this.SetImagesPositions();

        for (var i = 0; i < bullets.length; i++) {
            var bullet = this.bullets[i];
            bullet.style.top = this.topPos + 'px';
            bullet.style.left = this.leftPos + this.interval * i + 'px';
        }

        var full = bullets1.length * Math.min(this.progress, 1);
        for (var i = 0; i < bullets1.length; i++) {
            var bullet = this.bullets1[i];
            if (i < full) {
                //bullet.style.display = "inline";
                bullet.style.opacity = "1.0";
            } else if (i - full < 1) {
                //bullet.style.display = "inline";
                bullet.style.opacity = 1 - (i - full);
            } else {
                //bullet.style.display = "none";
                bullet.style.opacity = "0.0";
            }
            bullet.style.top = this.topPos + 'px';
            bullet.style.left = this.leftPos + this.interval * i + 'px';
        }

        
    }
	
}