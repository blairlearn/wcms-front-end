define(function(require) {
    require('jquery');

    var LIMIT = 12,
        checkedTrials = JSON.parse(sessionStorage.getItem('totalChecked')) || [],
        totalChecked = checkedTrials.length
    ;

    function _initialize() {

        // inset checkboxes next to each result
        $(".clinical-trial-individual-result")
            .prepend(function(){
                var nciid = this.attributes['data-nciid'].value;

                // check if this item is already in storage
                var checked = checkedTrials.indexOf(nciid) > -1?'checked':'';

                // create a checkbox for this individual result
                return '<div class="cts-checkbox checkbox"><input id="' + nciid + '" type="checkbox" '+ checked +' /><label for="' + nciid + '"></label></div>'

            })
            .find('label').on('click',function(e){ // checkbox click event

                // UpdateCheckedTrialsList will return false if totalChecked is past the LIMIT
                var check = UpdateCheckedTrialsList(this.attributes['for'].value, this.previousElementSibling.checked);

                if(!check) e.preventDefault(); // this will prevent the checkbox from being checked

            })
            .prev().on('change',function(){
                // see if all checkboxes on the page are checked
                areAllChecked();
            });

        // cache the checkboxes for later
        $checkboxes = $('.cts-checkbox input');

        // duplicate footer pagination
        var $topPager = $(".ct-listing-pager").clone();

        // create Select All and Print Selected controls and markup
        var $topSelect = $('<div class="selections-area">' +
                '<span class="checkbox cts-results-select-all">' +
                    '<input id="checkAllTop" type="checkbox" />' +
                    '<label for="checkAllTop"><strong>Select All on Page</strong></label>' +
                '</span>' +
                '<input class="action button printSelected" type="submit" name="printButton" value="Print Selected" alternatetext="Print Selected" />' +
            '</div>');

        // put pagination and 'select all' in a wrapper for top control
        var $topControl = $('<div class="cts-results-top-control" />').append($topPager,$topSelect);


        // insert top controls after the title
        $(".cts-results-title").after($topControl);

        // create the lower control
        var $lowerControl = $('<div class="cts-results-lower-control" />');

        // insert lower pager into bottom controls
        $lowerControl.append($('.lower-pager-control'),$topSelect.clone())
            .find("#checkAllTop").attr('id','checkAllLower') // update the checkbox id
            .next().attr('for','checkAllLower'); //update the for attribute

        // insert lower controls after results container
        $lowerControl.insertAfter('.cts-results-container');


        // check if all checkboxes are checked - if so check Select All as well
        areAllChecked();


        // check all checkbox click event
        $("#checkAllTop, #checkAllLower").on('click',function(){
            var $this = $(this);
            var isChecked = this.checked;

            // toggle the duplicate selectAll checkbox at the top or bottom of the page
            if ($this.is("#checkAllTop")) {
                $("#checkAllLower").prop("checked",isChecked);
            } else {
                $("#checkAllTop").prop("checked",isChecked);
            }

            // loop through all item checkboxes
            $('.cts-results-container').find('input').each(function(){
                var $this = $(this);

                // if this checkbox is not checked and the 'select all' IS checked then...
                if (!$this.is(':checked') && isChecked) {
                    // if we're still below the limit
                    if(totalChecked < LIMIT ) {
                        // check the box by triggering click - this will update the totalChecked and sessionStorage
                        $this.next().click();
                    } else {
                        // we're over the limit, but we send one more click anyway to propagate the modal show event
                        $this.next().click();

                        // uncheck 'select all' boxes since operation was unsuccessful
                        $("#checkAllTop, #checkAllLower").prop("checked",false);

                        // exit the loop
                        return false
                    }
                }
                // else if the checkbox is checked and the 'select all' IS NOT checked
                else if ($this.is(':checked') && !isChecked){
                    // uncheck the item by triggering click - this will update totalChecked and sessionStorage
                    $this.next().click();
                }
            });
        });

        $(".printSelected").on('click', function(event){
            // TODO: disable form submit until success or failure

            console.log("Attempting to print trials " + JSON.parse(sessionStorage.getItem("totalChecked")));
            $.ajax({
                type: "POST",
                url: "/CTS.Print/GenCache",
                data: JSON.stringify({TrialIDs: sessionStorage.getItem('totalChecked')}),
                dataType: "json",
                jsonp: false,
                success: function(response) {
                    console.log("Success, return is: " + response.printID);
                    window.location="/CTS.Print/Display?printid=" + response.printID;
                },
                error:function(jqXHR, textStatus, errorThrown){
                    console.log("Error occurred " + errorThrown + "; text status: " + textStatus);
                }
            });
        });
    }

    function UpdateCheckedTrialsList(src, isChecked) {

        // remove id symbol just in case
        var trial = src.replace("#", "");

        console.log("Items parsed from storage: ", checkedTrials);

        if (isChecked) { // Uncheck it
            if (checkedTrials.indexOf(trial) > -1) {
                var index = checkedTrials.indexOf(trial);
                checkedTrials.splice(index, 1);
                totalChecked--;
            }
        }
        else { // Check it

            // Check if we've hit the limit - if so trigger warning modal
            if(totalChecked >= LIMIT ){
                triggerModal('limit');
                return false;
            }
            else if ($.inArray(trial, checkedTrials) == -1) {
                checkedTrials.push(trial);
                totalChecked++;
            }
        }

        // update the session storage
        sessionStorage.setItem('totalChecked',JSON.stringify(checkedTrials));

        console.log("totalChecked: " + totalChecked);
        console.log("Items set in storage: ",JSON.stringify({ TrialIDs: checkedTrials}));
        console.log("--------------------------------------------");

        return true;

    }

    function areAllChecked() {
        if ($(".cts-results-container input:checked").length === 10) {
            // all are checked
            $("#checkAllTop, #checkAllLower").prop("checked",true);
        }  else {
            // not all are checked
            $("#checkAllTop, #checkAllLower").prop("checked",false);
        }
    }

    function triggerModal(type){
        console.log('Modal triggered: ',type);
        var modal = $('<div>Sorry, but you can\'t select more than '+ LIMIT +' items to print</div>').dialog({
            dialogClass: 'cts-feedback-dialog',
            title: 'Send us your feedback',
            autoOpen: false,
            modal: true,
            resizable: false,
            draggable: false,
            width: '600px',
            position: {
                my: "center",
                at: "center",
                of: window
            },
            show: { effect: "puff",percent:50, duration: 250 },
            hide: { effect: "puff",percent:50, duration: 250 }
        });
        modal.dialog('open');
    }

    /**
     * Identifies if this enhancement has been initialized or not.
     * @type {Boolean}
     */
    var initialized = false;

    /**
     * Exposed functions available to this module.
     */
    return {
        init: function() {
            if (initialized) {
                return;
            }

            _initialize();
            initialized = true;
        }
    };
});
