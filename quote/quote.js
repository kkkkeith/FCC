$(document).ready(function () {
    var content = $('#content');
    var author = $('#author');
    var text = $('#text');
    var qAuthor,qContent;
    var newQuote = $('#newQuote');
    var qq = $('.square:eq(0)');
    var weibo = $('.square:eq(1)');
    var left = $('.fa-quote-left:eq(0)');
    function col () {
        return  "#" + (function (color) {
            return (color +=  "0123456789abcdef"[Math.floor(Math.random()*16)])
            && (color.length == 6) ?  color : arguments.callee(color);
         })("");
    }
	$('button').click(function () {
		var noCache = Date();
		$.getJSON('https://sslapi.hitokoto.cn/?encode=json', {"noCache":noCache}, function (data) {
		//$.getJSON('https://sslapi.hitokoto.cn/?encode=json', function (data) {
			qContent = data.hitokoto;
                    	qAuthor = data.from; 
                	author.html("—— " + qAuthor);
                	content.html(qContent);
            		var color = col();
            		$('body').css('backgroundColor', color);
            		newQuote.css('backgroundColor', color);
            		qq.css('backgroundColor', color);
           		 weibo.css('backgroundColor', color);
            		left.css({'left':'0','color':color});
           		 text.css('color', color);
		});
	});
	function qqShare(content, author) {    
        var shareqqzonestring = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary='+content+author;  
        window.open(shareqqzonestring,'newwindow','height=400,width=400,top=100,left=100');
    }
    function weiboShare(content, author) {
        var sharesinastring = 'http://v.t.sina.com.cn/share/share.php?title='+content+author;  
        window.open(sharesinastring,'newwindow','height=400,width=400,top=100,left=100'); 
    }
	qq.click(function () {
        var getContent = content.html();
        var getAuthor = author.html();
        qqShare(getContent, getAuthor);
    });
    weibo.click(function () {
        var getContent = content.html();
        var getAuthor = author.html();
        weiboShare(getContent, getAuthor);
    });
});
