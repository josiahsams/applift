

Router.route("/data",
  function() {
    fileSystem =  Npm.require('fs'),
path =  Npm.require('path');
    //var jsonstr = JSON.stringify(this.request.body.data);
    console.log("get data " );
    //var filePath = path.join(path.dirname(), '/client/population909500.json');
    var filePath = '/home/joe/Desktop/AppLift/applift_globe_data.json';
    //var filePath = '/home/joe/Desktop/AppLift/applift/public/population909500.json';
    var stat = fileSystem.statSync(filePath);

    
    this.response.writeHead (200, {'Content-type': 'application/json; charset=utf-8' });

    var readStream = fileSystem.createReadStream(filePath);
    readStream.pipe(this.response);

    //this.response.end (JSON.stringify({'status': 'created',  'debugdata' : this.request.body }));  },
  }, {where: 'server'}
  );

Router.route("/", { template: 'hello'})

Router.route("/query1", {template: 'query1'})
if (Meteor.isClient) {
  // counter starts at 0


Meteor.startup(function(){

});


  Template.hello.rendered = function() { 
      $.getScript("/globe/third-party/Detector.js", function() {
        $.getScript("/globe/third-party/three.min.js", function() {          
          $.getScript("/globe/third-party/Tween.js", function() {
            $.getScript("/globe/globe.js", function() {
              if(!Detector.webgl){
      Detector.addGetWebGLMessage();
    } else {
      
      var years = ['Arts','hobbiesinterest','hobbiesstyle'];
      var container = document.getElementById('container');
      
      var globe = new DAT.Globe(container);
      
      console.log(globe);
      var i, tweens = [];
      
      var settime = function(globe, t) {
        return function() {
          new TWEEN.Tween(globe).to({time: t/years.length},500).easing(TWEEN.Easing.Cubic.EaseOut).start();
          var y = document.getElementById('year'+years[t]);
          if (y.getAttribute('class') === 'year active') {
            return;
          }
          var yy = document.getElementsByClassName('year');
          for(i=0; i<yy.length; i++) {
            yy[i].setAttribute('class','year');
          }
          y.setAttribute('class', 'year active');
        };
      };
      
      for(var i = 0; i<years.length; i++) {
        var y = document.getElementById('year'+years[i]);
        y.addEventListener('mouseover', settime(globe,i), false);
      }
      
      var xhr;
      TWEEN.start();      
      
       xhr = new XMLHttpRequest();
      xhr.open('GET', '/data', true);
      xhr.onreadystatechange = function(e) {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            window.data = data;
            for (i=0;i<data.length;i++) {
              globe.addData(data[i][1], {format: 'magnitude', name: data[i][0], animated: true});
            }
            globe.createPoints();
            settime(globe,0)();
            globe.animate();
            document.body.style.backgroundImage = 'none'; // remove loading
          }
        }
      };
      xhr.send(null);
    }
      return 
            });
          });
        });
      });
   };
  
// Template.hello.created = function() {
//   $('head').append('<script type="text/javascript" src="/globe/third-party/Detector.js">');
//   $('head').append('<script type="text/javascript" src="/globe/third-party/three.min.js">');
//   $('head').append('<script type="text/javascript" src="/globe/third-party/Tween.js">');
//   $('head').append('<script type="text/javascript" src="/globe/globe.js">');
// };

  Template.hello.helpers({
    
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
        
            
            

    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
