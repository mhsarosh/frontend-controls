$(function () {
    
    initializeControls();

    // ======================================================================
    // Event Handlers
    // ======================================================================
    // Registers Add button click handler
    $(".mutltitext-input-button").click(function () {

        var element = mainElement($(this));

        setMultiTextInputValues(element);
        var badgesControl = $(element).find(".multitext-value-badge").first();
        showBadges(getValuesArray(element), badgesControl);
    });
    // ======================================================================
    // Event Handlers End
    // ======================================================================


    // ======================================================================
    // Control Helper Functions
    // ======================================================================
    // Initialize controls
    function initializeControls() {
        $(".multitext-input").each(function() { initialize(this); });
    }

    function initialize(element) {
        var html = '<div class="input-group mb-3">'.concat(
            '<input type="text" class="multitext-entry-value" class="form-control" aria-describedby="basic-addon2">',
            '<div class="input-group-append">',
            '    <button class="btn btn-outline-secondary mutltitext-input-button" type="button">Add</button>',
            '</div>',
        '</div>',
        '<div class="multitext-value-badge">',
        '</div>');
        
        $(element).prepend(html);

        var attributes = getAttributes($(element));
        if (attributes != undefined) {

            var textBox = $(element).find(".multitext-entry-value");

            for (var attrKey in attributes) {
                if (attributes.hasOwnProperty(attrKey)) {

                    var attrValue = attributes[attrKey];
                    if(attrKey == 'class'){
                        attrValue = $(textBox).attr('class').concat(' ', attrValue);
                    }

                    $(textBox).attr(attrKey, attrValue);
                }
            }
        }
    }

    // Gets main div for control
    function mainElement(control) {
        return $(control).closest(".multitext-input");
    }

    // Gets control with values
    function getValuesHiddenControl(element){
        return $(element).find(".multitext-input-values").first();
    }

    // Gets value for control as Array
    function getValuesArray(element) {
        
        var array;
        var csv = getCSVs(element);
        if(csv != undefined && csv != ''){
            array = csv.split(',');
        }

        if(array == undefined){
            array = [];
        }
        return array;
    }

    // Gets Comma separated values from control
    function getCSVs(element) {
        var outputControl = getValuesHiddenControl(element);
        return $(outputControl).val();
    }

    // Pushes value to control, if does not exists already
    function pushValue(element, value) {
        var currentValues = getValuesArray(element);
        if (value != '' && !isExists(currentValues, value)) {
            currentValues.push(value);
            updateValues(element, currentValues);
        }
    }

    // Removes value from control
    function removeValue(element, value) {
        var updatedValues = remove(getValuesArray(element), value);
        updateValues(element, updatedValues);
    }

    // Updates values for control
    function updateValues(element, array) {
        getValuesHiddenControl(element).val(array.join(','));
    }

    // Adds value to control
    function setMultiTextInputValues(element) {
        var val = $(element).find(".multitext-entry-value").first().val();
        if (val != undefined) {
            val = val.trim();
            pushValue(element, val);
        }
    }

    function getAttributes ($node) {
        var attrs = {};
        $.each( $node[0].attributes, function ( index, attribute ) {
            if (attribute.name.startsWith("mi-")) {   
                attrs[attribute.name.substring(3)] = attribute.value;
            }
        } );
    
        return attrs;
    }
    // ======================================================================
    // Control Helper Functions Ends
    // ======================================================================

    // ======================================================================
    // Badge Functions
    // ======================================================================
    // Adds badges to control from array
    function showBadges(array, parent) {

        $(parent).html('');

        if (array != undefined && array.length > 0) {
            for (var i = 0; i < array.length; i++) {
                showBadge(array[i], $(parent));
            }

            $(".badge-close-btn").click(function () {

                var badge = $(this).closest(".badge");
                var badgeVal = $(badge).find(".badge-value").first().html();
                
                removeValue(mainElement(this), badgeVal);
                $(badge).remove();
            });
        }
    }

    // Adds a badge
    function showBadge(val, parent) {
        var html = '<span class="badge badge-primary"><span class="badge-value">' + val + '</span><button type="button" class="close badge-close-btn" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></span>';

        $(parent).append(html);
    }
    // ======================================================================
    // Badge Functions Ends
    // ======================================================================


    // ======================================================================
    // Array Helper Functions
    // ======================================================================
    // Determines whether value exists in array
    function isExists(array, value) {
        var index = array.indexOf(value);

        if (index > -1) {
            return true;
        }
        else {
            return false;
        }
    }

    // Removes value from array
    function remove(array, value) {
        var index = array.indexOf(value);
        if (index > -1) {
            array.splice(index, 1);
        }
        return array;
    }
    // ======================================================================
    // Array Helper Functions End
    // ======================================================================
});