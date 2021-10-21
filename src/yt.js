const fs = require('fs');
const dl = require('youtube-dl');
const path = require('path');
const search = require('youtube-search-api');
const stream = require('youtube-audio-stream');

const PLAYLIST = false;
const LIMIT = 1;
const URL = 'http://www.youtube.com/watch?v=';
const PATH = './tmp/';

function getRandomResult(str) {
  return new Promise((resolve, reject) => {
    search.GetListByKeyword(str, PLAYLIST, LIMIT).then(function(d) {
      if (d.items.length == 0) {
        reject("Not found");
      }

      resolve(d.items[0]);
    }).catch(function(e) {
      reject(e);
    });
  });
}

// Returns format
function download(id) {
  return stream(URL + id);
}

module.exports = { getRandomResult, download };
