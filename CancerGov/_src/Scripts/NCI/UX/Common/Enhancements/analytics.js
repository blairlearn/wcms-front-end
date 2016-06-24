define(function(require) {
	var $ = require('jquery');

	(function() {

		//utility functions
		// treeText
		// when clicking on an accordion button, get the accordion hierarchy and depth
		// ARGS
		// obj:jQuery collection - collection of accordion titles
		function treeText(obj){
			var str = "",depth = 0;
			$(obj.get().reverse()).each(function(i,el){
				if(str == "") {
					str = $(el).find("a:first").text();
				} else {
					str += ">" + $(el).find("a:first").text();
				}
				depth++;
			});
			return {string:str,depth:depth};
		}

		$('#mega-nav a')
			.filter(function() { return $(this).closest('.mobile-item').length === 0; })
			.on('click.analytics', function(event) {
				var $this = $(this),
					tree = [],
					treeParents = $this.parent('li').parents('li')
				;
				tree.push($this[0]);
				if (treeParents.children('a').length > 0) {
					tree.push(treeParents.children('a')[0]);
				}
				if (treeParents.children('div').children('a').length > 0) {
					tree.push(treeParents.children('div').children('a')[0]);
				}

				NCIAnalytics.MegaMenuClick(this, tree);
			});

		var menuRevealed;
		var megaNav = $("#mega-nav");
		var mobileMenuBar = $(".mobile-menu-bar");
		megaNav.on('mouseenter.analytics','.nav-item',function(e) {
			window.clearTimeout(menuRevealed);
			if (mobileMenuBar.is(":hidden")) {
				menuRevealed = window.setTimeout(function () {
					var menuText = $('#mega-nav a.open').text();
					NCIAnalytics.MegaMenuDesktopReveal(this, menuText);
				}, 1000);
			}
		}).on('mouseleave.analytics','.nav-item',function(e){
			window.clearTimeout(menuRevealed);
		}).on('click.analytics','button.toggle',function(){
			var $this = $(this),
				isExpanded = $this.attr('aria-expanded')==='true',
				tree = treeText($this.parents("li")).string,
				linkText = $this.prev().text() //linkText no longer used now that it's being captured with the tree values
			;
			NCIAnalytics.MegaMenuMobileAccordionClick(this, isExpanded, tree);

		}).on('click.analytics','.lvl-1 a, .mobile-item a',function(e){
			if(mobileMenuBar.is(":visible")){
				//e.preventDefault();
				var $this = $(this),
					url = 'www.cancer.gov' + location.pathname.toLowerCase(),
					linkText = $this.text(),
					linkUrl = $this.attr('href'),
					root = $this.closest(".lvl-1"),
					heading = $.trim(root.children(":first").find('a').text()),
					parent = $this.closest(".lvl-2"),
					subHeading = parent[0] && parent.children(":first").find('a').get(0) !== this?$.trim(parent.children(":first").find('a').text()):heading
				;

				//console.log("url: " + url + "\nlinkText: " + linkText  + "\nlinkUrl: " + linkUrl + "\nheading: " + heading + "\nsubHeading: " + subHeading);
				NCIAnalytics.MegaMenuMobileLinkClick(this, url, linkText, linkUrl, heading, subHeading);
			}
		});

		mobileMenuBar.on('click.analytics','.nav-header',function(){
			var isVisible = false;
			if($('#mega-nav > .nav-menu').attr('aria-hidden') === 'false'){
				isVisible = true;
			}
			if(isVisible){
				NCIAnalytics.MegaMenuMobileReveal(this);
			}
		});

		$('.utility a').each(function(i, el) {
			$(el).on('click.analytics', function(event) {
				var $this = $(this);
				var linkText = $this.text();

				NCIAnalytics.UtilityBarClick(this, linkText);
			});
		});

		$('.nci-logo')
			.on('click.analytics', function(event) {
				NCIAnalytics.LogoClick(this)
			});

		$('.feature-primary .feature-card').each(function(i, el) {
			$(el).on('click.analytics', 'a', function(event) {
				var $this = $(this);
				var cardTitle = $this.children('h3').text();
				var linkText = $this.children('h3').text();
				var container = 'Feature';
				var containerIndex = i + 1;

				NCIAnalytics.CardClick(this, cardTitle, linkText, container, containerIndex);
			});
		});

		$('.feature-secondary .feature-card').each(function(i, el) {
			$(el).on('click.analytics', 'a', function(event) {
				var $this = $(this);
				var cardTitle = $this.children('h3').text();
				var linkText = $this.children('h3').text();
				var container = 'SecondaryFeature';
				var containerIndex = i + 1;

				NCIAnalytics.CardClick(this, cardTitle, linkText, container, containerIndex);
			});
		});

		$('.guide-card .card').each(function(i, el) {
			$(el).on('click.analytics', 'a', function(event) {
				var $this = $(this);
				var cardTitle = $(el).children('h2').text();
				var linkText = $this.text();
				var container = 'Guide';
				var containerIndex = i + 1;

				NCIAnalytics.CardClick(this, cardTitle, linkText, container, containerIndex);
			});
		});

		$('.multimedia .card').each(function(i, el) {
			$(el).on('click.analytics', 'a', function(event) {
				var $this = $(this);
				var cardTitle = $this.children('h3').text();
				var linkText = $this.children('h3').text();
				var container = 'Multimedia';
				var containerIndex = i + 1;

				NCIAnalytics.CardClick(this, cardTitle, linkText, container, containerIndex);
			});
		});

		$('.card-thumbnail .card-thumbnail-image').each(function(i, el) {
			$(el).on('click.analytics', 'a', function(event) {
				var $this = $(this);
				var cardTitle = $this.closest('a').attr('data-title');
				var linkText = 'Image';
				var container = 'Thumbnail';
				var containerIndex = i + 1;

				NCIAnalytics.CardClick(this, cardTitle, linkText, container, containerIndex);
			});
		});

		$('.card-thumbnail .card-thumbnail-text').each(function(i, el) {
			$(el).on('click.analytics', 'a', function(event) {
				var $this = $(this);
				var cardTitle = $this.closest('h3').find('a:first').text();
				var linkText = $this.closest('h3').find('a:first').text();
				var container = 'Thumbnail';
				var containerIndex = i + 1;

				NCIAnalytics.CardClick(this, cardTitle, linkText, container, containerIndex);
			});
		});

		$('.cthp-card-container .cthpCard').each(function(i, el) {
			$(el).on('click.analytics', 'a', function(event) {
				var $this = $(this);
				var cardTitle = $this.closest('.cthpCard').find('h3:first').text();
				var linkText = $this.text();
				var container = 'CTHP';
				var containerIndex = i + 1;

				NCIAnalytics.CardClick(this, cardTitle, linkText, container, containerIndex);
			});
		});

		// Track clicks on on Topic Page Featured Card
		$('.topic-feature .feature-card').each(function(i, el) {
			$(el).on('click.analytics', 'a', function(event) {
				var $this = $(this);
				// if the card is inside the intro text or body then it is an inline card
				var isInline = $this.parents("#cgvBody,#cgvIntroText")[0];
				var cardTitle = $this.children('h3').text();
				var linkText = event.target.tagName.toLowerCase() == "img"?"Image":$this.children('h3').text();
				var container = isInline?'InlineCard':'SlottedTopicCard';
				var containerIndex = i + 1;

				NCIAnalytics.CardClick(this, cardTitle, linkText, container, containerIndex);
			});
		});

		$("#nvcgSlSectionNav a").on('click.analytics',function(event){
			//event.preventDefault(); //uncomment when testing link clicks
			var $this = $(this),
				url = 'www.cancer.gov' + location.pathname.toLowerCase(),
				root = $this.closest(".level-0"),
				heading = $.trim(root.children(":first").text()),
				parent = root.find(".level-1").is(".has-children")?treeText($this.parents("li")).string:"",
				linkText = $this.text(),
				depth = treeText($this.parents("li")).depth
			;
			//console.log("url: " + url + "\nheading: " + heading  + "\nparent: " + parent + "\nlinkText: " + linkText + "\ndepth: " + depth);
			NCIAnalytics.SectionLinkClick(this,url,heading,linkText,depth,parent);
		});

		// Track accordion expand/collapse
		/// TODO: need to add logic for other accordion implementations
		$('.accordion section').each(function(i, el) {
			$(el).on('click', 'h2', function(event) {
				var $this = $(this);
				if(document.URL.indexOf("/clinical-trials/") > -1) {
					accordionId = "clinical trial";
					displayedName = $this.text();
					sectionId = $this.index('h2') + '-' + displayedName.replace(/\W+/g,'-').toLowerCase();
					action = "expand";
					if($this.attr('aria-expanded') === 'false'){
						action = "collapse";
					}
					NCIAnalytics.AccordionClick($this, accordionId, sectionId, displayedName, action);
				}
			});
		});

		$('.add_this_btn').each(function() {
			var $this = $(this);
			$this.parent().on('click.analytics', $this, function(e) {
				NCIAnalytics.BookmarkShareClick(this);
			});
		});

		$('.po-font-resize a').on('click.analytics',function(e){
			var $this = $(this);
			//reset the mouseleave event on each click so it only reports once
			$this.off('mouseleave.analytics');

			//report the final font size on mouse leave of the icon
			$this.on('mouseleave.analytics',function(){
				//report font size after clicking is completed
				var target = $(".resize-content:first")[0]? $(".resize-content:first") : $("#cgvBody"),
					fontSize = parseInt(target.css("font-size")),
					fontStyle
				;

				if(fontSize < 19) {
					fontStyle = 'Normal';
				} else if(fontSize < 23) {
					fontStyle = 'Medium';
				} else if(fontSize < 27) {
					fontStyle = 'Large';
				} else {
					fontStyle = 'Extra Large';
				}
				NCIAnalytics.fontResizer(this,fontStyle);

				//unbind the mouseleave event to prevent reporting on casual mouseovers
				$this.off('mouseleave.analytics');
			});

		});


		//analytics for components generated by JavaScript
		$(window).load(function(){

			$("#nvcgSlSectionNav button.toggle").on('click.analytics',function(event){

				var $this = $(this),
					url = 'www.cancer.gov' + location.pathname.toLowerCase(),
					root = $this.closest(".level-0"),
					heading = $.trim(root.children(":first").text()),
					tree = treeText($this.parents("li:not(.level-0)")).string,
					isExpanded = $this.attr("aria-expanded") == "true"
				;

				//console.log("url: " + url + "\nisExpanded: " + isExpanded  + "\nheading: " + heading  + "\nparent: " + parent + "\nevent: " + event.type);
				NCIAnalytics.SectionAccordionClick(this,url,isExpanded,heading,tree);
			});
			$(".back-to-top").one("reveal",function(e){
				NCIAnalytics.BackToTopReveal(this,true);

			}).on('click.analytics',function(e){
				var UtilityBar = $("#nvcgSlUtilityBar").is(":visible");
				NCIAnalytics.BackToTopClick(this,UtilityBar);
			});


			$('#section-menu-button').on('click.analytics',function(e){
				var sectionNav = $(".section-nav"),
					//sectionTitle = $.trim(sectionNav.find(".current-page").text()) //fetches current active element in the menu
					sectionTitle = $(".section-nav .level-0 a:first").text()
				;
				if(!sectionNav.is(".open")){
					NCIAnalytics.SectionMenuButtonClick(this,sectionTitle);
				}
			});

		});

	})();
});
