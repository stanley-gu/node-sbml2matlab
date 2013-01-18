/*global ace */

$(document).ready(function() {

    //    var $inputModelText = $(document.createElement('div'));
    //    $inputModelText.height('40%');
    //    $inputModelText.width('80%');
    //    var editor = ace.edit($inputModelText[0]);
    //    editor.getSession().setMode("ace/mode/xml");
    //    $inputModelText.appendTo($('body'));
    //
    //    
    //    var $outputModel = $(document.createElement('div'));
    //    $outputModel.height('40%');
    //    $outputModel.width('80%');
    //    var editor2 = ace.edit($outputModel[0]);
    //    editor2.getSession().setMode("ace/mode/xml");
    //    $outputModel.appendTo($('body'));


    var editor1 = ace.edit("editor1");
    var editor2 = ace.edit("editor2");
    editor1.getSession().setMode("ace/mode/xml");
    editor2.getSession().setMode("ace/mode/xml");
    
    
    
    $("#accordion").accordion({
        fillSpace: true,
        change: function() {
            $(editor1).resize();
            $('div#editor2').width($('div#pane2').width());
            $(editor2).resize();
            if ($('#accordion').accordion('option', 'active') == 1) {
                
                translate(editor1.getValue(), editor2);

            }
        }
    });
    $('div#editor1').width($('div#pane1').width());
    editor1.resize();
    $(window).resize(function() {
        $('div#editor1').width($('div#pane1').width());
        $('div#editor2').width($('div#pane2').width());
        editor1.resize();
        editor2.resize();
    })

});

var translate = function(sbml, editor) {
    try {
        var xmlDocument = $.parseXML(sbml);

        var xmlRequest = $.ajax({
            url: "sbml2matlab",
            processData: true,
            data: {
                sbml: (new XMLSerializer()).serializeToString(xmlDocument)
            },
            dataType: "text",
            type: "POST",
            success: function(data, textStatus, jqXHR) {
                editor.setValue(data);
                return data;
            }
        });
    }
    catch (error) {
        editor.setValue("Something went wrong: " + error);
    }
};