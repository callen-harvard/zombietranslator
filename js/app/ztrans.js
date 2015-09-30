define([], function() {
  /**
	 * Creates a ztrans object
	 * @constructor
	 *
	 */
  var ztrans = function() {
    return this;
  }

  // general note on structure. the initial assignment seemed to indicate
  // we needed to create separate functions for each rule. however, further
  // clarification in the discussion board indicated it would be better to
  // have all the rules inside a single function:
  // Question from Jayendran Shanmugam on Tuesday, 9/22:
  //   "I have a basic question. Should we convert each rule to a separate
  //    function or we can execute all the 10 rules in single function and get
  //    the result? "
  // Response from JaZahn Clevenger on Tuesday, 9/22:
  //   "They don't all need to be a separate function. In fact, they probably
  //    shouldn't be. But each rule should be tested with its own test (it())."
  // this is why all my rules are in the one zombifyWord and unzombifyWord.

  /**
	 * Creates a zombify function
	 * this function takes a string and returns the 'zombified' version of it.
     * this function pulls apart multiple words, zombifying each one and
     * also handles capitalizing sentences.
	 */
  ztrans.prototype.zombify = function(str) {
    // 1. lower-case "r" at the end of words replaced with "rh".
    // 2. an "a" or "A" by itself will be replaced with "hra".
    // 3. the starts of sentences are capitalised (the "start of a sentence" is any occurrence of
    //   ".!?", followed by a space, followed by a letter.)
    // 4. "e" or "E" is replaced by "rr"
    // 5. "i" or "I" is replaced by "rrRr"
    // 6. "o" or "O" is replaced by "rrrRr"
    // 7. "u" or "U" is replaced by "rrrrRr"
    // 8. "r" or "R' is replaced by "RR"

    // it took me a while to figure out why i couldn't call one prototype
    // function from another prototype function. i found this entry on
    // stack overflow that helped explain how it's done:
    // http://stackoverflow.com/questions/9749969/in-javascript-how-can-i-call-one-prototype-method-in-another-prototype-method
    // once i read that, the use of that in the professor's code made sense!
    var that = this;
    var translation = str.replace(/([^ \t]+)/g, function(_, word) { return that.zombifyWord(word); });

    // 3. captialize the start of sentences
    return that.capitalizeSentences(translation);
  }

  /**
	 * Creates a zombifyWord function
	 * this function takes a single word and returns the 'zombified' version of
     * it.
	 */
  ztrans.prototype.zombifyWord = function(word) {
    // grab the last character as several rules use it and that
    // way we don't have to get it more than once.
    var lastc = word.charAt(word.length - 1);

    // remove the punctuation so we don't interfere with any rules
    // that are checking the end of word.
    var punctuation = '';
    if (lastc == '.' || lastc == '?' || lastc == '!') {
      word = word.substring(0, word.length - 1);
      punctuation = lastc;
      // get the next lastc, which is the character before
      // the punctuation as some rules use the last letter.
      lastc = word.charAt(word.length - 1);
    }

    // 1. lower-case "r" at the end of words replaced with "rh".
    var shouldAddRH = false;
    // this rule needs to be looked at first, before the last
    // character changes due to any rules that may be running.
    if (lastc == 'r') {
      shouldAddRH = true;
      // remove the last r character so it doesn't
      // participate in the rules. the rh will
      // get added in once the rules have run.
      word = word.substring(0, word.length - 1);
    } else if (lastc == 's') {
      // 10. (my rules) "s" at the end of a word is replaced
      // with "zzz"
      word = word.substring(0, word.length - 1) + "zzz";
    }

    // brains -> bRRhrarrRrns
    //           bRRhrarrRrns

    // terror -> TrrRRRRrrrRrrh
    //           trrRRRRrrrRrrh

    // onomatopoeia -> rrrRrnrrrRrmhratrrrRrprrrRrrrrrRrhra
    //                 rrrRrnrrrRrmhratrrrRrprrrRrrrrrRrhra
    // onomatopoua

    // 8. "r" or "R' is replaced by "RR"
    // running 'r' rule first so we don't run it again on
    // translated r characters.
    word = word.replace(/r/ig, 'RR');

    // 2. an "a" or "A" is replaced with "hra"
    word = word.replace(/a/ig, 'hra');

    // 9. (my rule) "ei" or "EI" is replaced by "rRRr"
    // this rule "fixes" the issue with e and i (where
    // they would both translate to the same set of letters
    // thus becoming a problem for un-zombifying).
    word = word.replace(/ei/ig, 'rRRr');

    // 4. "e" or "E" is replaced by "rr"
    word = word.replace(/e/ig, 'rr');

    // 5. "i" or "I" is replaced by "rrRr"
    word = word.replace(/i/ig, 'rrRr');

    // 6. "o" or "O" is replaced by "rrrRr"
    word = word.replace(/o/ig, 'rrrRr');

    // 7. "u" or "U" is replaced by "rrrrRr"
    word = word.replace(/u/ig, 'rrrrRr');

    if (shouldAddRH) {
      //shouldAddRH = true;
      word = word + "rh";
    }

    // add the punctuation back in
    if (punctuation != '') {
      word = word + punctuation;
    }

    return word;
  }
  /**
	 * Creates a unzombify function
	 * this function takes a string and returns the 'unzombified' version of it.
     * this function pulls apart multiple words, unzombifying each one and
     * also handles capitalizing sentences.
	 */
  ztrans.prototype.unzombify = function(str) {
    var that = this;
    var translation = str.replace(/([^ \t]+)/g, function(_, word) { return that.unzombifyWord(word); });

    // 3. captialize the start of sentences
    return this.capitalizeSentences(translation);
  }

  /**
	 * Creates a unzombifyWord function
	 * this function takes a single word and returns the 'unzombified' version
     * of it.
	 */
  ztrans.prototype.unzombifyWord = function(word) {
    // note: casing matters in this reverse translation, particularly
    // for rule #8, but i made it for all rules as it seemed to make
    // the most sense.

    // grab the last character as several rules use it and that
    // way we don't have to get it more than once.
    var lastc = word.charAt(word.length - 1);

    // remove the punctuation so we don't interfere with any rules
    // that are checking the end of word.
    var punctuation = '';
    if (lastc == '.' || lastc == '?' || lastc == '!') {
      word = word.substring(0, word.length - 1);
      punctuation = lastc;
      // get the next lastc, which is the character before
      // the punctuation as some rules use the last letter.
      lastc = word.charAt(word.length - 1);
    }

    /**************************************************************************/
    // startsWith/endsWith note
    //
    // not sure what's going on with either node or karma. for some
    // odd reason my tests were failing if i used endsWith. i would
    // get the error of
    //   TypeError: 'undefined' is not a function (evaluating 'word.endsWith('rh')')
    // this was happening on all of my endsWith/startsWith calls. i had to change
    // them all to use some other mechanism. very strange as the tests ran
    // fine under jasmine in the browser.
    /**************************************************************************/

    //var endsInRh = word.endsWith('rh');
    // crediting this source for an alternative:
    // http://stackoverflow.com/questions/4996033/regex-string-ends-with-not-working-in-javascript
    var endsInRh = word.slice(-2) == "rh";

    // 10. (my rules) "zzz" at the end of a word is replaced
    // with "s"
    // see startsWith/endsWith note above
    //if (word.endsWith('zzz')) {
    if (word.slice(-3) == "zzz") {
      word = word.substring(0, word.length - 3) + "s";
    }

    // 2. replace "hra" with an "a" or "A"
    word = word.replace(/hra/g, 'a');

    // make sure and run these rules with the most r's to the least
    // number of r's so the rules don't step on themselves.

    // there was this problem before I introduced rule #9.
    // onomatopoeia -> rrrRrnrrrRrmhratrrrRrprrrRrrrrrRrhra
    //                     onrrrRrmhratrrrRrprrrRrrrrrRrhra
    //                     on    omhratrrrRrprrrRrrrrrRrhra
    //                     on    om  atrrrRrprrrRrrrrrRrhra
    //                     on    om  at    oprrrRrrrrrRrhra
    //                     on    om  at    op    orrrrRrhra
    //                     on    om  at    op    o     uhra
    //                     on    om  at    op    o     u  a
    //
    // what we want is the rr to go to e
    // and then the rrRr to go to i
    // instead of the rrrrRr going to u
    // but there would be no way for us to know which rule
    // to apply first
    //
    //                     on    om  at    op    orrrrRrhra
    //                     on    om  at    op    o e   ihra
    //                     on    om  at    op    o e   i  a
    //
    // onomatopoua
    // e -> rr
    // i -> rrRr
    // u -> rrrrRr

    // 11. "rrrRrrrrRr" replaced with "oo"
    // this rule was introduced to fix the u rule (#7)
    // from conflicting with the translation of the
    // double-vowel words such as moon and zoom properly.
    word = word.replace(/rrrRrrrrRr/g, 'oo');

    // 7. "rrrrRr" replaced with "u" or "U"
    word = word.replace(/rrrrRr/g, 'u');

    // 6. "rrrRr" replaced with "o" or "O"
    word = word.replace(/rrrRr/g, 'o');

    // 9. (my rule) "rRRr" replaced with "ei" or "EI"
    // this fixes the issue above.
    // this rule needs to be after the above rules
    // in order for trrrRrRRtrrrrRrRRrr torture to translate back properly
    word = word.replace(/rRRr/g, 'ei');

    // 5. "rrRr" replaced with "i" or "I"
    word = word.replace(/rrRr/g, 'i');

    // 4. "rr" replaced with "e" or "E"
    word = word.replace(/rr/g, 'e');

    // 8. "RR" replaced with "r" or "R'
    // running 'r' rule last so we don't run it again on
    // translated r characters.
    word = word.replace(/RR/g, 'r');

    // did the untranslated word end in rh and does it still
    // have an h? if so, remove it.
    // see startsWith/endsWith note above
    //if (endsInRh && word.endsWith('h'))
    if (endsInRh && word[word.length - 1] == 'h')
      word = word.substring(0, word.length -1);

    // add the punctuation back in
    if (punctuation != '') {
      word = word + punctuation;
    }

    return word;
  }

  /**
	 * Creates a capitalizeSentences function
	 * this function takes a string and capitalizes the first word of each
     * sentences. It does not capitalize the first word if the sentence
     * does not end with punctuation.
	 */
  ztrans.prototype.capitalizeSentences = function(str) {
    // a list of sentences found
    var sentences = [];
    // a list of the characters in the current sentence
    var currentSentence = [];

    // go through all the characters in the supplied string and break them
    // up into sentences.
    for (var i = 0; i < str.length; i++) {
      var c = str[i];
      if (c == '.' || c == '?' || c == '!') {
        currentSentence.push(c);

        // when an end of sentence marker is found, capitalize
        // the first letter...
        currentSentence[0] = currentSentence[0].toUpperCase();
        // and then add it to the sentence list.
        sentences.push(currentSentence.join(''));
        // lastly, reset the current sentence variable so it's ready
        // for the next sentence.
        currentSentence = [];
      }
      else {
        // skip white space between sentences as it will get added
        // back in when all the sentences are joined together.
        // this also allows us to capitalize the first letter in
        // the current sentence as it will not be whitespace.
        if (currentSentence.length > 0 || c != ' ')
          currentSentence.push(c);
      }
    }
    // if there was no end of sentence character, we still want to
    // add the text to what's being returned, we just won't be
    // capitalizing the first letter.
    if (currentSentence.length > 0)
      sentences.push(currentSentence.join(''));

    // return the sentences array as a string with a space
    // in between each sentence.
    return sentences.join(' ');
  }

  return ztrans;
});
