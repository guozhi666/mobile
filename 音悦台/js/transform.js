(function(win) {
	win.translateCss = function(node, name, value) {
		//创建对象
		if(!node.obj) {
			node.obj = {};
			console.log('+++++' + node.obj)
		}

		//写
		//根据实参arguments个数判断读写
		if(arguments.length > 2) {
			node.obj[name] = value;

			//保存2d变换输出的结果
			var result = '';

			for(var i in node.obj) {
				switch(i) {
					case 'translateX':
					case 'translateY':
					case 'translate':
					case 'translateZ':
						result += i + '(' + node.obj[i] + 'px)';
						break;
					case 'scaleX':
					case 'scaleY':
					case 'scale':
						result += i + '(' + node.obj[i] + ')';
						break;
					case 'skew':
					case 'skewX':
					case 'skewY':
					case 'rotate':
					case 'rotateX':
					case 'rotateY':
					case 'rotateX':
						result += i + '(' + node.obj[i] + 'deg)';
						break;
				}
			}

			node.style.transform = result;

		} else {
			//读

			if(node.obj[name] == undefined) {
				// 直接读取
				//scale = 1；
				if(name == 'scale' || name == 'scaleX' || name == 'scaleY') {
					value = 1;
				} else {
					value = 0;
				}
			} else {
				//先写，再读
				value = node.obj[name];
			}

			return value;
		};
	};
})(window);