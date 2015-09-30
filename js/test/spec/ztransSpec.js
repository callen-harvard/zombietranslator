/**
 * This is the test spec file for Jasmine.
 *
 */
define(["ztrans"], function(ztrans) {

    describe("Zombify Object", function() {

      var _ztrans;

      beforeEach(function() {
          // there are no special constructor values needed for the
          // translate functions, so i'm just creating an object here
          // before each rule is run rather than in the rule itself (DRY).
          _ztrans = new ztrans();

          // used the following as a reference on how to setup a custom matcher:
          // http://jasmine.github.io/2.0/upgrading.html
          jasmine.addMatchers({
            toEndWith: function(util, customEqualityTesters) {
              return {
                compare: function(actual, expected) {
                  // for some reason actual.startsWith was failing using Karma
                  // but would work fine with Jasmine directly.
                  // see additional notes in ztrans.js on startsWith/endsWith
                  //var passed = actual.match("/" + expected + "$/");
                  // crediting this source for an alternative:
                  // http://stackoverflow.com/questions/4996033/regex-string-ends-with-not-working-in-javascript
                  var passed = actual.slice(-expected.length) == expected;
                  return {
                    pass: passed,
                    message: 'Expected ' + actual + ' to end with ' + expected
                  };
                }
              };
            },

            toStartWith: function(util, customEqualityTesters) {
              return {
                compare: function(actual, expected) {
                  // for some reason actual.startsWith was failing using Karma
                  // but would work fine with Jasmine directly.
                  // see additional notes in ztrans.js on startsWith/endsWith
                  //var passed = actual[0] == expected;
                  // crediting this source for an alternative (which i modified):
                  // http://stackoverflow.com/questions/4996033/regex-string-ends-with-not-working-in-javascript
                  var passed = actual.slice(expected.length) == expected;
                  return {
                    pass: passed,
                    message: 'Expected ' + actual + ' to start with ' + expected
                  };
                }
              };
            },

            toHaveMultiple: function(util, customEqualityTesters) {
              return {
                compare: function(actual, expected) {
                  // used the following stack overflow article to help figure
                  // out how to do counts:
                  // http://stackoverflow.com/questions/881085/count-the-number-of-occurences-of-a-character-in-a-string-in-javascript
                  var matches = actual.match(new RegExp(expected, "g")) || [];
                  var passed = matches.length > 1;
                  return {
                    pass: passed,
                    message: 'Expected ' + actual + ' to contain more than one occurrence of ' + expected
                  };
                }
              };
          },

            toHaveSingle: function(util, customEqualityTesters) {
              return {
                compare: function(actual, expected) {
                  var matches = actual.match(new RegExp(expected, "g")) || [];
                  var passed = matches.length == 1;
                  return {
                    pass: passed,
                    message: 'Expected ' + actual + ' to contain only one occurrence of ' + expected
                  };
                }
              };
            }

          });

      });

      describe("Zombify functions", function() {

          describe("Rule #1, lower-case 'r' at the end of words replaced with 'rh'", function() {
              it("should be able to translate 'Terror' correctly", function() {
                  expect(_ztrans.zombify('Terror')).toBe('TrrRRRRrrrRrrh');
              });
              it("should NOT end with rh at the end of 'TerroR'", function() {
                  expect(_ztrans.zombify('Terror')).toEndWith('rh');
              });
              it("should continue to work with punctionation.", function() {
                  expect(_ztrans.zombify('Terror.')).toContain('rh.');
              });
          });

          describe("Rule #2, replace an 'a' or 'A' with 'hra'", function() {
              it("should be able to translate a great zombie song band correctly", function() {
                  expect(_ztrans.zombify('cranberries')).toBe('cRRhranbrrRRRRrrRrrrzzz');
              });
              it("should contain hra inside 'brain'", function() {
                  expect(_ztrans.zombify('brain')).toContain('hra');
              });
              it("should not contain hra for 'bird'.", function() {
                  expect(_ztrans.zombify('bird')).not.toContain('hra');
              });
          });

          describe("Rule #3, capitalize the start of sentences", function() {
              it("should be able to translate and capitalize 'this is a test' correctly", function() {
                  expect(_ztrans.zombify('this is a test.')).toBe('ThrrRrzzz rrRrzzz hra trrst.');
              });
              it("should not capitalize a string of words withing ending punctionation", function() {
                  expect(_ztrans.zombify('this is a test')).not.toStartWith('T');
              });
              it("should contain two capitalized words when two sentences are present.", function() {
                  expect(_ztrans.zombify('this is a test. this is also a test.')).toHaveMultiple('T');
              });
          });

          describe("Rule #4, 'e' or 'E' is replaced by 'rr'", function() {
              it("should be able to translate 'lefty' correctly", function() {
                  expect(_ztrans.zombify('lefty')).toBe('lrrfty');
              });
              it("should have multiple 'rr' occurrences", function() {
                  expect(_ztrans.zombify('perfectly')).toHaveMultiple('rr');
              });
              it("should not contain any 'rr' occurrences", function() {
                  expect(_ztrans.zombify('havana')).not.toContain('rr');
              });
          });

          describe("Rule #5, 'i' or 'I' is replaced by 'rrRr'", function() {
              it("should be able to translate 'pink' correctly", function() {
                  expect(_ztrans.zombify('pink')).toBe('prrRrnk');
              });
              it("should have multiple 'rrRr' occurrences", function() {
                  expect(_ztrans.zombify('piny squirrel')).toHaveMultiple('rrRr');
              });
              it("should not contain any 'rrRr' occurrences", function() {
                  expect(_ztrans.zombify('elephants are large')).not.toContain('rrRr');
              });
          });

          describe("Rule #6, 'o' or 'O' is replaced by 'rrrRr'", function() {
              it("should be able to translate 'zoom' correctly", function() {
                  expect(_ztrans.zombify('zoom')).toBe('zrrrRrrrrRrm');
              });
              it("should have multiple 'rrrRr' occurrences", function() {
                  expect(_ztrans.zombify('the moon was gloomy')).toHaveMultiple('rrrRr');
              });
              it("should not contain any 'rrrRr' occurrences", function() {
                  expect(_ztrans.zombify('fright night')).not.toContain('rrrRr');
              });
          });

          describe("Rule #7, 'u' or 'U' is replaced by 'rrrrRr'", function() {
              it("should be able to translate 'turning' correctly", function() {
                  expect(_ztrans.zombify('turning')).toBe('trrrrRrRRnrrRrng');
              });
              it("should have multiple 'rrrrRr' occurrences", function() {
                  expect(_ztrans.zombify('succubus')).toHaveMultiple('rrrrRr');
              });
              it("should not contain any 'rrrRr' occurrences", function() {
                  expect(_ztrans.zombify('black is dark')).not.toContain('rrrrRr');
              });
          });

          describe("Rule #8, 'r' or 'R' is replaced by 'RR'", function() {
              it("should be able to translate 'terrific' correctly", function() {
                  expect(_ztrans.zombify('terrific')).toBe('trrRRRRrrRrfrrRrc');
              });
              it("should have multiple 'RR' occurrences", function() {
                  expect(_ztrans.zombify('terrified torture')).toHaveMultiple('RR');
              });
              it("should not contain any 'rrrRr' occurrences", function() {
                  expect(_ztrans.zombify('the car was moving fast.')).not.toContain('RR');
              });
          });

          describe("Rule #9, 'ei' or 'EI' replaced with 'rRRr'", function() {
              it("should be able to translate 'einsteinium' correctly", function() {
                  expect(_ztrans.zombify('einsteinium')).toBe('rRRrnstrRRrnrrRrrrrrRrm');
              });
              it("should have multiple 'rRRr' occurrences", function() {
                  expect(_ztrans.zombify('the freight was due to the weight')).toHaveMultiple('rRRr');
              });
              it("should not contain any 'rRRr' occurrences", function() {
                  expect(_ztrans.zombify('this rule will pass')).not.toContain('rRRr');
              });
          });

          describe("Rule #10, 's' at the of a word is replaced with 'zzz'", function() {
              it("should be able to translate 'zombies!' correctly", function() {
                  expect(_ztrans.zombify('zombies!')).toBe('ZrrrRrmbrrRrrrzzz!');
              });
              it("should have multiple 'zzz' occurrences", function() {
                  expect(_ztrans.zombify('the freight was due to the weight')).toHaveMultiple('rRRr');
              });
              it("should not contain any 'zzz' occurrences", function() {
                  expect(_ztrans.zombify('the moon wasn\'t very full last night.')).not.toContain('zzz');
              });
          });

          describe("General translation, these are the words given as examples.", function() {
              it("should be able to translate 'Terror' correctly", function() {
                  expect(_ztrans.zombify('Terror')).toBe('TrrRRRRrrrRrrh');
              });
              it("should be able to translate 'JaZahn' correctly", function() {
                  expect(_ztrans.zombify('JaZahn')).toBe('JhraZhrahn');
              });
              it("should be able to translate 'petty' correctly", function() {
                  expect(_ztrans.zombify('petty')).toBe('prrtty');
              });
              it("should be able to translate 'pretty' correctly", function() {
                  expect(_ztrans.zombify('pretty')).toBe('pRRrrtty');
              });
              it("should be able to translate 'brains' correctly", function() {
                  expect(_ztrans.zombify('brains')).toBe('bRRhrarrRrnzzz');
              });
              it("should be able to translate 'onomatopoeia' correctly", function() {
                  expect(_ztrans.zombify('onomatopoeia')).toBe('rrrRrnrrrRrmhratrrrRrprrrRrrRRrhra');
              });
          });
      });

      describe("UnZombify functions", function() {

          describe("Rule #1, at the end of words replace 'rh' with lower-case 'r'", function() {
              it("should be able to translate 'Terror' correctly", function() {
                  expect(_ztrans.unzombify('TrrRRRRrrrRrrh')).toBe('Terror');
              });
              it("should NOT end with rh at the end of 'TerroR'", function() {
                  expect(_ztrans.unzombify('TrrRRRRrrrRrrh')).toEndWith('or');
              });
              it("should continue to work with punctionation.", function() {
                  expect(_ztrans.unzombify('TrrRRRRrrrRrrh.')).toContain('r.');
              });
          });

          describe("Rule #2, replace 'hra' with 'a'", function() {
              it("should be able to translate a great zombie song band correctly", function() {
                  expect(_ztrans.unzombify('cRRhranbrrRRRRrrRrrrzzz')).toBe('cranberries');
              });
              it("should contain ai inside 'bRRhrarrRrn'", function() {
                  expect(_ztrans.unzombify('bRRhrarrRrn')).toContain('ai');
              });
              it("should not contain 'a' for 'brrRrRRd'.", function() {
                  expect(_ztrans.unzombify('brrRrRRd')).not.toContain('a');
              });
          });

          describe("Rule #3, capitalize the start of sentences", function() {
              it("should be able to translate and capitalize 'thrrRrzzz rrRrzzz hra trrst.' correctly", function() {
                  expect(_ztrans.unzombify('thrrRrzzz rrRrzzz hra trrst.')).toBe('This is a test.');
              });
              it("should not capitalize a string of words withing ending punctionation", function() {
                  expect(_ztrans.unzombify('thrrRrzzz rrRrzzz hra trrst')).not.toStartWith('T');
              });
              it("should contain two capitalized words when two sentences are present.", function() {
                  expect(_ztrans.unzombify('thrrRrzzz rrRrzzz hra trrst. thrrRrzzz rrRrzzz hralsrrrRr hra trrst.')).toHaveMultiple('T');
              });
          });

          describe("Rule #4, replace 'rr' with 'e'", function() {
              it("should be able to translate 'lrrfty' correctly", function() {
                  expect(_ztrans.unzombify('lrrfty')).toBe('lefty');
              });
              it("should have single 'r' occurrences", function() {
                  expect(_ztrans.unzombify('prrRRfrrctly')).toHaveSingle('r');
              });
              it("should not contain any 'rr' occurrences", function() {
                  expect(_ztrans.unzombify('hhravhranhra')).not.toContain('rr');
              });
          });

          describe("Rule #5, replace 'rrRr' with 'i'", function() {
              it("should be able to translate 'prrRrnk' correctly", function() {
                  expect(_ztrans.unzombify('prrRrnk')).toBe('pink');
              });
              it("should have multiple 'r' occurrences", function() {
                  expect(_ztrans.unzombify('prrRrny sqrrrrRrrrRrRRRRrrl')).toHaveMultiple('r');
              });
              it("should not contain any 'i' occurrences", function() {
                  expect(_ztrans.unzombify('rrlrrphhrantzzz hraRRrr lhraRRgrr')).not.toContain('i');
              });
          });

          describe("Rule #6, replace 'rrrRr' with 'o'", function() {
              it("should be able to translate 'zrrrRrrrrRrm' correctly", function() {
                  expect(_ztrans.unzombify('zrrrRrrrrRrm')).toBe('zoom');
              });
              it("should have multiple 'o' occurrences", function() {
                  expect(_ztrans.unzombify('thrr mrrrRrrrrRrn whrazzz glrrrRrrrrRrmy')).toHaveMultiple('o');
              });
              it("should not contain any 'o' occurrences", function() {
                  expect(_ztrans.unzombify('fRRrrRrght nrrRrght')).not.toContain('o');
              });
          });

          describe("Rule #7, replace 'rrrrRr' with 'u'", function() {
              it("should be able to translate 'trrrrRrRRnrrRrng' correctly", function() {
                  expect(_ztrans.unzombify('trrrrRrRRnrrRrng')).toBe('turning');
              });
              it("should have multiple 'u' occurrences", function() {
                  expect(_ztrans.unzombify('srrrrRrccrrrrRrbrrrrRrzzz')).toHaveMultiple('u');
              });
              it("should not contain any 'u' occurrences", function() {
                  expect(_ztrans.unzombify('blhrack rrRrzzz dhraRRk')).not.toContain('u');
              });
          });

          describe("Rule #8, replace 'RR' with 'r'", function() {
              it("should be able to translate 'trrRRRRrrRrfrrRrc' correctly", function() {
                  expect(_ztrans.unzombify('trrRRRRrrRrfrrRrc')).toBe('terrific');
              });
              it("should have single 'r' occurrence", function() {
                  expect(_ztrans.unzombify('trrrRrRRt')).toHaveSingle('r');
              });
              it("should not contain any 'r' occurrences", function() {
                  expect(_ztrans.unzombify('Thrr drrrRrg whrazzz mrrrRrvrrRrng fhrast.')).not.toContain('r');
              });
          });

          describe("Rule #9, replace 'rRRr' with 'ei'", function() {
              it("should be able to translate 'rRRrnstrRRrnrrRrrrrrRrm' correctly", function() {
                  expect(_ztrans.unzombify('rRRrnstrRRrnrrRrrrrrRrm')).toBe('einsteinium');
              });
              it("should have multiple 'ei' occurrences", function() {
                  expect(_ztrans.unzombify('thrr fRRrRRrght whrazzz drrrrRrrr trrrRr thrr wrRRrght')).toHaveMultiple('ei');
              });
              it("should not contain any 'ei' occurrences", function() {
                  expect(_ztrans.unzombify('thrrRrzzz RRrrrrRrlrr wrrRrll phraszzz')).not.toContain('ei');
              });
          });

          describe("Rule #10, replace 'zzz' at the end of words with 's'", function() {
              it("should be able to translate 'ZrrrRrmbrrRrrrzzz!' correctly", function() {
                  expect(_ztrans.unzombify('ZrrrRrmbrrRrrrzzz!')).toBe('Zombies!');
              });
              it("should have multiple 'ies' occurrences", function() {
                  expect(_ztrans.unzombify('ZhrambrrrRrnrrRrrrzzz hrand ZrrrRrmbrrRrrrzzz!')).toHaveMultiple('ies');
              });
              it("should not contain any 'ies' occurrences", function() {
                  expect(_ztrans.unzombify('Thrr mrrrRrrrrRrn whrasn\'t vrrRRy frrrrRrll lhrast nrrRrght.')).not.toContain('ies');
              });
          });

          describe("General translation, these are the words given as examples.", function() {
              it("should be able to translate 'mrrrRrrrrRrn' correctly", function() {
                  expect(_ztrans.unzombify('mrrrRrrrrRrn')).toBe('moon');
              });
              it("should be able to translate 'JhraZhrahn' correctly", function() {
                  expect(_ztrans.unzombify('JhraZhrahn')).toBe('JaZahn');
              });
              it("should be able to translate 'trrrRrRRtrrrrRrRRrr' correctly", function() {
                  expect(_ztrans.unzombify('trrrRrRRtrrrrRrRRrr')).toBe('torture');
              });
              it("should be able to translate 'pRRrrtty' correctly", function() {
                  expect(_ztrans.unzombify('pRRrrtty')).toBe('pretty');
              });
              it("should be able to translate 'bRRhrarrRrnzzz' correctly", function() {
                  expect(_ztrans.unzombify('bRRhrarrRrnzzz')).toBe('brains');
              });
              it("should be able to translate 'rrrRrnrrrRrmhratrrrRrprrrRrrRRrhra' correctly", function() {
                  expect(_ztrans.unzombify('rrrRrnrrrRrmhratrrrRrprrrRrrRRrhra')).toBe('onomatopoeia');
              });
          });
      });

    });

});
