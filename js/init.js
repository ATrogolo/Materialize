(function ($) {
  $(function () {

    function howOldAmI() {
      var today = new Date();
      var years = today.getFullYear() - 1988;
      if (today.getMonth() + 1 < 11) {
        years -= 1;
      }
      $('footer #yearsold').text(years);

      ga('send', 'event', 'selection', 'howOldAmI', `${years}`);
    };

    function handleFormSubmit(event) {
      event.preventDefault();

      // Randomly select one of two progress bar in the page
      var $progress = (Math.floor((Math.random() * 10) % 2) == 0) ? $('#forms-page .progress') : $('#forms-page .progress-spinner')

      // Show progress bar
      $progress.toggleClass('hide');

      var formSerialized = $('#forms-page #user-data').serialize().split('&').join(' ');
      ga('send', 'event', 'selection', 'FormSubmit', formSerialized);

      setTimeout(function () {
        var mailAddress = "trogolo.andrea@gmail.com";
        var mailSubject = "[INFO] - Submitted data from Materialize";
        var mailBody = "";
        var tokens = [];
        var formInput = $('#forms-page #user-data').serialize();
        formInput = formInput.split('&');

        for (var i = 0; i < formInput.length; i++) {
          tokens = formInput[i].split('=');
          if (tokens[1].length > 0) {
            mailBody += tokens[0] + " >> " + tokens[1];
            mailBody += "%0A"; // newline
          }
        }

        window.open(`mailto:${mailAddress}?subject=${mailSubject}&body=${mailBody}`);

        // Show a toast after sending mail
        $progress.toggleClass('hide');
        Materialize.toast('The email has been sent', 10000, 'rounded');
      }, 3000);
    }

    // Init hamburger menù
    $('.button-collapse').sideNav({
      edge: 'left',
      closeOnClick: true,
      draggable: true
    });

    // Init parallax containers
    $('.parallax').parallax();

    $($('#nav-mobile a')[0]).on('click', function () {
      $('.button-collapse').sideNav('hide');
    });

    // Init all select fields
    $('select').material_select();

    // Init all datepickers
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 25, // Creates a dropdown of 15 years to control year,
      today: 'Today',
      clear: 'Reset',
      close: 'Ok',
      closeOnSelect: false // Close upon selecting a date,
    });

    // Init all carousels
    $('.carousel-small').carousel({
      indicators: true
    });

    $('.carousel-slider').carousel({
      indicators: true,
      fullWidth: true
    });

    // Send filled form inputs by mail
    $('#forms-page #submit-btn').on('click', handleFormSubmit);

    // Track clicks
    $('#get-started-button').on('click', function (event) {
      ga('send', 'event', 'selection', 'get-started-button', 'true');
    });
    $('.contacts a').on('click', function (event) {
      var contactLabel = $(event.currentTarget).find('span').text();
      ga('send', 'event', 'selection', 'contacts', contactLabel);
    });

    howOldAmI();
  });
})(jQuery); // end of jQuery name space