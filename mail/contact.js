$(function () {

    // Keep client-side validation but let the browser submit
    $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
        preventSubmit: false,
        submitError: function ($form, event, errors) {
        },
        submitSuccess: function ($form, event) {
            // Let the native form submission to formbackend.com proceed
        },
        filter: function () {
            return $(this).is(":visible");
        }
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

$('#name').focus(function () {
    $('#success').html('');
});
