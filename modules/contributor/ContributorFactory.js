(function(window, angular, undefined) {
  "use-strict";

  angular.module("ATS.Contributor").factory("ContributorFactory", function() {
    return{
      getContributors: function(){
        return [
          {
            name: "Ty Thorsen",
            phone: "320-111-2222",
            email: "Ty@thorsen.com",
            body: "Ty is a developer who lorem ipsum blah blah blah",
            gravatarHash: "cb9c4449fcde114a5af7cd45af4b0442", 
            linkedIn: "https://www.linkedin.com/in/tythorsen", 
            gitHub: "https://github.com/thorsenty"
          },
          {
            name: "Alex Ulrich",
            phone: "320-123-4455",
            email: "Alex@ulrich.com",
            body: "Alex is a developer who lorem ipsum blah blah blah. Alex is a developer who lorem ipsum blah blah blah. ",
            gravatarHash: "b209d86e109ef4fa78feb893fe4ed6be",
            linkedIn: "https://www.linkedin.com/in/alexulrich", 
            gitHub: "https://github.com/AlexUlrich"
          }, 
          {
            name: "Zach Jergenson",
            phone: "320-333-9144",
            email: "Zbjergie@gmail.com",
            body: "Zach is a developer who lorem ipsum blah blah blah",
            gravatarHash: "2d80e7afa88702ff33128c53d84c79ca",
            linkedIn: "https://www.linkedin.com/pub/zach-jergenson/99/687/533", 
            gitHub: "https://github.com/ZachJergenson"
          }
        ];
      }
    };
  });
})(window, window.angular);
