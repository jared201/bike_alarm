if (Meteor.isClient) {

  Meteor.Router.add({
    '/': 'hello',

    '/about': 'about',

    '/contact': 'contact'
    
  });
  Meteor.Router.to('hello');
  Meteor.Router.page();
  Template.hello.greeting = function () {
    return "Welcome to bike_alarm.";
  };

  Template.hello.events({
    'click input.learn' : function () {
      // template data, if any, is available in 'this'
    // $(".alert").alert('close')
        console.log("You pressed the button");
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    },
     'click button.learn' : function () {
      // template data, if any, is available in 'this'
    // $(".alert").alert('close')
      Meteor.Router.to('about');
      if (typeof console !== 'undefined')
        console.log("You pressed the real  button");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
   // Backbone.history.start({pushState: true});
  });
}
