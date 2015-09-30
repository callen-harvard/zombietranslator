# CSCI-E32 Assignment 1
# Zombie Translator!
# Christopher Allen

This document describes the various aspects of the assignment as I implemented them as well as issues I ran into during development.

## Design and Layout
The purpose of this assignment was to implement a Zombie to English language translator (and back again). The main API was implemented in the ztrans.js file. The ZombieTranslator.js file handles the UI and makes the API calls as the user types into either the Zombie or English text boxes. I liked the dynamic nature of typing and seeing the translator work, so I implemented the translation via the keydown event instead of providing translate buttons.

## Additional Rules
Part of the assignment was to implement at least two additional rules. Here are the three rules I added:

9. "ei" or "EI" is replaced by "rRRr". This rule "fixes" the issue with e and i (where they would both translate to the same set of letters thus becoming a problem for un-zombifying).  I ran into a problem translating onomatopoeia, where when I translated back from zombie, it translated as onomatopoua. The reason for this is documented in the source code of the ztrans.js file.
10. "zzz" at the end of a word is replaced with "s". I added this rule because I thought it was neat and sounded cool when I test pronounced my zombie-speak.
11. "rrrRrrrrRr" replaced with "oo" this rule was introduced to fix the u rule (#7) from conflicting with the translation of the double-vowel words such as moon and zoom properly.

## Difficulties

There were three main issues I ran into during development. The first issue that stumped me for a while was how to go about calling another function from a prototype function. For instance, my zombify function needed to call zombifyWord for each word in the supplied sentence. I could make my zombify function a prototype function on the ztrans object, but then I kept getting undefined errors when I had zombifyWord as a prototype on the same object. I managed to get things to work by making zombifyWord a static funciton on the ztrans object, but the root cause of the problem eluded me. I set the issue aside for a couple of days and found the solution when I came back to it. I needed to assign this to another variable in the first prototype function, which explained the use of the 'that' variable in the code used in class (which I didn't understand at the time). Armed with this information, I was able to setup all functions as prototype functions.

The second problem I ran into was getting Karma configured correctly. I expected this to be an easy task, but should have known better given the difficulty I had in class getting it to work. The issues I ran into seemed to be mainly related to conflicts when loading files (mostly due to a lack of understanding on my part as to how Karma actually did its startup). After downloading Mike's section material and going through each file line-by-line, I was able to resolve my issues. This also gave me a much better understanding of how the file loading occurred.

Part of my struggle with getting Karma to work came down to the endsWith and startsWith functions not operating properly under Karma. I spent a great deal of time trying to figure out why my configuration didn't seem to be working when in fact my configuration issues had been sorted out and I was now running into different, run-time issues. Many hours were spent cutting code from my files until they ran successfully. Eventually I discovered there seems to be an issue with startsWith and endsWith when running under either node or Karma (not sure which).

The problem was that I would get an 'undefined' error on the object I was using to do the endsWith or startsWith. However, the problem didn't occur when running Jasmine directly. After realizing the source of the problem I was able to swap out the two functions with variations of the slice function that I found online (credits given in source code). It didn't take long to get things running once I figured this out, but a lot of time was spent trying to identify the root case.

## Testing
I made use of the following built-in matchers:

1. toBe
2. toContain
3. not.toContain

In addition to the above, I made use of several custom matchers. I really like how Jasmine supports readability in the test cases. I took notes of issues I encountered during my development testing so when I put my test cases together, I had a good base of issues to make sure were working properly. As I considered the test cases, what I wanted to test came about naturally, but Jasmine didn't seem to have any built-in methods for testing what I had in mind. For instance, I thought about wanting to test to make sure a translation ended with zzz or that it contained multiple occurrences of some combination of characters. After doing some research, I found that Jasmine supported custom matchers. So I implemented the following matchers to assist with my testing:

4. toStartWith
5. toEndWith
6. toHaveMultiple
7. toHaveSingle

Adding the above matchers really helped my test cases become more readable and thorough.
