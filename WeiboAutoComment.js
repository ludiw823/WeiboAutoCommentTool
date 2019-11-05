var weiboAutoCommentTool = (function(){
	//评论内容list
	//const contentList = ['#王晰个人巡回演唱会2019#','#王晰新歌#','#王晰 come to me# wherever you maybe','#王晰谈婚姻中的安全感#','#王晰我们恋爱吧#','#王晰海藻头# [心]', '今天也是爱晰晰的一天[羞答答]','晰晰加油！[给你小心心]','#王晰摇滚小毛驴#'];
	const contentList = ['#心之所安即为家#家，是抵御凛冽世间的铠甲，也是温柔包裹你我的堤坝，为知付出、奋斗的笑与泪，都将在点滴的时光盈满，家是我们对抗世界的砝码，也是我们的脊梁。职场上若铁铿锵、如火红烈的我们，可以在家变回乖柔的泉，和家人，互相滋养。家，你我共美好，心之所安，心安之所。','#心之所安即为家#对我而言，家不仅仅是温馨的港湾，也是如@王晰 先生所言的，是对抗世界的砝码。沉甸甸地压在心头让我心安，也有底气和脊梁。花花世界的漏夜霓光，不如家门屋檐下小灯撒下的橘暖金辉。有家有归属，我必强大@施耐德电气中国','#心之所安即为家#家是脚踏实地的往前走的有力护盾，在外打拼日积月累下的收获，都是堆砌家幸福的砖瓦，家，是人民所拥有的最大财富，照亮你我我行进的路','#心之所安即为家#虽然如今渐行渐远，但吃一口家的味道，你会发现有些情感根本不会因时间距离而淡漠，或许家长里短的烟火气才最能解释“家人闲坐，灯火可亲”吧！','#心之所安即为家#家让爱成为一种无私的奉献，而家人们的爱汇在一起，才能让家庭成为一种呵护。'];
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