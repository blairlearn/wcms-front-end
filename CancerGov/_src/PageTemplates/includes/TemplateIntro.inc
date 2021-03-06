<!--(bake-start _if="comment-block")-->
<!--
    This include is the top of all templates.  If things must change in the future please try your best to reuse as much as possible.  This
    template takes in one parameter:
    - template_name : The name of the .aspx file.  This is added as a comment to help front-end debugging.
-->
<!--(bake-end)-->
<%@ Page Language="C#" AutoEventWireup="true" Inherits="NCI.Web.CDE.UI.WebPageAssembler" %>
<%@ Register TagPrefix="NCI" Assembly="NCILibrary.Web.ContentDeliveryEngine.UI" Namespace="NCI.Web.CDE.UI.WebControls" %>
<%@ Register TagPrefix="Config" Assembly="NCILibrary.Web.ContentDeliveryEngine.UI" Namespace="NCI.Web.CDE.UI.Configuration" %>
<!DOCTYPE html>
<html id="htmlEl" runat="server">
<!-- {{template_name}}  -->
<head id="header" runat="server">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1, minimum-scale=1" />
    <title></title>

	<link rel="preconnect" crossorigin href="https://cdnjs.cloudflare.com"/>
	<link rel="preconnect" crossorigin href="https://ajax.googleapis.com"/>
	<link rel="preconnect" crossorigin href="https://fonts.gstatic.com"/>
	<link rel="preconnect" href="https://static.cancer.gov"/>
	<link rel="stylesheet" id="gFonts" href="https://fonts.googleapis.com/css?family=Noto+Sans:400,400i,700,700i" />

    <NCI:AdobeDTMControl ID="DTMTop" runat="server" />

    <!--(bake Favicons.inc)-->
</head>

<body id="Body1" runat="server">
<div class="skip"><a title="Skip to content" href="#<!--(bake-start _if="skipto_id")-->{{skipto_id}}<!--(bake-end)--><!--(bake-start _if="!skipto_id")-->content<!--(bake-end)-->">Skip to content</a></div>
<NCI:WebAnalyticsControl ID="WebAnalyticsData" runat="server" />
<!-- NOTIFICATION AREA -->
<NCI:TemplateSlot ID="nvcgSlNotificationArea" runat="server" CssClass="notification-banner" />
<NCI:TemplateSlot ID="nvcgColo" runat="server"  CssClass="notification-banner" />
<!-- END NOTIFICATION AREA -->

<!-- HEADER -->
<header class="push" role="banner">
    <NCI:TemplateSlot ID="nvcgSlSiteBanner" runat="server"
                      CssClass="row" AdditionalSnippetClasses="nci-logo-pages large-12 columns" />
</header>
<!-- END HEADER -->
<!-- Begin Page -->
<div id="page">
    <!-- Global nav/utilit bar/language  -->
    <div class="fixedtotop">
        <div class="headroom-area">
            <!-- LANGUAGE BAR -->
            <div class="language-bar">
                <div class="row sitewide-language">
                    <NCI:LanguageToggleControl ID="LangList1" CssClass="large-12 columns" runat="server">
                        <LanguageToggleLanguages>
                            <NCI:LanguageToggleLanguageItem Language="en">
                                <LangsCollection>
                                    <NCI:LanguageToggle Locale="es-us"
                                                        Name="Spanish"
                                                        Title="Espa&ntilde;ol"
                                                        OnClick="NCIAnalytics.ClickLink(this,'Language Select Spanish');" />
                                    <NCI:LanguageToggle Locale="pt-br"
                                                        Name="Portuguese"
                                                        Title="Portugu&ecirc;s"
                                                        OnClick="NCIAnalytics.ClickLink(this,'Language Select Portuguese');" />
                                    <NCI:LanguageToggle Locale="zh-cn"
                                                        Name="Chinese"
                                                        Title="&#20013;&#25991;"
                                                        OnClick="NCIAnalytics.ClickLink(this,'Language Select Chinese');" />
                                </LangsCollection>
                            </NCI:LanguageToggleLanguageItem>
                            <NCI:LanguageToggleLanguageItem Language="es">
                                <LangsCollection>
                                    <NCI:LanguageToggle Locale="en-us"
                                                        Name="English"
                                                        Title="English"
                                                        OnClick="NCIAnalytics.ClickLink(this,'Language Select English');" />
                                    <NCI:LanguageToggle Locale="pt-br"
                                                        Name="Portuguese"
                                                        Title="Portugu&ecirc;s"
                                                        OnClick="NCIAnalytics.ClickLink(this,'Language Select Portuguese');" />
                                    <NCI:LanguageToggle Locale="zh-cn"
                                                        Name="Chinese"
                                                        Title="&#20013;&#25991;"
                                                        OnClick="NCIAnalytics.ClickLink(this,'Language Select Chinese');" />
                                </LangsCollection>
                            </NCI:LanguageToggleLanguageItem>
                            <NCI:LanguageToggleLanguageItem Language="pt">
                                <LangsCollection>
                                    <NCI:LanguageToggle
                                        Locale="en-us"
                                        Name="English"
                                        Title="English"
                                        OnClick="NCIAnalytics.ClickLink(this,'Language Select English');" />
                                    <NCI:LanguageToggle
                                        Locale="es-us"
                                        Name="Spanish"
                                        Title="Espa&ntilde;ol"
                                        OnClick="NCIAnalytics.ClickLink(this,'Language Select Spanish');" />
                                    <NCI:LanguageToggle
                                        Locale="zh-cn"
                                        Name="Chinese"
                                        Title="&#20013;&#25991;"
                                        OnClick="NCIAnalytics.ClickLink(this,'Language Select Chinese');" />
                                </LangsCollection>
                            </NCI:LanguageToggleLanguageItem>
                            <NCI:LanguageToggleLanguageItem Language="zh">
                                <LangsCollection>
                                    <NCI:LanguageToggle Locale="en-us"
                                                        Name="English"
                                                        Title="English"
                                                        OnClick="NCIAnalytics.ClickLink(this,'Language Select English');" />
                                    <NCI:LanguageToggle Locale="es-us"
                                                        Name="Spanish"
                                                        Title="Espa&ntilde;ol"
                                                        OnClick="NCIAnalytics.ClickLink(this,'Language Select Spanish');" />
                                    <NCI:LanguageToggle Locale="pt-br"
                                                        Name="Portuguese"
                                                        Title="Portugu&ecirc;s"
                                                        OnClick="NCIAnalytics.ClickLink(this,'Language Select Portuguese');" />
                                </LangsCollection>
                            </NCI:LanguageToggleLanguageItem>
                        </LanguageToggleLanguages>
                    </NCI:LanguageToggleControl>
                </div>
            </div><!-- end "language-bar" -->
            <!-- END LANGUAGE BAR -->

            <!-- UTILITY NAV -->
            <NCI:TemplateSlot ID="nvcgSlUtilityBar" CssClass="utility-background hide-for-medium-down" AdditionalSnippetClasses="row utility" runat="server" />
            <!-- END UTILITY NAV -->
        </div><!-- end "headroom-area" -->
        <!-- BEGIN NAVIGATION -->
        <!-- Begin nav-search bar -->
        <div class="nav-search-bar gradient header"><NCI:TemplateSlot ID="nvcgSlMainNav" runat="server" CssClass="row" /></div>
        <!-- End nav-search bar -->

        <!-- END NAVIGATION -->
    </div><!-- END Global nav/utility bar/language -->
