if (Meteor.isClient) {

  Locations = new Meteor.Collection("locations");
  var addthis_config = {"data_track_addressbar": true};
  
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

  
  Template.map_location.rendered = function () {

     $("#locateNav").addClass('active');
     var mapOptions = {
        zoom: 16,
       // center: new google.maps.LatLng(-34.397, 150.644),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(document.getElementById('map_canvas'),
        mapOptions);
     var coord = Session.get('coord');
     if (coord !== undefined) {
       console.log(coord.lat);
       var pos = new google.maps.LatLng(coord.lat, coord.long);
       var marker = new google.maps.Marker({
         position:pos,
         animation:google.maps.Animation.DROP
       });
       marker.setMap(map);
       map.setCenter(pos);
       return;
     }
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
        map.setCenter(pos);  
   //     var infowindow = new google.maps.InfoWindow({
   //      map: map,
   //      position: pos,
   //      content: 'Here we are!'
   //    });

       //map.setCenter(pos);
       
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
    '/locate': 'locate',
    '/help': 'help',
        
  });
  
  Deps.autorun (function () {
      var loc = Session.get('location');
      Meteor.subscribe('location', loc);
      console.log("subscribed");
    }
  );
  Template.hello.greeting = function () {
    return "Welcome to bike_alarm.";
  };
  
  Template.location.locations = function () {
     
     return Locations.find(Session.get("email"), {limit : 5}, {sort : {$natural : -1}});
  };
  
  Template.location.selected = function () {
     console.log ("selected");
     return this._id;
  };

  
  Template.location.events ({
    'click li' : function (evt) {
      evt.preventDefault();
      var coord = {"lat": this.lat, "long" : this.long};
      console.log("Clicked: " + coord.lat + ":" + coord.long);
      Session.set("coord", coord);
    },
    'mousdown li' : function (evt) {
      console.log (this._id);
      Router.setList(this._id);
    }
  });

  Template.locate.events({
    'click button.locate' : function (e, tmpl) {
      //search from mongodb using email address as key
      //get only the top 10 history and render as bootstrap table
      //with hyperlink refreshing the Google maps for each locations
      //use drop markers to mark each location
      //e.preventDefault();
      var email = { "email" : $("#email-box").val()};
      console.log("Searching: " + $("#email-box").val());
      var locations = Locations.find(email , {sort : {"email" : -1}});
      console.log("Record count: " + locations.count());
      console.log("Records: " + locations);
      
      Session.set ("email", email);

    }  
  });

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
  
  
  Template.map_location.redraw = function () {
     var coord = Session.get("coord");
    // if (coord !== 'undefined') {
    // var map = Session.get("map");

    //   var pos = new google.maps.LatLng(coord.lat, coord.long);
    //   var marker = new google.maps.Marker({
    //     position:pos,
    //     animation:google.maps.Animation.DROP
    //   });    
    //   marker.setMap(map);
    //   map.setCenter(pos);      
    // }
    console.log ("Redraw: " + coord);
    return coord;
  };

  Template.contact.rendered = function () {
     
       $("#contactNav").addClass('active');
      var mapOptions = {
        zoom: 16,
       // center: new google.maps.LatLng(-34.397, 150.644),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(document.getElementById('map_canvas'),
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
       //Session.set ('map', true);

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

  console.log('Hello Server!');

  Meteor.methods ({
    addLocations: function (locations){
      Locations.insert(locations);
      console.log ("New location has been added");
    }
  });
  Meteor.startup(function () {
    // code to run on server at startup
  
  });
  // insert code here for HTTP POST request
  // check with Meteor.Router server-side handlers
  Locations = new Meteor.Collection("locations");
  Meteor.Router.add('/register', function() {
    console.log(this.request.query);
    var locations = this.request.query;
    Meteor.call ("addLocations", locations);
  });  

}
