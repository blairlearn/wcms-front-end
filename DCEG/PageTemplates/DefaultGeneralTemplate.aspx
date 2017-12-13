<%@ Page Language="C#" AutoEventWireup="true" Inherits="NCI.Web.CDE.UI.WebPageAssembler" %>
<%@ Register Assembly="NCILibrary.Web.ContentDeliveryEngine.UI" Namespace="NCI.Web.CDE.UI.WebControls"
    TagPrefix="NCI" %>	
<!DOCTYPE html>
<html runat="server">
<head runat="server"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<style>
		/* Build: 24a6020 */
		#returnToNCI-frame{border:0;margin:0;width:100%;min-width:320px;max-width:100%;position:absolute;left:0;right:0;bottom:calc(100% - 20px);z-index:8000;overflow:hidden;visibility:visible !important}#skip:focus,#skip a:focus,#skip a.element-invisible:focus,.skip:focus,.skip a:focus,.skip a.element-invisible:focus,.skip-link:focus,.skip-link a:focus,.skip-link a.element-invisible:focus,#skip-link:focus,#skip-link a:focus,#skip-link a.element-invisible:focus,.skip2home:focus,.skip2home a:focus,.skip2home a.element-invisible:focus,.skipToContent:focus,.skipToContent a:focus,.skipToContent a.element-invisible:focus,.skipToContentLink:focus,.skipToContentLink a:focus,.skipToContentLink a.element-invisible:focus,.skipNavigation:focus,.skipNavigation a:focus,.skipNavigation a.element-invisible:focus,#skipNav:focus,#skipNav a:focus,#skipNav a.element-invisible:focus,.skip_nav:focus,.skip_nav a:focus,.skip_nav a.element-invisible:focus,.hiddenStructure:focus,.hiddenStructure a:focus,.hiddenStructure a.element-invisible:focus,#maincontent:focus,#maincontent a:focus,#maincontent a.element-invisible:focus,.genSiteSkipToContent:focus,.genSiteSkipToContent a:focus,.genSiteSkipToContent a.element-invisible:focus,.hideLink:focus,.hideLink a:focus,.hideLink a.element-invisible:focus,[href="#Content"]:focus,[href="#Content"] a:focus,[href="#Content"] a.element-invisible:focus{position:absolute !important;z-index:8001;top:0}@media print{#returnToNCI-frame{display:none !important}}body{transform:translateY(24px);overflow:visible}
	</style>
	<script type="text/javascript" src="//static.cancer.gov/nci-globals/modules/returnToNCI/returnToNCI-bar-v1.0.1.min.js" async></script>	<script language="javascript" id="_fed_an_ua_tag" src="https://dap.digitalgov.gov/Universal-Federated-Analytics-Min.js?agency=HHS&subagency=NCI" async></script>
</head>
<body class="genGeneral">
	<div class="genSiteSkipToContent"><a title="Skip to content" href="#skiptocontent">Skip to Content</a></div>
	<!-- Branding Bar Slot (#genSlotBrandingBar) -->
	<NCI:TemplateSlot ID="genSlotBrandingBar" runat="server" class="clearFix" />
	<!-- END Branding Bar Slot (#genSlotBrandingBar) -->
	<div class="genSiteContainer">
		<!-- Site Banner Slot (#genSlotSiteBanner) -->
		<NCI:TemplateSlot ID="genSlotSiteBanner" runat="server"  class="clearFix"/>
		<!-- END Site Banner Slot (#genSlotSiteBanner) -->
		<!-- Main Navigation Slot (#genSlotMainNav) -->
		<NCI:TemplateSlot ID="genSlotMainNav" runat="server"  class="clearFix"/>
		<!-- END Main Navigation Slot (#genSlotMainNav) -->
		<div class="genSiteContentContainer clearFix">
			<div class="genSiteLeftColumn">
				<!-- Section Navigation Slot (#genSlotSectionNav) -->
				<NCI:TemplateSlot ID="genSlotSectionNav" runat="server"/>
				<!-- END Section Navigation Slot (#genSlotSectionNav) -->
				<!-- Left Sidebar Slot (#genSlotLeftSidebar) -->
				<NCI:TemplateSlot ID="genSlotLeftSidebar" runat="server"/>
				<!-- END Left Sidebar Slot (#genSlotLeftSidebar) -->
			</div><!-- END Left Content Column (#genSiteLeftColumn) -->
			<div class="genSiteMainColumn clearFix">
								
				<!-- Section Banner Slot -->
				<NCI:TemplateSlot ID="genSlotSectionBanner" runat="server"/>
				<!-- END Section Banner Slot (#genSlotContentHeader) -->
				<!-- Content Title Slot // Includes Subtitle (#genSlotTitle) -->
				<NCI:TemplateSlot ID="genSlotTitle" runat="server"/>
				<!-- END Content Title Slot // Includes Subtitle (#genSlotTitle) -->
				<div class="genSiteContentColumn"><a name="skiptocontent" id="skiptocontent "></a> 
					<!-- Page Options (#genSlotPageOptions) -->
					<NCI:TemplateSlot ID="genSlotPageOptions" runat="server"/>
					<!-- END Page Options (#genSlotPageOptions) -->
					<!-- Body Slot (#genSlotBody) -->
					
					<div class="genSiteRightColumn">
					<!-- Additional Section Navigation Slot -->
					<NCI:TemplateSlot ID="genSlotRightNav" runat="server"  />
					<!-- END Additional Section Navigation Slot (#genSlotRightNav) -->
					<NCI:TemplateSlot ID="genSlotRightSidebar" runat="server"  />
					<!-- END Related Content Slot (#genSlotRightSidebar) -->
					</div><!-- END Right Content Column (#genSiteRightColumn) -->
					
					
					<NCI:TemplateSlot ID="genSlotBody" runat="server"/>
					<!-- END Body Slot (#genSlotBody) -->
					<!-- Related Links Slot -->
					<NCI:TemplateSlot ID="genSlotRelatedLinks" runat="server"/>
					<!-- END Related Links Slot (#genSlotRelatedLinks) -->
				</div>
			</div><!-- END Main Content Column (#genSiteMainColumn) -->
		</div>
		<!-- Site Footer Slot (#genSlotSiteFooter) -->
		<NCI:TemplateSlot ID="genSlotSiteFooter" runat="server" />
		<!-- END Site Footer Slot (#genSlotSiteFooter) -->
	</div><!-- END Site Container (#genSiteContainer) -->
    <!-- TO INSERT WEB ANALYTICS CODE. Every template should have this
    control else Web analytics scripts will not show up in the HTML-->
    <NCI:WebAnalyticsControl ID="WebAnalyticsControl1" runat="server" />
</body>
</html>