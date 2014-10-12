/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * <spacanowski> wrote this file. As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return SPacanowski
 * ----------------------------------------------------------------------------
 */

var code = "\
function playerFixer() {\
	var fixIntervalVar = setInterval(function() {\
		if (typeof ytplayer !== 'undefined' && ytplayer !== null) {\
			ytplayer.config.args.ad_flags=\"0\";\
			ytplayer.config.args.ad3_module=null;\
			ytplayer.config.args.allow_html5_ads=\"0\";\
			ytplayer.config.loaded=false;\
			ytplayer.load();\
			clearInterval(fixIntervalVar);\
		}\
	}, 100),\
		ajaxBrowseFixInterval = setInterval(function() {\
			if (document.readyState === 'complete') {\
				var currentHref = window.location.href,\
					handler = function() {\
						if (currentHref !== window.location.href) {\
							currentHref = window.location.href;\
							document.body.removeEventListener(\"DOMSubtreeModified\", handler);\
							playerFixer();\
						}\
					};\
				document.body.addEventListener(\"DOMSubtreeModified\", handler, false);\
				clearInterval(ajaxBrowseFixInterval);\
			}\
		}, 1000);\
};\
playerFixer();\
";

var addIntervalVar = setInterval(function() {
		if (document.head) {
			var script = document.createElement('script');
			script.appendChild(document.createTextNode(code));
			script.setAttribute("id", "shads");
			document.head.appendChild(script);
			clearInterval(addIntervalVar);
		}
	}, 100);
