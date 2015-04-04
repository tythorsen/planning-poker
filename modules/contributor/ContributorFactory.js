(function(window, angular, undefined) {
  "use-strict";

  angular.module("ATS.Contributor").factory("ContributorFactory", function() {
    return{
      getContributors: function(){
        return [
        {
          name: "Ty Thorsen"
        },
        {
          name: "Alex Ulrich"
        }
        ];
      }
    };
  });
})(window, window.angular);
