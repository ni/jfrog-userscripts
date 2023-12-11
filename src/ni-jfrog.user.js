// ==UserScript==
// @name         JFrog UserScript
// @version      0.0.1
// @namespace    https://www.ni.com
// @author       David Corrigan (National Instruments)
// @license      MIT
// @homepageURL  https://github.com/ni/jfrog-userscripts
// @supportURL   https://github.com/ni/jfrog-userscripts/blob/main/docs/SUPPORT.md
// @run-at       document-start
// @match       *://*.artifacts.ni.com/*
// @match       *://*.jfrog.io/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require  https://gist.githubusercontent.com/davidcorrigan714/b13add08a7215247be27b12cc4bac165/raw/bbfc1115244f9d9df687fe8ebe59718846b10f05/waitForKeyElements_mirror.js
// ==/UserScript==

/* global $, waitForKeyElements */

// This script localizes the timestamps on the JFrog UI to the user's local timezone.
function localizeTimeString(jqueryTag) {
  const element = $(jqueryTag)[0];
  const date = element.children[0].innerHTML;

  // Input sample: 12-09-23 12:20:14 +00:00
  const split1 = date.split(' ');
  const dateParts = split1[0].split('-');
  const timeParts = split1[1].split(':');
  const offsetHours = split1[2].substring(1, 3);

  if (offsetHours !== '00') {
    console.error('UserScript error, timezone not UTC.');
    return;
  }

  const d = new Date(Date.UTC(`20${dateParts[2]}`, dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1], timeParts[2]));
  element.children[0].innerHTML = d.toLocaleString();
}

waitForKeyElements('div[data-cy=created]', () => { localizeTimeString('div[data-cy=created]'); });
waitForKeyElements('div[data-cy=last-modified]', () => { localizeTimeString('div[data-cy=last-modified]'); });
waitForKeyElements('div[data-cy=last-downloaded]', () => { localizeTimeString('div[data-cy=last-downloaded]'); });
