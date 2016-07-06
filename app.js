var smtp = require('smtp-protocol');
var mailparser = require("mailparser").MailParser;
var server = smtp.createServer({
  domain:'nobey.cn'
},function (req) {
  req.on('greeting', function (to, ack) {
      console.log(to)
      ack.accept();
});
req.on('from', function (to, ack) {
    console.log(to)
ack.accept();
});
    req.on('to', function (to, ack) {
      console.log(to)
        var domain = to.split('@')[1] || 'localhost';
        if (domain === 'localhost') ack.accept()
        else ack.reject()

    });
    req.on('message', function (stream, ack) {
        console.log('from: ' + req.from);
        console.log('to: ' + req.to);

        stream.pipe(process.stdout, { end : false });
        ack.accept();
    });

});

server.listen(9025);
console.log('9025')