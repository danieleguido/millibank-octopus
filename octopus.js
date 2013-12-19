/*                                                   
                   ,--.                                
     ,---.  ,---.,-'  '-. ,---.  ,---. ,--.,--. ,---.  
    | .-. || .--''-.  .-'| .-. || .-. ||  ||  |(  .-'  
    ' '-' '\ `--.  |  |  ' '-' '| '-' ''  ''  '.-'  `) 
     `---'  `---'  `--'   `---' |  |-'  `----' `----'  

    Express frontend app for millibank.
    Please do npm install first :D                       `--'          
*/
'use strict';

var express = require('express'),
    hbs = require('express-hbs'),
    request = require('request'),
    colors = require('colors'),

    config = {
      port: 3000,
      themes_path: __dirname + "/contents/themes",
      theme: 'milk',
      title: 'danieleguido portfolio',
      millibank_endpoint: 'http://mo.nitor.xxx/api/',
      millibank_profile: 'monitor'
    },

    views_path = [config.themes_path, config.theme].join('/'),
    public_path = [views_path, 'public'].join('/'),

    app = express();



console.log('[o] starting', 'octopus'.blue)
console.log('[o] theme:',(config.theme + '').green, views_path);

app.engine('hbs', hbs.express3({
  partialsDir: [__dirname + '/views/partials', views_path + '/partials'],
  defaultLayout: views_path + '/index.hbs'
}));

// set "static" folder for your static
app.use(express.static(public_path));

app.set('view engine', 'hbs');
app.set('views', views_path);

/*
    Controllers
    ===

*/
app.get('/', function(req, res) {
  var url = config.millibank_endpoint + 'profile/' + config.millibank_profile +'/';
  console.log('[o] loading url', url);
  // require profile via api
  request(url, function (error, response, body) {
    console.log('...','[millibank api]', url, error);    
    if (!error && response.statusCode == 200) {
      var profile = JSON.parse(response.body);

      console.log('...','[millibank api]', profile);    

      res.render('index', {
        title: config.title,
        profile: profile.object
      });
    } else {
      console.log('...','[millibank api]'.red, error);
    }
  });
  
});





app.listen(config.port);
console.log('[o] Listening on port', (config.port + '').green);