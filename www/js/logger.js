'use strict';

angular.module('kiekeboek').service('logger', function accountService(localStorage) {

  var buffer = [], counter=0;

  return {
    log: function(msg) {
      console.log(msg);
      buffer.push(counter++ + " " + new Date().toISOString() + ": " + msg);
    },

    tail: function(nr) {
      return buffer;
      //
      //if (nr === undefined) {
      //  nr = 50;
      //}
      //
      //var actualNr = buffer.length <= 50 ? buffer.length : 50;
      //
      //return buffer.splice(buffer.length - actualNr, actualNr);
    }
  };
});