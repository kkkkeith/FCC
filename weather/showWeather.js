$(document).ready(function () {
      function getTime () {
            var date = new Date();
            var nowTime = date.toLocaleString();
            return nowTime;
      }
      setInterval(function () {
            $('span').html(getTime)
      },1000); 
	$('button').click(function ( ) {
		var name = encodeURI($('input').val());
		//解决跨域问题,直接得到js对象(https解决混合内容页面)
		$.getJSON('https://v.juhe.cn/weather/index?type=jsonp&format=2&cityname='+name+'&key=853b9cc74bf35afd44b12b7486951c2a&callback=?', function (data,state) {
		      var sk = data.result.sk; 
                  var today = data.result.today; 
                  var future = data.result.future;
                  var arr = [];
                  var arrToday = [];
                  var arrFuture = [];
                  for (var x in sk) {
            	     arr.push(sk[x]);
                  }
                  for (var x in today) {
                        arrToday.push(today[x]);
                  }
                  arrToday.splice(2,1);
                  for (var i = 0; i < future.length; i++) {
                        for (var j in future[i]) {
                              arrFuture.push(future[i][j]);
                        }
                  }
                  for (var n = 2; n < arrFuture.length; n += 5) {
                        arrFuture.splice(n,1);
                  }
                  for (var i = 0; i < arr.length; i++) {
            	     //注意i的位置,要这样遍历
            	     $('table:eq(1) tr:eq('+i+') td:eq(1)').text(arr[i]);
                  }

                  for (var i = 0; i < arrToday.length; i++) {
                        $('table:eq(0) tr:eq('+i+') td:eq(1)').text(arrToday[i]);
                  }
                  for (var i = 0; i < arrFuture.length; i++) {
                        $('table:eq(2) tr:eq('+i+') td:eq(1)').text(arrFuture[i]);
                  }
                  for (var index = 0; index < arrFuture.length; index = index + 5) {
                       $('table:eq(2) tr:eq('+index+')').css('color','#03c');
                  }

                  
	    });
	});
});
