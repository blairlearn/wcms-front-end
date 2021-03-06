# Frontend-2018: FEQ September Release

## [WCMSFEQ-192] Please Make Dictionary Search Results font styles Consistent with Sitewide Search Results
### (NO CONTENT CHANGES)

Description:
  * The dictionary results titles (Dictionary of Cancer Tersms, Drug Dictionary, Dictionary of Genetics Terms) need to be regular text instead of bold, however when you click to the page that shows the term page, it needs to be bold.
  * Targeted links that are in the definition of dictionary lists.

## [WCMSFEQ-464] Resolve jQuery ready and load events.
### (NO CONTENT CHANGES)

Sorting out document.ready and window.load events. Updating a few modules for more streamlined execution order.

## [WCMSFEQ-639] Set up proper event delegation for analytics.after.js
### (NO CONTENT CHANGES)

Added "On This Page" analytics to the analytics.js "load" event. Click events will be bound after the OTP element has been rendered to the DOM in the document.ready event

## [WCMSFEQ-909] The Help-link is overlapping the blue heading label Type/Condition...
## (NO CONTENT CHANGES)

The help-icon was overlapping the Type/Condition heading label at the 326px breakpoint and lower.
  * Changed padding-right of fieldset legend to 43px to prevent icon overlapping text 

## [WCMSFEQ-914] Email for providers appears next to phone number under Location Contacts
### (NO CONTENT CHANGES)

Provider emails were appearing next to the phone number (rather than on the following line) under Locations and Contacts accordion:
  * added <br> to Email line in CTSDrawLocations include file
  * added word-wrap: break-word to prevent email addresses from being cut off (and not visible) at 511px bp and lower
  
## [WCMSFEQ-1037] Update Tweet This graphic
### (NO CONTENT CHANGES)

The Tweet This feature as seen on /about-nci/organization/crchd/inp/screen-to-save/connect is being updated with a new SVG and modified CSS rules
  * Upload updated svg-sprite.svg from /images/design-elements/sprites in the build to /images/design-elements/sprites folder in Percussion
  * Updates to CSS to add brackets around the text, change SVG background positioning, change font color, size and family.

## [WCMSFEQ-1043] Adding support for Highmaps
### (NO CONTENT CHANGES)
This update will allow lazy loading of Highmaps when the necessary chart type is defined in Fact Book pages. This is needed to support development on `about-nci/budget/fact-book/extramural-programs/grant-contract-awards`

## [WCMSFEQ-1079] Seeing the blue bar with the text "Cancer Currents Blog"...
### (NO CONTENT CHANGES)

At 1024px breakpoint, the Section Menu was defaulting to an open state and showing the submenu that it contains.  This was occurring on every page that invokes the Section Menu Nav button, not just the Cancer Currents Blog page.
  * Set min-width for the section menu resizeHandler to 1025px to prevent the section menu navigation from defaulting to open at the 1024px breakpoint

## [WCMSFEQ-1114] White Space on Landing Pages 
### (NO CONTENT CHANGES)

Since there is no content in the multimedia slot of the About Cancer, El Cancer, Investigacion, Subvenciones-Capacitacion, and Nuestro Instituto landing pages, they all have an extra white space between the last multimedia card and the footer.  Removed the bottom margin in the multimedia slot to alleviate the white space.
  * Used psuedo selector to target just the last set of cards on the page
  * Corrects the same issue on NCI connect guide card row

## [WCMSFEQ-1119] Change font style attributes on inline feature cards
### (NO CONTENT CHANGES)

The text in the inline feature cards was too large for the space, which caused most lines to break to one word. The H3 and p font sizes were reduced, along with a slight line-height and color change. 


## [WCMSFEQ-1128] Remove Scrollbar from Megamenu
### (NO CONTENT CHANGES)

The goal of this ticket is to enhance the usability of the megamenu by removing the scrollbar. 
  * Removed the mega-menu-scroll class and set subnav max open height to 450px
  * Updated font size and line height for submenu list items and titles
  * Re-adjusted subnav max open height to 460px and line height of sub-nav-mega class to 1.1em to accomodate largest spanish mega menu list items
  * updated right margin of sub-nav-mega ul to 3% to increase space between columns in the megamenu list

## [WCMSFEQ-1136] Webpack 4 Update
### Content Changes
  1. Add new Style Sheet Info item to /Configuration/css/ folder
  2. Name the new Style Sheet Info item `Common.css` and upload `Styles\Common.css` to it
  3. Update CDE templates to use Common.css and remove nvcg.css
    1. Navigate to /Configuration/cde/
    2. Put all `Page Template Info` items into edit mode
    3. For each item:
      1. add the Common.css style sheet to the Style Sheet Info Slot
      2. remove the nvcg.css item
      3. Move Common.css to the top of the list

This ticket updates Webpack from our current version 3 to 4. We've restructured the packages a bit so the Common.js file is smaller and page specific files are a little larger. This will mean less JavaScript parsing overall for most pages, and hopefully a minor page speed boost to most pages as well.


## [WCMSFEQ-1153] Update Dictionary Widget Search Button contrast for 508
### (NO CONTENT CHANGES)

Button color for the dictionary widget that is used on other sites was reported to have 508 color contrast issues. This widget can be seen on /syndication/widgets.
  * Changed Search button background color to #62539D
  * Changed Search button hover background color to #4B3F78
  * Changed top border of the widget to #62539D

## [WCMSFEQ-1163] Blog section menu drop-down positioning bug in Safari
### (NO CONTENT CHANGES)

The absolutely positioned section nav was behaving differently in Safari. This change adds a position relative rule to the main-content container and realigns the section nav relatie to that, for a more standardized approach.
  * Moved the relative positioning from main-content div to general-page-body-container to correctly target the section-menu-button and underlying overlay div.


# Notes

Template files have been updated in **WCMSFEQ-914** and they should be uploaded to Percussion as part of this FEQ release
