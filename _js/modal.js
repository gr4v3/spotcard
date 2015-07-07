$(document).ready(function () {
    $('#login').click(function (e) {
        e.preventDefault();

        var id = $('#dialog');

        var maskHeight = $(document).height();
        var maskWidth = $(window).width();

        $('#mask').css({'width': maskWidth, 'height': maskHeight});

        $('#mask').fadeIn(1000);
        $('#mask').fadeTo("slow", 0.8);	//opacity 80%

        //Get the window height and width
        var winH = $(window).height();
        var winW = $(window).width();

        $(id).css('top', winH / 2 - $(id).height() / 2);
        $(id).css('left', winW / 2 - $(id).width() / 2);

        $(id).fadeIn(2000);


        var form = document.getElementById('form_login');
        form.onsubmit = function () {
            var email = this.elements.email.value.replace('@', '%40');

            spotcard.login(email, this.elements.password.value, function (response) {

                $('.window .close').click();

                spotcard.token = response.user.token;
                spotcard.categories(function () {
                    calculatePadding("#service_area");
                    nextcat();
                });


            });

            return false;

        };


    });

    $('.window .close').click(function (e) {
        e.preventDefault();

        $('#mask').hide();
        $('.window').hide();
    });

    $('#mask').click(function () {
        $(this).hide();
        $('.window').hide();
    });

});