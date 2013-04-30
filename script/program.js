function getCityFromZipCode(sZipcodeSelector, sTargetSelector) {
  var sLoadingClass = 'loading';
  var $sTargetSelector = jQuery(sTargetSelector);
  var $sZipcodeSelector = jQuery(sZipcodeSelector);
  $sTargetSelector.html("");


  if ($sTargetSelector.length > 0 && $sZipcodeSelector.length > 0) {

    var sZipCode = $sZipcodeSelector.val();
    //DK post-nummer er en string med længden på 4
    //For at undgå unødvendig $.ajax call til serveren.
    if (sZipCode.length == 4) {
      $sTargetSelector.removeClass(sLoadingClass).addClass(sLoadingClass);
      $.ajax({
        url: 'http://geo.oiorest.dk/postnumre/' + sZipCode + '.json?callback=?',
        method: 'get',
        dataType: 'json',
        crossDomain: true,
        success: function(data) {
          $sTargetSelector.html(data.navn);
          $sTargetSelector.removeClass(sLoadingClass);
        }
      });

      return true;
    }
  } else {

    return false;
  }
}


$(function() {

  $('#postNummer').focus();

  $('#postNummer').on('keyup', function() {
    getCityFromZipCode('#postNummer', '#byNavn');
  });
});
