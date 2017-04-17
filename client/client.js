console.log('Inside client.js');

//Client script to upload form on submit
$("#uploadForm").on('submit', function(event) {
    console.log('Inside on submit form submission');

    //Prevent default behaviour on the event, to use ajax
    event.preventDefault();
    //Get files from input field array
    var files = $("#file-input").get(0).files;
    console.log(files[0].name);
    //FormData object to send data as key-value pairs inside object
    var formData = new FormData();
    if (files.length === 0) {
        return console.log("No files selected");
    }
    //Append files to FormData
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        //append 
        formData.append('data', file, file.name);
        console.log('data file: ' + file + 'file.name ' + file.name);
    }
    console.log(formData);
    uploadFiles(formData);
});

//Uplaod file ajax call
function uploadFiles(formData) {
    console.log('Inside file upload ajax call');
    //jQuery ajax call	
    $.ajax({
            url: '/upload',
            type: 'POST',
            data: formData,
            //else throws Illegal invocation error as data needs to be serialized to be sent via ajax
            processData: false,
            contentType: false,
            success: function(data) {
                console.log(data.filename + "--" + data.size + "--" + data.type);
                $("#result").html(JSON.stringify(data));
            },
            fail: function() {
                console.log("Fail error");
            }
        })
        .done(function() {
            console.log("success");
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
}
