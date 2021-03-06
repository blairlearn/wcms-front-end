import $ from 'jquery';
import AdobeAnalytics from 'Patches/AdobeAnalytics';

/***
* Main function
*/
function _initialize() {
	/* Track right rail links */
	var pageName = 'www.cancer.gov/';
	var s = AdobeAnalytics.getSObject();
	if(typeof(s) !== 'undefined') {
		pageName = s.pageName;
	}

	var identifier = '';
	$('a .delighter.cts-livehelp').on('click.analytics', function (e) {
		var $this = $(this);
		identifier = 'rrail_have a question';
		NCIAnalytics.SimpleCTSLink($this, identifier, pageName);
	});
	$('a .delighter.cts-which').on('click.analytics', function (e) {
		var $this = $(this);
		identifier = 'rrail_which trials are right for you';
		NCIAnalytics.SimpleCTSLink($this, identifier, pageName);
	});
	$('a .delighter.cts-what').on('click.analytics', function (e) {
		var $this = $(this);
		identifier = 'rrail_what are cancer clinical trials';
		NCIAnalytics.SimpleCTSLink($this, identifier, pageName);
	});
	$('a .delighter.cts-next-step').on('click.analytics', function (e) {
		var $this = $(this);
		identifier = 'rrail_how to find a cancer treatment trial';
		NCIAnalytics.SimpleCTSLink($this, identifier, pageName);
	});
	
	/* Track clicks of start over buttons */
	$('.cts-start-over a').on('click', function(event) {
		var $this = $(this);

		// Get the value of the "rl=" param
		var rl = getResultsFlag(window.location.href);

		// Sets the search form name for analytics
		var searchForm = "clinicaltrials_basic";
		if(rl == 2)
		{
			searchForm = "clinicaltrials_advanced";
		}

		// Set link text value to passed into analytics tracking function			
		var linkText = 'start over';
		NCIAnalytics.CTStartOverWithFormClick($this, searchForm, linkText);
	});

	/**
	 * Track clicks of "try a new search" link. 
	 * This also uses the CTSStartOverClick() function from NCIAnalyticsFunctions.js
	 */
	$('.cts-new-search a').on('click', function(event) {
		var $this = $(this);

		// Get the value of the "rl=" param			
		var rl = getResultsFlag(window.location.href);

		// Sets the search form name for analytics
		var searchForm = "clinicaltrials_basic";
		if(rl == 2)
		{
			searchForm = "clinicaltrials_advanced";
		}

		// Set link text value to passed into analytics tracking function
		var linkText = 'try a new search';
		NCIAnalytics.CTStartOverWithFormClick($this, searchForm, linkText);
	});		
}

/**
 * Get the results link flag from the URL - if it doesn't exist, set it equal to 1 (basic)
 * 
 * @param {any} url 
 */
function getResultsFlag(url) {
	var rl = 1;
	if(url.indexOf('rl=') > -1) {
		var rlq = url.match(/rl=[0,1,2]/g) // get the "rl=x" query value - can only be 0, 1, or 2
		rl = rlq[0].replace('rl=',''); // strip out the rl= to get the flag
		if(rl.length < 1) {
			rl = 1;
		}
	}
	return rl;
}

let initialized = false;
export default {
	init: function() {
		if (initialized) {
			return;
		}
		
		initialized = true;
		_initialize();
	}
}