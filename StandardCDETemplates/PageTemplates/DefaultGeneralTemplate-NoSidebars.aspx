<%@ Page Language="C#" AutoEventWireup="true" Inherits="NCI.Web.CDE.UI.WebPageAssembler" %>
<%@ Register Assembly="NCILibrary.Web.ContentDeliveryEngine.UI" Namespace="NCI.Web.CDE.UI.WebControls"
    TagPrefix="NCI" %>
<!DOCTYPE html>
<html runat="server">
<head runat="server"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /></head>

<body class="genGeneral">
	<div class="genSiteSkipToContent"><a href="#genSiteContent">Skip to Content</a></div>
	<!-- Branding Bar Slot (#genSlotBrandingBar) // Color class on slot determined by Content Type field value  -->
	<NCI:TemplateSlot ID="genSlotBrandingBar" runat="server" class="clearFix red" />
	<!-- END Branding Bar Slot (#genSlotBrandingBar) -->
	<div class="genSiteContainer">
		<!-- Site Banner Slot (#genSlotSiteBanner) -->
		<NCI:TemplateSlot ID="genSlotSiteBanner" runat="server"  class="clearFix"/>
		<!-- END Site Banner Slot (#genSlotSiteBanner) -->
		<!-- Main Navigation Slot (#genSlotMainNav) -->
		<NCI:TemplateSlot ID="genSlotMainNav" runat="server"  class="clearFix"/>
		<!-- END Main Navigation Slot (#genSlotMainNav) -->
		<div class="genSiteContentContainer clearFix noSidebars">
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
	<!-- Javscript Configuration Content // At Bottom -->
	<!-- END Javascript Configuration Content // At Bottom -->
	    <!-- TO INSERT WEB ANALYTICS CODE. Every template should have this 
    control else Web analytics scripts will not show up in the HTML-->
    <NCI:WebAnalyticsControl ID="WebAnalyticsControl1" runat="server" />

</body>
</html>