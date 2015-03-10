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
})(window);