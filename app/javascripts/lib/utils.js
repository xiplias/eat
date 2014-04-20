window.Utils = {
  delay: function (callback, ms) {
    var delay = (function(){
      var timer = 0;
      clearTimeout (timer);
      timer = setTimeout(callback, ms);
    })();
  }
};
