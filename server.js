var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 4000 });

server.register(require('hapi-auth-basic'), function (err) {
  if(err) { throw err;}

server.auth.strategy('simple', 'basic', {
  validateFunc: function (request, username, password, callback) {
    if (username === 'admin' && password === 'admin123') {
      return callback(null, true, {scope: 'admin'});
    }
    if (username) {
      return callback(null, true, {scope: 'user'});
    }
    return callback(null, false);
  }
});

server.route([{
    method: 'GET',
    path: '/public',
    handler: function(request, reply) {
      reply.redirect('http://www.curezone.org/upload/Blogs/Zoebess/Herd_of_Sheep.gif');
    },
    config: {
      auth: {
        strategy: 'simple',
        scope: ['user', 'admin']
      }
    }
  },
  {
    method: 'GET',
    path: '/admin',
    handler: function(request, reply) {
      reply.redirect('http://images.clipartpanda.com/rainbow-unicorn-clipart-dT8M8x6Te.jpeg');
    },
    config: {
      auth: {
        strategy: 'simple',
        scope: ['admin']
      }
    }
  }
]);

});

server.start(function(err){
  if (err) throw err;
  console.log(`Server is running at port ${server.info.uri}`);
});
