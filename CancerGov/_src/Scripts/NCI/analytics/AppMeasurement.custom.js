/* Custom NCI Web Analytics values & plugins - for information or support email: NCIOCEWebAnalytics@mail.nih.gov */

/************************** CONFIG SECTION **************************/
/* Config Section Version - Last updated 10/23/2018 */

// s_account (report suites) is defined and set before this file is loaded
s.account = (s_account) ? s_account : s.account;

/* Conversion Config */
s.currencyCode="USD";
/* Language Config */
s.charSet="UTF-8";
/* Link Tracking Config */
s.trackDownloadLinks=true;
s.trackExternalLinks=true;
s.trackInlineStats=true;
s.linkDownloadFileTypes="avi,doc,docx,epub,exe,gif,jpg,ics,mobi,mov,mp3,mpg,pdf,png,ppt,pptx,rss,wav,wmv,xls,xlsx,xml,zip";
s.linkInternalFilters="javascript:,cancer.gov";
s.linkLeaveQueryString=false;
s.linkTrackVars="None";
s.linkTrackEvents="None";
s.useForcedLinkTracking=true
s.forcedLinkTrackingTimeout=625

//time parting configuration 
//US
s._tpDST = {
    2012:'3/11,11/4',
    2013:'3/10,11/3',
    2014:'3/9,11/2',
    2015:'3/8,11/1',
    2016:'3/13,11/6',
    2017:'3/12,11/5',
    2018:'3/11,11/4',
    2019:'3/10,11/3',
    2020:'3/8,11/1',
    2021:'3/14,11/7',
    2022:'3/13,11/6',
    2023:'3/12,11/5',
    2024:'3/10,11/3',
    2025:'3/9,11/2',
    2026:'3/8,11/1',
    2027:'3/14,11/7',
    2028:'3/12,11/5'
}

//set the font size variable
s.prop42="Normal";

// Domain override
var localPageName = location.hostname.toLowerCase() + location.pathname.toLowerCase();

if (typeof pageNameOverride!="undefined")
    localPageName = pageNameOverride;

if (typeof linkInternalFiltersOverride!="undefined")
    s.linkInternalFilters=linkInternalFiltersOverride;  
    
var canonicalLink = null;
var links = document.getElementsByTagName("link");
for (var i = 0; i < links.length; i++) {
    if( links[i].getAttribute("rel") == "canonical")
    {
        canonicalLink = links[i].href;
        break;
    }
}
if(canonicalLink)
{
    canonicalLink = canonicalLink.toLowerCase();

    // Remove http
    if(canonicalLink.indexOf("http://") >= 0)
      canonicalLink = canonicalLink.substring(canonicalLink.indexOf("http://")+7);

    // Remove https
    if(canonicalLink.indexOf("https://") >= 0)
      canonicalLink = canonicalLink.substring(canonicalLink.indexOf("https://")+8);

    // Remove query parameters
    if(canonicalLink.indexOf("?") > 0)
      canonicalLink = canonicalLink.substring(0, canonicalLink.indexOf("?"));

    localPageName = canonicalLink;
}

// Determine if patient or healthprofessional version
// set prop7 and eVar7 to version and add value to 
// addToLocalPageName
var version = semphonicGetQueryParm('version');
var addToLocalPageName = "";
var omversion = "";
if(localPageName.indexOf("patient") >= 0 )
{
    omversion = "patient";
}
else if(localPageName.indexOf("healthprofessional") >= 0 )
{
    omversion = "healthprofessional";
}
else
{
    if (version) 
    {
        if( version.toLowerCase() == "patient"  
            || version == "patients"
            || version == "0" )
        {
            omversion = "patient";
            addToLocalPageName = CommaList(addToLocalPageName,"Patient");
        }
        else if( version.toLowerCase() == "healthprofessional" 
            || version.toLowerCase() == "healthprofessionals"
            || version == "1" )
        {
            omversion = "healthprofessional";
            addToLocalPageName = CommaList(addToLocalPageName,"HealthProfessional");
        }
    }
}
s.prop7=s.eVar7=omversion;

// if dictionary, define addToLocalPageName
if(localPageName.indexOf("dictionaries") > 0 || 
   localPageName.indexOf("diccionario")> 0)
{
    if (caseInsensitiveGetQueryParm('expand'))
        addToLocalPageName = CommaList(addToLocalPageName,'AlphaNumericBrowse');
    else if (localPageName.indexOf("/def/") >= 0 )
        addToLocalPageName = CommaList(addToLocalPageName,'Definition');
}

// retain page query parameter value
var pageNum = caseInsensitiveGetQueryParm('page');
if (pageNum)
    addToLocalPageName = CommaList(addToLocalPageName,"Page " + pageNum.toString());

// add any additional information to localPageName and
// set pageName and eVar1 to localPageName
if(addToLocalPageName.length > 0)
    localPageName += " - " + addToLocalPageName;
s.pageName=s.eVar1=localPageName;
s.mainCGovIndex = s.pageName.indexOf('www.cancer.gov');

var fullURL = document.URL;
if(fullURL.length > 100)
{
    s.prop1 = fullURL.substring(0,100);
    s.prop2 = fullURL.substring(100);
}
else
    s.prop1 = fullURL;

// Set prop8 and eVar3 to "english" unless "espanol" is in the url 
// or "lang=spanish" or "language=spanish" query parameters exist
var language = "english";
if (localPageName.indexOf("espanol") >= 0 ||
    caseInsensitiveGetQueryParm('lang') == 'spanish' ||
    caseInsensitiveGetQueryParm('language') == 'spanish' ||
    getMetaTagContent('[name="content-language"]') == 'es') {
        language = "spanish";
    }
s.prop8=s.eVar2=language;

// Set prop26 to Time Stamp format: <year>|<month>|<day>|<hour>
var now = new Date();
s.prop26 = now.getFullYear() + "|" + (now.getMonth() + 1) + "|" + now.getDate() + "|" + now.getHours();

/* Plugin Config */
s.usePlugins=true

/* Add calls to plugins here */
function s_doPlugins(s) {

    /* Set prop15 to either 'protoclsearchid' or 'PrintID' (depends on the page being loaded) */
	if(s.prop15 == null && s.eVar15 == null) 
    {
        s.prop15=s.eVar15= s.Util.getQueryParam('protocolsearchid') ? s.Util.getQueryParam('protocolsearchid') : s.Util.getQueryParam('PrintID');
    }

    /* Set the campagin value if there are any matching queries in the URL*/
    var hasUtm = false;
    var utmArr = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content'];
    var utmJoin  = [];
    sCampaign = s.Util.getQueryParam('cid');
    if (!sCampaign) {
        sCampaign = s.Util.getQueryParam('gclid');
        if (!sCampaign) {
            for (i = 0; i < utmArr.length; i++) {
                val = s.Util.getQueryParam(utmArr[i]); 
                if(val) {
                    hasUtm = true;
                }
                else {
                    val = '_';
                }
                utmJoin.push(val);
            }
            if(hasUtm) {
                sCampaign = utmJoin.join('|');
            }
        }
    }

    // retrieve urs values
    if(typeof NCIAnalytics !== 'undefined') {
    	if(typeof NCIAnalytics.urs !== 'undefined') {
			window.urs = NCIAnalytics.urs.get({
				campaign: sCampaign,
				referrer: document.referrer
			});
			// console.info('urs', JSON.stringify(window.urs, null, 2));    

			s.eVar54 = urs.value;
			s.prop51 = (s.eVar54) ? 'D=v54' : '';
			s.eVar55 = urs.seoKeyword;
			s.eVar56 = urs.ppcKeyword;
			s.eVar57 = urs.stacked;
		}
    }

    s.eVar35 = sCampaign;
    s.campaign = s.getValOnce(sCampaign,'s_campaign',30);

    /* Force Custom Variables to Lower Case */
    //s.prop6 = makeLowerCase(s.prop6);
    s.prop7 = makeLowerCase(s.prop7);
    s.eVar7= makeLowerCase(s.eVar7);
    s.prop14 = makeLowerCase(s.prop14);
    s.eVar14= makeLowerCase(s.eVar14);
    s.prop17 = makeLowerCase(s.prop17);
    s.eVar17= makeLowerCase(s.eVar17);
    s.prop18 = makeLowerCase(s.prop18);
    s.eVar18= makeLowerCase(s.eVar18);
    s.prop19 = makeLowerCase(s.prop19);
    s.eVar19 = makeLowerCase(s.eVar19);
    s.prop20 = makeLowerCase(s.prop20);
    s.eVar20 = makeLowerCase(s.eVar20);
    s.prop21 = makeLowerCase(s.prop21);
    s.eVar21 = makeLowerCase(s.eVar21);
    s.prop22 = makeLowerCase(s.prop22);
    s.eVar23 = makeLowerCase(s.eVar23);
    s.eVar24 = makeLowerCase(s.eVar24);
//////////
// SOCIAL
//////////
    s.socialPlatforms('eVar74');

    s.maxDelay='1000';  //max time to wait for 3rd party api response in milliseconds

    /* Previous Page */
    s.prop61 = s.getPreviousValue(s.pageName, 'gpv_pn', "");

    // Set the variables for the time parting ('n' for northern hemisphere, '-5" for EST) and set to prop29 for time parting
    var tp = s.getTimeParting('n','-5');
    s.prop29 = tp;

    // Set prop64 for percent page viewed - if 0, then set to 'zero'
    s.prop64=s.getPercentPageViewed();
    s.prop64=(s.prop64=="0") ? "zero" : s.prop64;

    // Set prop65 to get the initial load time of the page (for use in the page load speed plugin)
    var loadTime = s_getLoadTime();
    s.prop65 = loadTime;

    // Start building event data from existing values on the "s" object
    var eventsArr = (s.events && s.events.length > 0) ? s.events.split(',') : [];
    var waData = document.querySelector('[class*="wa-data"][data-events]');

    // Add any events from the metadata
    if(waData) {
        var eventData = waData.getAttribute('data-events');
        if(eventData) eventsArr = eventsArr.concat(eventData.split(','));
    }

    // Add the standard load events
    eventsArr.push('event1');
    eventsArr.push('event47=' + s_getLoadTime());

    // Add engagement tracking (event92)
    // engagementTracking >> requires EvoEngagementPlugin() 
    if(s.mainCGovIndex >= 0) {
        try {
            if (typeof (window.NCIEngagementPageLoadComplete) === 'undefined' || !window.NCIEngagementPageLoadComplete) {

                // check the cookie
                var engagementScore = window.NCIEngagement.getAndResetEngagementCookie();

                // add engagement metrics to the page load call, if needed
                if (engagementScore && parseInt(engagementScore) > 0) {
                    eventsArr.push('event92=' + engagementScore);
                }

                // flag to prevent firing this logic more than once per page load
                window.NCIEngagementPageLoadComplete = true;
            }
        } catch (err) {
            /** console.log(err) */
        }
    }    

    // Remove duplicates and join everything
    eventsArr = eventsArr.filter(onlyUnique);
    s.events = eventsArr.join(',');
}
s.doPlugins=s_doPlugins 

/* Functions */
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

function CommaList(commaList, addValue)
{
    if (commaList.length > 0)
        return commaList + ", " + addValue;
    else 
        return addValue;
}

function makeLowerCase(value)
{
    if(value == null || typeof(value) == 'undefined' )
        return value;
    else     
        return value.toLowerCase();
}

function caseInsensitiveGetQueryParm(qp)
{
    var fullurl = location.search.toLowerCase();
    var cipos = fullurl.indexOf(qp + "=");
    if (cipos == -1)
        return null;
    cipos += qp.length+1;
    if (cipos >= fullurl.length)
        return null;
    var ciendPos1 = fullurl.indexOf("&", cipos);
    var ciendPos2 = fullurl.indexOf("#", cipos);
    if (ciendPos1 < 0 && ciendPos2 < 0)
    {
        return unescape(fullurl.substring(cipos));
    }
    var ciendPos = ciendPos1;
    if (ciendPos < 0 || (ciendPos2 >= 0 && ciendPos2 < ciendPos1))
        ciendPos = ciendPos2;

    return unescape(fullurl.substring(cipos, ciendPos));
}

function semphonicGetQueryParm(qp)
{
    var pos = document.URL.indexOf(qp + "=");
    if (pos == -1)
        return null;
    pos += qp.length+1;
    if (pos >= document.URL.length)
        return null;
    var endPos1 = document.URL.indexOf("&", pos);
    var endPos2 = document.URL.indexOf("#", pos);
    if (endPos1 < 0 && endPos2 < 0)
    {
        return unescape(document.URL.substring(pos));
    }
    var endPos = endPos1;
    if (endPos < 0 || (endPos2 >= 0 && endPos2 < endPos1))
        endPos = endPos2;

    return unescape(document.URL.substring(pos, endPos));
}

/** Custom Plugin: Dynamically Create s.hier variable*/
function set_hier1() {
    h1 = new String(document.location.host + document.location.pathname);
    if (h1.charAt(h1.length - 1) == "/") {
        var temp = new String();
        for (var i = 0; i < h1.length - 1; i++) {
            temp += h1.charAt(i);
        }
        h1 = temp;
    }
    var intMatch = h1.indexOf("/");
    while (intMatch != -1) {
        h1 = h1.replace("/", "|");
        intMatch = h1.indexOf("/");
    }
    return h1;
}

/* Dynamically Capture Hierarchy Variable via Custom Plugin */
s.hier1 = set_hier1();

/* Track scroll percentage of previous page / percent visible on current page */
if(typeof NCIAnalytics !== 'undefined') {
    if(typeof NCIAnalytics.cookieRead === 'function') {
        s.prop48=NCIAnalytics.cookieRead("nci_scroll");
    }
}

/* Get the Trial Print ID from a URL */
function getPrintID(){
    var url = window.location.href;
    var regex = new RegExp("[?&]" + "PrintID" + "(=([^&#]*)|&|#|$)", "i");
    var results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/** Set prop15 to the Prind ID if this is a CTS print page */
if(fullURL.toLowerCase().indexOf('cts.print/display') > -1) {
    s.prop15 = s.eVar15 = getPrintID();
}

/* Set eVar for browser width on page load */
s.eVar5 = getViewPort(); 
 
/* Set a name for the view port based on the current screen size */
function getViewPort() {
    var screen = '';
    if(window.innerWidth)
    {
        if (window.innerWidth > 1440) { screen = "Extra wide"; }
        else if (window.innerWidth > 1024) { screen = "Desktop"; }
        else if (window.innerWidth > 640) { screen = "Tablet"; }
        else { screen = "Mobile"; }
    }
    return screen;
}

// Set channel 
s.channel = getMetaTagContent('[name="dcterms.subject"]');

// Set pageType 
s.pageType = getMetaTagContent('[name="dcterms.type"]');

// Set prop6 to short title
s.prop6 = getMetaTagContent('[property="og:title"]');

// Set prop25 to date published
s.prop25 = getMetaTagContent('[name="dcterms.issued"]');

// Set prop44 & eVar44 to 'group'
s.prop44 = s.eVar44 = getMetaTagContent('[name="dcterms.isPartOf"]');

// Check for meta attribute and get content if exists
function getMetaTagContent (selector) {
    if(document.head.querySelector(selector) != null) {
        return document.head.querySelector(selector).content;
    } else {
        return '';
    }
}

/** Dynamically add numbered variables (e.g. prop1, eVar8) and values to the 's' object */
function setNumberedVars(varName, selector) {

    // Get the data element; '.wa-data-element' is the default
    selector = selector || '.wa-data-element';
    var waData = document.querySelector(selector);

    if(varName && waData) {
        for(dataAttr in waData.dataset) {
            if(dataAttr.indexOf(varName) > -1)
            {
                var nvKey = dataAttr.replace('evar', 'eVar'); // 'eVar' must be specified on s object
                var nvValue = waData.dataset[dataAttr].replace(/(^'+|'+$)/mg, ''); // strip out single quotes
                s[nvKey] = nvValue;
            }
        }
    }
}

// Set props
setNumberedVars("prop");

// Set eVars
setNumberedVars("evar");

// Return prop10 value
function setProp10() {
    // If this  is an R4R page, set the generic title 
    if(document.querySelector('#r4r-root .r4r-resource')) {
        return 'Resources for Researchers - National Cancer Institute';
    } else {
        return document.title;
    }

}
s.prop10 = setProp10();
    

/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */
/********************************************************************/
/*
 * Plugin: getValOnce_v1.0
 */
s.getValOnce=new Function("v","c","e",""
+"var s=this,a=new Date,v=v?v:v='',c=c?c:c='s_gvo',e=e?e:0,k=s.c_r(c"
+");if(v){a.setTime(a.getTime()+e*86400000);s.c_w(c,v,e?a:0);}return"
+" v==k?'':v");

/*
 * Copyright 2011-2013 Adobe Systems, Inc.
 * s_getLoadTime v1.36 - Get page load time in units of 1/10 seconds
 */
function s_getLoadTime()
{
    if(!window.s_loadT)
    {
        var b=new Date().getTime(),o=window.performance?performance.timing:0,a=o?o.requestStart:window.inHeadTS||0;s_loadT=a?Math.round((b-a)/100):''
    }
    return s_loadT
}

/*
 * Plugin: getTimeParting 3.4
 */
s.getTimeParting=new Function("h","z",""
+"var s=this,od;od=new Date('1/1/2000');if(od.getDay()!=6||od.getMont"
+"h()!=0){return'Data Not Available';}else{var H,M,D,U,ds,de,tm,da=['"
+"Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturda"
+"y'],d=new Date();z=z?z:0;z=parseFloat(z);if(s._tpDST){var dso=s._tp"
+"DST[d.getFullYear()].split(/,/);ds=new Date(dso[0]+'/'+d.getFullYea"
+"r());de=new Date(dso[1]+'/'+d.getFullYear());if(h=='n'&&d>ds&&d<de)"
+"{z=z+1;}else if(h=='s'&&(d>de||d<ds)){z=z+1;}}d=d.getTime()+(d.getT"
+"imezoneOffset()*60000);d=new Date(d+(3600000*z));H=d.getHours();M=d"
+".getMinutes();M=(M<10)?'0'+M:M;D=d.getDay();U=' AM';if(H>=12){U=' P"
+"M';H=H-12;}if(H==0){H=12;}D=da[D];tm=H+':'+M+U;return(tm+'|'+D);}");

/*
* Plugin: getPercentPageViewed v1.x
* This code has been modified from the original version distributed
* by Omniture and will not be supported by Omniture in any way
*/
s.getPercentPageViewed=new Function("",""
+"var s=this;if(typeof(s.linkType)=='undefined'||s.linkType=='e'){var"
+" v=s.c_r('s_ppv');s.c_w('s_ppv',0);return v;}");
s.getPPVCalc=new Function("",""
+"var dh=Math.max(Math.max(s.d.body.scrollHeight,s.d.documentElement."
+"scrollHeight),Math.max(s.d.body.offsetHeight,s.d.documentElement.of"
+"fsetHeight),Math.max(s.d.body.clientHeight,s.d.documentElement.clie"
+"ntHeight)),vph=s.d.clientHeight||Math.min(s.d.documentElement.clien"
+"tHeight,s.d.body.clientHeight),st=s.wd.pageYOffset||(s.wd.document."
+"documentElement.scrollTop||s.wd.document.body.scrollTop),vh=st+vph,"
+"pv=Math.round(vh/dh*100),cv=s.c_r('s_ppv'),cpi=cv.indexOf('|'),cpv="
+"'',ps='';if(cpi!=-1){cpv=cv.substring(0,cpi);ps=parseInt(cv.substri"
+"ng(cpi+1));}else{cpv=ps=0;}if(pv<=100){if(pv>parseInt(cpv)){ps=pv-M"
+"ath.round(vph/dh*100);s.c_w('s_ppv',pv+'|'+ps);}}else{s.c_w('s_ppv'"
+",'');}");
s.getPPVSetup=new Function("",""
+"var s=this;if(typeof(s.wd)=='undefined')s.wd=window;if(s.wd.addEven"
+"tListener){s.wd.addEventListener('load',s.getPPVCalc,false);s.wd.ad"
+"dEventListener('scroll',s.getPPVCalc,false);s.wd.addEventListener('"
+"resize',s.getPPVCalc,false);}else if(s.wd.attachEvent){s.wd.attachE"
+"vent('onload',s.getPPVCalc);s.wd.attachEvent('onscroll',s.getPPVCal"
+"c);s.wd.attachEvent('onresize',s.getPPVCalc);}");
s.getPPVSetup();

/******************************
 * Plugin: socialPlatforms v1.0
 ******************************/
s.socialPlatforms=new Function("a",""
+"var s=this,g,K,D,E,F;g=s.referrer?s.referrer:document.referrer;g=g."
+"toLowerCase();K=s.split(s.socPlatList,'|');for(i=0;i<K.length;i++){"
+"D=s.split(K[i],'>');if(g.indexOf(D[0])!=-1){if(a){s[a]=D[1];}}}");

s.socPlatList="facebook.com>Facebook|twitter.com>Twitter|t.co/>Twitter|youtube.com>Youtube|clipmarks.com>Clipmarks|dailymotion.com>Dailymotion|delicious.com>Delicious|digg.com>Digg|diigo.com>Diigo|flickr.com>Flickr|flixster.com>Flixster|fotolog.com>Fotolog|friendfeed.com>FriendFeed|google.com/buzz>Google Buzz|buzz.googleapis.com>Google Buzz|plus.google.com>Google+|hulu.com>Hulu|identi.ca>identi.ca|ilike.com>iLike|intensedebate.com>IntenseDebate|myspace.com>MySpace|newsgator.com>Newsgator|photobucket.com>Photobucket|plurk.com>Plurk|slideshare.net>SlideShare|smugmug.com>SmugMug|stumbleupon.com>StumbleUpon|tumblr.com>Tumblr|vimeo.com>Vimeo|wordpress.com>WordPress|xanga.com>Xanga|metacafe.com>Metacafe|";

//append list
s.apl=new Function("L","v","d","u","var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a.length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCase()));}}if(!m)L=L?L+d+v:v;return L");

// split v1.5
s.split=new Function("l","d","var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

// ver. 1.0 - s.join(v,p)| v - Array | p - formatting parameters (front,back,delim,wrap)
s.join=new Function("v","p","var s=this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back:'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0;x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);else str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");


/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.visitorNamespace="nci";

// Send tagging requests to correct server based on protocol
s.trackingServer="nci.122.2o7.net";
s.dc="122";

/*
* Plugin: getPreviousValue_v1.0 - return previous value of designated
*   variable (requires split utility)
*/
s.getPreviousValue = new Function("v", "c", "el", ""
+ "var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
+ "){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
+ "){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
+ ":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
+ "s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");

/*
* Plugin: custom engagement tracking 
*/
s.EvoEngagementPlugin=new Function("",""
+"var engagementObject='NCIEngagement';window[engagementObject]={loggingEnabled:!1,pollingInterval:1e4,scorePerInterval:10,hasScrolled:!1,hasMoused:!1,hasClicked:!1,defaultEngagementScore:0,engagemen"
+"tScore:0,minimumEngagementScore:1,cookieName:'engagementTracking',logger:function(e,n){var n=n||'log';this.loggingEnabled&&console[n](engagementObject.toUpperCase()+' LOGGER:',e)},initialize:functi"
+"on(e){window[engagementObject].logger('initialize');var n=e;window[engagementObject].startTime=(new Date).getTime(),this.isFocused=document.hasFocus()},doScroll:function(){this.isFocused=document.h"
+"asFocus(),this.isFocused&&(window[engagementObject].logger('doScroll'),this.hasScrolled=!0)},doMouse:function(){this.isFocused=document.hasFocus(),window[engagementObject].logger('doMouse'),this.is"
+"Focused&&(this.hasMoused=!0)},doClick:function(){this.isFocused=document.hasFocus(),window[engagementObject].logger('doClick'),this.isFocused&&(this.hasClicked=!0)},getEngagementScore:function(e){v"
+"ar n=e.action,t=e.status,o=e.score,g=t?o+10:o;return this[n]=!1,g},getEngagementStatus:function(e){return this.engagementScore=this.getEngagementScore({action:'hasScrolled',status:this.hasScrolled,"
+"score:this.engagementScore}),this.engagementScore=this.getEngagementScore({action:'hasMoused',status:this.hasMoused,score:this.engagementScore}),this.engagementScore=this.getEngagementScore({action"
+":'hasClicked',status:this.hasClicked,score:this.engagementScore}),this.status={engagementScore:this.engagementScore},this.status},getAndResetEngagementCookie:function(){var e=this.cookieName,n=NCIA"
+"nalytics.cookieRead(e)||'';return NCIAnalytics.cookieWrite(e,'0'),n}},window[engagementObject].initialize(window[engagementObject]);var engagement_timer=setInterval(function(){window[engagementObje"
+"ct].getEngagementStatus();var e=window[engagementObject].engagementScore>=window[engagementObject].minimumEngagementScore,n=NCIAnalytics.cookieRead(window[engagementObject].cookieName)||0,t=e?'enga"
+"ged':'not engaged';if('engaged'===t){var o=parseInt(n)+window[engagementObject].scorePerInterval;NCIAnalytics.cookieWrite(window[engagementObject].cookieName,o),window[engagementObject].logger('eng"
+"agement-score_'+o),window[engagementObject].engagementScore=window[engagementObject].defaultEngagementScore}else window[engagementObject].logger('engagement-score: '+t.toUpperCase())},window[engage"
+"mentObject].pollingInterval);attachEvents({element:window,event:'scroll',action:function(){window[engagementObject].doScroll()}}),attachEvents({element:window,event:'mouseover',action:function(){wi"
+"ndow[engagementObject].doMouse()}}),attachEvents({element:window,event:'click',action:function(){window[engagementObject].doClick()}});");
s.EvoEngagementPlugin();

/*
 AppMeasurement_Module_Media 
 This replaces the Integrate module from s_code
 https://marketing.adobe.com/resources/help/en_US/sc/implement/appmeasure_mjs_migrate.html
*/
function AppMeasurement_Module_Integrate(l){var c=this;c.s=l;var e=window;e.s_c_in||(e.s_c_il=[],e.s_c_in=0);c._il=e.s_c_il;c._in=e.s_c_in;c._il[c._in]=c;e.s_c_in++;c._c="s_m";c.list=[];c.add=function(d,b){var a;b||(b="s_Integrate_"+d);e[b]||(e[b]={});a=c[d]=e[b];a.a=d;a.e=c;a._c=0;a._d=0;void 0==a.disable&&(a.disable=0);a.get=function(b,d){var f=document,h=f.getElementsByTagName("HEAD"),k;if(!a.disable&&(d||(v="s_"+c._in+"_Integrate_"+a.a+"_get_"+a._c),a._c++,a.VAR=v,a.CALLBACK="s_c_il["+c._in+"]."+
a.a+".callback",a.delay(),h=h&&0<h.length?h[0]:f.body))try{k=f.createElement("SCRIPT"),k.type="text/javascript",k.setAttribute("async","async"),k.src=c.c(a,b),0>b.indexOf("[CALLBACK]")&&(k.onload=k.onreadystatechange=function(){a.callback(e[v])}),h.firstChild?h.insertBefore(k,h.firstChild):h.appendChild(k)}catch(l){}};a.callback=function(b){var c;if(b)for(c in b)Object.prototype[c]||(a[c]=b[c]);a.ready()};a.beacon=function(b){var d="s_i_"+c._in+"_Integrate_"+a.a+"_"+a._c;a.disable||(a._c++,d=e[d]=
new Image,d.src=c.c(a,b))};a.script=function(b){a.get(b,1)};a.delay=function(){a._d++};a.ready=function(){a._d--;a.disable||l.delayReady()};c.list.push(d)};c._g=function(d){var b,a=(d?"use":"set")+"Vars";for(d=0;d<c.list.length;d++)if((b=c[c.list[d]])&&!b.disable&&b[a])try{b[a](l,b)}catch(e){}};c._t=function(){c._g(1)};c._d=function(){var d,b;for(d=0;d<c.list.length;d++)if((b=c[c.list[d]])&&!b.disable&&0<b._d)return 1;return 0};c.c=function(c,b){var a,e,g,f;"http"!=b.toLowerCase().substring(0,4)&&
(b="http://"+b);l.ssl&&(b=l.replace(b,"http:","https:"));c.RAND=Math.floor(1E13*Math.random());for(a=0;0<=a;)a=b.indexOf("[",a),0<=a&&(e=b.indexOf("]",a),e>a&&(g=b.substring(a+1,e),2<g.length&&"s."==g.substring(0,2)?(f=l[g.substring(2)])||(f=""):(f=""+c[g],f!=c[g]&&parseFloat(f)!=c[g]&&(g=0)),g&&(b=b.substring(0,a)+encodeURIComponent(f)+b.substring(e+1)),a=e));return b}}
