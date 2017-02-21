$(function() {
	$("body").css("display", "block");
	$("body").css("padding-top", $("#head_nav").height());
	$("#congratulation").css("height",$(window).height());
	// 抽奖所需的参数
	var imagesUrl = ["images/money.png","images/money.png","images/smiley_003.png","images/money.png","images/money.png","images/money.png","images/money.png","images/smiley_003.png"],
		images=[],
		fillStyle = ['rgb(109,215,255)', 'rgb(146,225,255)'],
		fillText = ["1金币","1金币","1金币","1金币","1金币","1金币","1金币","谢谢参与"],
		width = Math.floor($(".dial_canvas").width()-8),
		height = Math.floor($(".dial_canvas").width()-8),
		c_x = Math.floor(width/2),
		c_y = Math.floor(width/2),
		radius = Math.floor(width/2), // 圆盘半径
		canvas = document.getElementById('bg'),
		draws,
		my_money,
		index = 0,
		timer = null,
		running = false, // 是否运行中
		speed = 300, // 速度
		isBeginPrize = false, // 是否开始抽奖
		stepping = 0, // 步数，经过一个扇形为1步
		basecircle = 4, // 点击开始时，圆盘旋转的圈数，旋转玩指定圈数之后，再根据selected的值确定奖项
		selected = 0; // 最终选中第几个扇形，也就是确定几等奖
	// 图片对象
	$.each(imagesUrl, function(i,v) {
		var img_i = new Image();
		img_i.src = v;
		images.push(img_i);
	});
	// 绘制
	after();
	document.body.addEventListener('touchmove', function (event) {
		if (!$("#congratulation").is(":hidden")) {
			event.preventDefault();
		}
	}, false);
	/**
	 * 回调成功---------------
	 */
	function after(){
		function setup() {
			drawCircle(false);
		}
		/**
		 * 绘制转盘
		 * @param {Object} isRunning
		 */
		function drawCircle(isRunning) {
			var deg = Math.PI / 4;;
			var startAngle = 0;
			var endAngle = 60;
			canvas.height = height;
			canvas.width = width;
			var ctx = canvas.getContext('2d');
			for(var i = 0; i < 8; i++) {
				ctx.beginPath();
				// 正在运行的时候，改变当前扇形的颜色
				if(isRunning && index == i) {
					ctx.fillStyle = 'rgb(0,176,255)';
				} else {
					if(i % 2 == 0) {
						ctx.fillStyle = fillStyle[0];
					} else {
						ctx.fillStyle = fillStyle[1];
					}
				}
				// 绘制扇形
				ctx.moveTo(c_x, c_y);
				var angle = i * deg;
				ctx.arc(c_x, c_y, radius, angle, angle + deg, false);
				ctx.fill();
				ctx.save();
				// 绘制扇形上的文字
				ctx.font = c_x/11+"px Microsoft YaHei";
				ctx.fillStyle = '#126e90';
				ctx.textAlign = "center";
				if(i == 0){
					ctx.fillText(fillText[i], c_x + Math.cos(angle + deg / 2) * (c_x/1.35), c_x + Math.sin(angle + deg / 2) * (c_x*1.2));
				}else if(i == 1){
					ctx.fillText(fillText[i], c_x + Math.cos(angle + deg / 2) * (c_x/1.35), c_x + Math.sin(angle + deg / 2) * (c_x/1.1));
				}else if(i == 2){
					ctx.fillText(fillText[i], c_x + Math.cos(angle + deg / 2) * (c_x/1.35), c_x + Math.sin(angle + deg / 2) * (c_x/1.1));
				}else if(i == 3){
					ctx.fillText(fillText[i], c_x + Math.cos(angle + deg / 2) * (c_x/1.35), c_x + Math.sin(angle + deg / 2) * (c_x*1.2));
				}else if(i == 4){
					ctx.fillText(fillText[i], c_x + Math.cos(angle + deg / 2) * (c_x/1.35), c_x + Math.sin(angle + deg / 2) * (c_x/5));
				}else if(i == 5){
					ctx.fillText(fillText[i], c_x + Math.cos(angle + deg / 2) * (c_x/1.55), c_x + Math.sin(angle + deg / 2) * (c_x/2));
				}else if(i == 6){
					ctx.fillText(fillText[i], c_x + Math.cos(angle + deg / 2) * (c_x/1.8), c_x + Math.sin(angle + deg / 2) * (c_x/2));
				}else if(i == 7){
					ctx.fillText(fillText[i], c_x + Math.cos(angle + deg / 2) * (c_x/1.5), c_x + Math.sin(angle + deg / 2) * (c_x/6));
				}
				
				startAngle += 60;
				endAngle += 60;
			}
			// 图片
			$.each(images, function(i,v) {
				var angle = i * deg;
				if (i == 0) {
					var pw = c_x + Math.cos(angle + deg / 2) * (c_x/1.8);
					var ph = c_x + Math.sin(angle + deg / 2) * (c_x/5.4);
					v.onload = function(){
						ctx.drawImage(v, pw, ph,c_x/3,c_x/3);
					}
					ctx.drawImage(v, pw, ph,c_x/3,c_x/3);

				}else if(i == 1){
					var pw = c_x + Math.cos(angle + deg / 2) * (c_x/5.6);
					var ph = c_x + Math.sin(angle + deg / 2) * (c_x/2);
					v.onload = function(){
						ctx.drawImage(v, pw, ph,c_x/2.6,c_x/4);
					}
					ctx.drawImage(v, pw, ph,c_x/2.6,c_x/4);
				}else if(i == 2){
					var pw = c_x + Math.cos(angle + deg / 2) * (c_x);
					var ph = c_x + Math.sin(angle + deg / 2) * (c_x/2.2);
					v.onload = function(){
						ctx.drawImage(v, pw, ph,c_x/3,c_x/3);
					}
					ctx.drawImage(v, pw, ph,c_x/3,c_x/3);
				}else if(i == 3){
					var pw = c_x + Math.cos(angle + deg / 2) * (c_x/1.04);
					var ph = c_x + Math.sin(angle + deg / 2) * (c_x/8);
					v.onload = function(){
						ctx.drawImage(v, pw, ph,c_x/2.2,c_x/3);
					}
					ctx.drawImage(v, pw, ph,c_x/2.2,c_x/3);
				}else if(i == 4){
					var pw = c_x + Math.cos(angle + deg / 2) * (c_x/1.1);
					var ph = c_x + Math.sin(angle + deg / 2) * (c_x*1.3);
					v.onload = function(){
						ctx.drawImage(v, pw, ph,c_x/3,c_x/3);
					}
					ctx.drawImage(v, pw, ph,c_x/3,c_x/3);
				}else if(i == 5){
					var pw = c_x + Math.cos(angle + deg / 2) * (c_x*1.08);
					var ph = c_x + Math.sin(angle + deg / 2) * (c_x/1.05);
					v.onload = function(){
						ctx.drawImage(v, pw, ph,c_x/2.5,c_x/3);
					}
					ctx.drawImage(v, pw, ph,c_x/2.5,c_x/3);
				}else if(i == 6){
					var pw = c_x + Math.cos(angle + deg / 2) * (c_x/3);
					var ph = c_x + Math.sin(angle + deg / 2) * (c_x/1.05);
					v.onload = function(){
						ctx.drawImage(v, pw, ph,c_x/3,c_x/3);
					}
					ctx.drawImage(v, pw, ph,c_x/3,c_x/3);
				}else if(i == 7){
					var pw = c_x + Math.cos(angle + deg / 2) * (c_x/2);
					var ph = c_x + Math.sin(angle + deg / 2) * (c_x*1.2);
					v.onload = function(){
						ctx.drawImage(v, pw, ph,c_x/3.4,c_x/3.4);
					}
					ctx.drawImage(v, pw, ph,c_x/3.4,c_x/3.4);
				}
			});
			ctx.closePath();
		}
		/**
		 * 转盘旋转
		 */
		function rotate() {
			running = true;
			if(stepping == 4) { // 4步之后开始加速
				clearTimer();
				speed = +100;
				timer = setInterval(rotate, speed);
			}
			if(basecircle > 0 && index == 8) { // 基本圈数借宿以后，开始随机抽奖
				index = 0;
				basecircle--;
				if(basecircle == 0) {
					clearTimer();
					speed = 300;
					timer = setInterval(rotate, speed);
					isBeginPrize = true;
				}
			}
			if(isBeginPrize && selected >= 0) {
				if (selected == 0) {
					if(--selected == -1) {
						clearTimer();
						isStop = true;
						window.setTimeout(function(){
							$("#congratulation").show();
							$("#congratulation").css("height",$(window).height()*2);
							if(draws != "谢谢参与"){
								$(".lation_money").text(draws);
								$(".lation_tip").text("你获得了一个再来一次~");
							}else{
								$(".lation_bt").text("很抱歉");
								$(".lation_money").text("谢谢参与");
								$(".lation_tip").text("不要灰心再来一次吧~");
							}
							$("#congratulation").click(function(e){
								e.stopPropagation();
								$(this).hide();
								running = false;
								setup();
								selected=0; // 指定选项
								$("#gostart").off("click");
								$("#gostart").on("click", mouseDown_Start);
							})
						},500)
					} else {
						clearTimer();
						speed += 100;
						timer = setInterval(rotate, speed);
					}
				} else{
					if(--selected == 0) {
						clearTimer();
						isStop = true;
						window.setTimeout(function(){
							$("#congratulation").show();
							$("#congratulation").css("height",$(window).height()*2);
							if(draws != "谢谢参与"){
								$(".lation_money").text(draws);
								$(".lation_tip").text("已加进您的账户，注意查收哦~");
							}else{
								$(".lation_bt").text("很抱歉");
								$(".lation_money").text("谢谢参与");
								$(".lation_tip").text("不要灰心再来一次吧~");
							}
							$("#congratulation").click(function(e){
								e.stopPropagation();
								$(this).hide();
								setup();
								$("#gostart").off("click");
								$("#gostart").on("click", mouseDown_Start);
							})
						},500)
					} else {
						clearTimer();
						speed += 100;
						timer = setInterval(rotate, speed);
					}
				}
			}
			drawCircle(true);
			index++;
			stepping++;
		}
	
		// 初始化抽奖参数
		function init() {
			basecircle = 4;
			running = false;
			isBeginPrize = false;
			index = index++;
			stepping = 0;
			speed = 300;
		}
		/**
		 * 开始抽奖
		 * @param {Object} e
		 */
		function mouseDown_Start(e) {
			e.preventDefault();
			var local = getPointOnCanvas(canvas, e.pageX, e.pageY);
			if(local.x > 100  && local.y > 100 ) {
				if(running) {
					return;
				}
				init();
				clearTimer();
				timer = setInterval(rotate, speed);
			}
			$("#gostart").off("click");
		}
		/**
		 * 清除定时器
		 */
		function clearTimer() {
			clearInterval(timer);
			timer = null;
		}
		/**
		 * 获取canvas坐标
		 * @param {Object} canvas
		 * @param {Object} x
		 * @param {Object} y
		 */
		function getPointOnCanvas(canvas, x, y) {
			var bbox = canvas.getBoundingClientRect();
			return {
				x: x - bbox.left * (canvas.width / bbox.width),
				y: y - bbox.top * (canvas.height / bbox.height)
			};
		}
		setup();
		$("#gostart").on("click", mouseDown_Start);
	}
})



