(function(window, angular, undefined) {
  "use-strict";

  angular.module("ATS.Contributor").factory("SupporterFactory", function() {
    return{
      getSupporters: function(){
        return [
          {
           name: "Atlassian",
           image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ7EG0CX8uIkrUXOo1yAv5lL5gqv4EsZU6ncDzGJx-JJzMWH7pXf-VtogJ3",
           body: "Atlassian gave us a free Jira instance. Pretty cool of them, huh?"
          },
          {
           name: "Github",
           image: "http://www.fastly.com/img/customers/casestudy/github_logo.png",
           body: "Github's hosting our site for free. That's also really cool."
          }
        ];
      }
    };
  });
})(window, window.angular);
