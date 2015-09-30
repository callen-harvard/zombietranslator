/**
 * This is the main application that handles toZombie and toEnglish
 * translation.
 *
 */
define(["jquery", "ztrans"], function($, ztrans) {
    /*
    * The main Zombie Translator app.
    *
    */
    $('document').ready(function() {
        $('#english').on("keyup", toZombie);
        $('#zombie').on("keyup", toEnglish);
    });

    function toZombie() {
        var translator = new ztrans();
        var zombieSpeak = translator.zombify($('#english').val());
        $('#zombie').val(zombieSpeak);
    }
    function toEnglish() {
        var translator = new ztrans();
        var englishSpeak = translator.unzombify($('#zombie').val());
        $('#english').val(englishSpeak);
    }
});
