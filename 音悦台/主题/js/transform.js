(function(win){
	
	win.transformCss = function (node,name,value){
			//1.创建对象，保存名值对
//			var obj = {};
			//检测node 上边到底有没有obj这个属性，如果没有，添加一个obj
			if(!node.obj){
				node.obj = {};
//				console.log('++++'+node.obj)
			};
			
			//写
			//根据 实参arguments 个数  》 2
			if(arguments.length > 2){
				//把名值对添加对象中 node.obj
				node.obj[name] = value;
				
				//保存2d变换输出的结果
				var result = '';
				
				//那取对象中属性名 （枚举）
				for(var i in node.obj){
					switch (i){
						case 'translateX':
						case 'translateY':
						case 'translate':
						case 'translateZ': //translateX(200px)
							result += i+'('+ node.obj[i] +'px) ';
							break;
						case 'scaleX':
						case 'scaleY':
						case 'scale': //scale(0.5)
							result += i+'('+ node.obj[i] +') ';
							break;
						case 'rotate':
						case 'rotateX':
						case 'rotateY':
						case 'rotateZ':
						case 'skew':
						case 'skewX':
						case 'skewY':
							result += i+'('+ node.obj[i] +'deg) ';
							break;	
					}
				}
				
				node.style.transform = result;
				
			}else{
				//读				
				
				if(node.obj[name] == undefined){
					//1.直接读取 （默认值）
					//scale = 1
					if(name == 'scale' || name == 'scaleX' || name == 'scaleY'){
						value = 1;
					}else{
						//translate , rotate ,skew = 0
						value = 0;
					}
										
				}else{
					//2.写-- 读取
					value = node.obj[name];
				}
				
				return value;
				
			};
			
			
		};
		
	
})(window);
