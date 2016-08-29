var smtp = require('smtp-protocol');
var MailParser = require("mailparser").MailParser;
var mailparser = new MailParser();

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

stream.pipe(mailparser);

 mailparser.on("end", function(mail_object){
  console.log(mail_object); //这里就是解析好的mail格式
 })
    ack.accept();
  });

});

server.listen(25);
console.log('25')
