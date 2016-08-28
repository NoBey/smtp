var smtp = require('smtp-protocol');
var mailparser = require("mailparser").MailParser;

var Domain = 'nobey.cn'

var server = smtp.createServer({
  domain: 'nobey.cn'
}, function(req) {

  req.on('greeting', function(to, ack) {
    ack.accept();
  });

  req.on('from', function(to, ack) {
    ack.accept();
  });

  req.on('to', function(to, ack) {
    var domain = to.split('@')[1] || Domain;
    if (domain === Domain)  ack.accept()
    else ack.reject()
  });

  req.on('message', function(stream, ack) {
    console.log('from: ' + req.from);
    console.log('to: ' + req.to);
    stream.pipe(process.stdout, {
      end: false
    });
    ack.accept();
  });

});

server.listen(25);
console.log('25')
