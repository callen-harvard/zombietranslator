/**
 * Configure RequireJS to look in the appropriate
 * directories. Also, "shim" in dependencies that
 * are not AMD-compliant, and list out their dependencies.
 *
 */
 requirejs.config({
    "baseUrl": "js/vendors",
    "paths": {
      "jquery": "jquery.min",
      "ztrans": "../app/ztrans",
      "ZombieTranslator": "../app/ZombieTranslator"
    },
});

/**
 * Inject/require the main application, which is stored at
 * js/app/main.js.
 *
 * @param {array} - List of dependencies required to run.
 * @param {function} - Callback function that runs everything.
 *
 */
 requirejs(["jquery", "ZombieTranslator"], function() {
	 console.log('Everything is set up.');
});
