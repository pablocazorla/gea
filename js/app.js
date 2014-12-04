// App
;
(function() {
	var PC = {},
		nullFunction = function() {},
		enabledAjaxLoad = true,
		homeUrl = window.location.host,

		// Functions

		ajaxLoad = function(options) {
			var config = $.extend({
					url: window.location.href,
					success: nullFunction,
					complete: nullFunction,
					error: nullFunction
				}, options),
				s = (config.url.indexOf('?') === -1) ? '?' : '&',
				changeUrl = function(data) {
					var title = $(data).find('#pageTitle').text();
					if (title === '') {
						title = document.title;
					}
					if (typeof history !== 'undefined' && typeof history.pushState !== 'undefined') {
						history.pushState(null, title, config.url);
					}
				};
			if (enabledAjaxLoad && config.url.indexOf(homeUrl) !== -1) {
				$.ajax({
					url: config.url + s + 'async=1',
					error: config.error,
					complete: config.complete,
					success: function(data) {
						config.success(data);
						changeUrl(data);
					}
				});
			} else {
				window.location.href = config.url;
			}
		},
		setAjaxLoad = function(a, options) {
			var opt = options || {};
			$(a).click(function(e) {
				e.preventDefault();
				var config = $.extend({
					url: $(this).attr('href')
				}, opt);

				ajaxLoad(config);
			});
		},
		init = function() {
			//setAjaxLoad('a');
		};

	$('document').ready(init);

// PARA el PHP:

/*

<?php $async = $_GET['async']; ?>
<?php if (!$async){?>
<?php get_header(); ?>
<?php } ?>

*/


})();