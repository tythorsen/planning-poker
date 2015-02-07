(function(window, undefined) {
  "use strict";
 
  if (!window.namespace) {
    window.namespace = function namespace(namespaceString) {
      var parts = namespaceString.split('.'), parent = window, currentPart = '';
 
      for ( var i = 0, length = parts.length; i < length; i++) {
        currentPart = parts[i];
        parent[currentPart] = parent[currentPart] || {};
        parent = parent[currentPart];
      }
 
      return parent;
    };
  }
 
  if (!window.extend) {
    window.extend = function extend() {
      for ( var i = 1; i < arguments.length; i++) {
        for ( var key in arguments[i]) {
          if (arguments[i].hasOwnProperty(key)) {
            arguments[0][key] = arguments[i][key];
          }
        }
      }
      return arguments[0];
    };
  }
})(window);