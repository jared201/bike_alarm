if (Meteor.isClient) {

  Template.about.rendered = function () {
     $("#aboutNav").addClass('active');
   };

  Template.about.destroyed = function () {
     $("#aboutNav").removeClass('active');
  };

  Template.hello.rendered = function () {
     $("#homeNav").addClass('active');
   };

  Template.hello.destroyed = function () {
     $("#homeNav").removeClass('active');
  };
 
 
  Template.contact.destroyed = function () {
     $("#contactNav").removeClass('active');
  };
  
  Template.help.destroyed = function () {
     $("#helpNav").removeClass('active');
  };

  Template.help.rendered = function () {
     $("#helpNav").addClass('active');
   };

  Template.locate.rendered = function () {
     $("#locateNav").addClass('active');
     var mapOptions = {
        zoom: 16,
       // center: new google.maps.LatLng(-34.397, 150.644),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
     
  // Try HTML5 geolocation
     if(navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(function(position) {
        var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

        var marker=new google.maps.Marker({
           position:pos,
           url: '/',
           animation:google.maps.Animation.DROP
        });
        marker.setMap(map);
        google.maps.event.addListener(marker, 'click', function() 
          {window.location.href = marker.url;});
   //     var infowindow = new google.maps.InfoWindow({
   //      map: map,
   //      position: pos,
   //      content: 'Here we are!'
   //    });

       map.setCenter(pos);
        }, function() {
          handleNoGeolocation(true);
       });
      } else {
      // Browser doesn't support Geolocation
      handleNoGeolocation(false);
      }
  };

  Template.locate.destroyed = function () {
     $("#locateNav").removeClass('active');
  };
  Meteor.Router.add({
    
    '/': 'hello',

    '/about':  'about',  
    
    '/contact': 'contact',
    
    '/locate': 'locate' 
  });

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
  Template.contact.rendered = function () {
     
       $("#contactNav").addClass('active');
      var mapOptions = {
        zoom: 16,
       // center: new google.maps.LatLng(-34.397, 150.644),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
     
  // Try HTML5 geolocation
     if(navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(function(position) {
        var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

        var marker=new google.maps.Marker({
           position:pos,
           url: '/',
           animation:google.maps.Animation.DROP
        });
        marker.setMap(map);
        google.maps.event.addListener(marker, 'click', function() 
          {window.location.href = marker.url;});
   //     var infowindow = new google.maps.InfoWindow({
   //      map: map,
   //      position: pos,
   //      content: 'Here we are!'
   //    });

       map.setCenter(pos);
        }, function() {
          handleNoGeolocation(true);
       });
      } else {
      // Browser doesn't support Geolocation
      handleNoGeolocation(false);
      }
  };

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
   // Backbone.history.start({pushState: true});
  });
}
