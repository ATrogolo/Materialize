(function ($) {

  var options = [{
      selector: '#scrollfire-page .italians',
      offset: 50,
      callback: function (el) {
        Materialize.toast("Italians words loaded!", 1500, 'rounded');
        Materialize.showStaggeredList($(el));
      }
    },
    {
      selector: '#scrollfire-page .image.colosseum',
      offset: 50,
      callback: function (el) {
        Materialize.fadeInImage($(el));
      }
    }
  ];
  Materialize.scrollFire(options);

})(jQuery);