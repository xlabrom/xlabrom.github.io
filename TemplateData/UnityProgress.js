


function UnityProgress(dom) {
    
	if(CustomLoader.current == null){
		CustomLoader.current=new CustomLoader(dom);
	}
	
	this.SetProgress = function (progress) {
        CustomLoader.current.SetProgress(progress);
    }
	
	this.SetMessage = function (message) {
        CustomLoader.current.SetMessage(message);
    }
	
	this.Clear = function () {
        CustomLoader.current.Clear();
    }
	
	this.Update = function () {
        CustomLoader.current.Update();
    }
}