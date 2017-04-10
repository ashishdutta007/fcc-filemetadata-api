console.log('Inside client.js');

//On 'click'(submit) event upload file
/*$("#uploadForm").submit(function(error) {
    console.log("Inside submit event");
    //Get files from input[type='file'] to upload
    var file = $("#file-input").files;
    if (error) {
        return console.log('Error occurred', error);
    } else {
        console.log('Inside ajax request');
        $.ajax({
                url: '/upload',
                type: 'POST',
                dataType: 'json',
                data: formdata,
                success: function(data) {
                    console.log(data);
                    console.log("ajax success");
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
});
*/

$("#uploadForm").on('submit', function(event) {
    console.log('Inside form submission');
    //Prevent default behaviour on the event
    //So as to use ajax
    event.preventDefault();

    //Get files from input
    var files = $("#file-input").get(0).files;

    console.log(files[0].name);
    var formData = new FormData();

    if (files.length === 0) {
        alert('No files selected');
        return console.log("No files selected");
    }

    //Append files to FormData
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        formData.append('data', file, file.name);
        console.log('data' + 'file: ' + file + 'file.name ' + file.name);
    }

    console.log(formData);

    uploadFiles(formData);
});


function uploadFiles(formData) {
    console.log('Inside file upload');
    $.ajax({
            url: '/upload',
            type: 'POST',
            data: formData,
            //else throws Illegal invocation error as data needs to be serialized to be sent via ajax
            processData: false,
            contentType: false,
            success: function(data) {
                console.log(data);
                console.log("Success");
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
