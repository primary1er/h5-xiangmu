window.onload = function(){
	$(".page_upload").addClass("active");
	function inputFn(name){
		$(name).bind({ 
			focus:function(){
				if (this.value == this.defaultValue){ 
					this.value="";
					$(this).siblings(".inputBg").css({"display":"none"});
				} 
			},blur:function(){
				if (this.value == ""){ 
					this.value = this.defaultValue; 
					$(this).siblings(".inputBg").css({"display":"block"});
				} 
			} 
		}); 
	}
	inputFn(".inputIn01");
	inputFn(".inputIn02");
	//点击重置按钮之后，input里面展示的文字还是要出现
	$(".btn-res").click(function(){
		$(".inputBg").css({"display":"block"});
	});
}
