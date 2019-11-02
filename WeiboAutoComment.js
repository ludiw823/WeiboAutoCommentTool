var weiboAutoCommentTool = (function(){
	//评论内容list
	const contentList = ['#王晰个人巡回演唱会2019#','#王晰新歌#'];
	var running = false;
	var defaultOption = {
		//评论间隔时间
		delay: 10000,
		//评论内容
		content: '从列表中随机抽取',
        //每轮评论个数
        count: 3,
        //需要评论的微博post的id，默认是10月30日ctm的post
        id: 4434013407876189,
        //每轮评论间隔,默认为2分钟
        interval: 2*60*1000,
        //评论总轮数,默认为3轮
        outCount: 3
	};
	var needCommentIdList = [];
	var commentedIdList = [];
	var dateFormat = function (fmt,date){ 
		var o = {   
			"M+" : date.getMonth()+1,                 //月份   
			"d+" : date.getDate(),                    //日   
			"h+" : date.getHours(),                   //小时   
			"m+" : date.getMinutes(),                 //分   
			"s+" : date.getSeconds(),                 //秒   
			"q+" : Math.floor((date.getMonth()+3)/3), //季度   
			"S"  : date.getMilliseconds()             //毫秒   
		};   
		if(/(y+)/.test(fmt))   
			fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
		for(var k in o)   
			if(new RegExp("("+ k +")").test(fmt))   
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
		return fmt;   
	} 
	var logger = function(msg){
		console.log(dateFormat('yyyy-MM-dd hh:mm:ss', new Date()) + ": " + msg);
	};
	var comment = function(id){
		console.log("----------------------------------------->");
		logger("Commenting " + id);
		var feedItem = document.querySelector('div[mid="' + id + '"]');
		var commentButton = feedItem.querySelector('a[action-type="fl_comment"]');
		//没有打开的话，模拟点击打开
		if(commentButton.parentNode.className != "curr") {
			commentButton.click();
			logger("Comment list is not loaded, start loading...");
		}
		logger("Waiting comment list loading...");
		//等待评论框出现
		setTimeout(function(){
            var textArea = feedItem.querySelector('.W_input');
            let commentContent = contentList[Math.floor(contentList.length*Math.random())];
			textArea.value = commentContent;
			//console.log(commentContent);
			var sendButton = feedItem.querySelector('.W_btn_a');
			sendButton.click();
			logger("Sending comment content completed.");
			
			//折叠起来
			commentButton.click();
			commentedIdList.push(dateFormat('yyyy-MM-dd hh:mm:ss', new Date()) + ' : '+ commentContent);
			console.log("<-----------------------------------------");
		}, 3000);
	};
	var commentThread = function(id){
		logger("Comment thread started.");
		let count = 0;
		var innerAction = function(){
			//var id = needCommentIdList.shift();
			if(id) {
				comment(id);
			} else {
				logger("WARNING: No feed to process...");
            }
            
			setTimeout(function(){
                //评论27次后自动停止
				if(!running || count >= defaultOption.count) {
					logger("Comment thread action stoped, exit.");
					return;
				}
                innerAction();
                count ++;
			}, defaultOption.delay);
		};
		innerAction();
	};

	this.start = async function(op){
		needCommentIdList = [];
		commentedIdList = [];
		logger("WeiboAutoCommentTool start running...");
		if(typeof(op) !== "undefined") {
			defaultOption.delay = op.delay || defaultOption.delay;
			defaultOption.content = op.content || defaultOption.content;
            defaultOption.id = op.id || defaultOption.id;
            defaultOption.count = op.count || defaultOption.count;
            defaultOption.interval = op.interval || defaultOption.interval;
            defaultOption.outCount = op.outCount || defaultOption.outCount;

			logger("Use option: " + JSON.stringify(defaultOption));
		} else {
			logger("Use default option: " + JSON.stringify(defaultOption));
		}
		
        logger("WeiboAutoCommentTool running now.");
        //每10min循环一次，循环20次
        running = true;
        let outCount = defaultOption.outCount;
        var repeatAction = function(){
			if(running) {
				commentThread(defaultOption.id);
			} else {
				logger("WARNING: exsiting!!");
            }
            
			setTimeout(function(){
                //评论27次后自动停止
				if(!running || outCount<=0) {
                    running = false;
					logger("Finish comment, exit.");
					return;
				}
                repeatAction();
                outCount --;
            }, defaultOption.interval);
		};
        repeatAction();
        
		//running = true;
        //commentThread(defaultOption.id);
	};	
	this.stop = function(){
		running = false;
		needCommentIdList = [];
		logger("User stoped");
    };	
    //统计method待更新
	// this.stat = function(){
	// 	logger("Commented list: ");
	// 	console.log(commentedIdList);
	// 	logger("Total commented " + commentedIdList.length);
	// };	
	return this;
})();