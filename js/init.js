(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();

    $($('#nav-mobile a')[0]).on('click', function(){
      $('.button-collapse').sideNav('hide');
    });

  }); // end of document ready
})(jQuery); // end of jQuery name space