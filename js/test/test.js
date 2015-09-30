/**
 * Configure RequireJS to look in the appropriate
 * directories. Also, "shim" in dependencies that
 * are not AMD-compliant, and list out their dependencies.
 *
 */
 requirejs.config({
    "baseUrl": "../app",
    "paths": {
        'jasmine': '../test/lib/jasmine-2.3.4/jasmine',
    	'jasmine-html': '../test/lib/jasmine-2.3.4/jasmine-html',
    	'boot': '../test/lib/jasmine-2.3.4/boot',
    	'jquery': '../vendors/jquery.min',
    },
    shim: {
    	'jasmine': {
        	//exports: 'window.jasmineRequire'
      	},
    	'jasmine-html': {
    		deps: ['jasmine'],
    		//exports: 'window.jasmineRequire'
    	},
    	'boot': {
    		deps: ['jasmine', 'jasmine-html'],
    		//exports: 'window.jasmineRequire'
    	}
    }

});


/**
 * Inject/require the main application, which is stored at
 * js/app/main.js.
 *
 * @param {array} - List of dependencies required to run.
 * @param {function} - Callback function that runs everything.
 *
 */
 requirejs(["boot"], function() {
	 console.log('Everything is set up.');

	// Load the specs
    require(["../test/spec/ztransSpec.js"], function () {
    	// Initialize the HTML Reporter and execute the environment (setup by `boot.js`)
    	window.onload();
    });
});
