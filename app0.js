var smtp = require('smtp-protocol');

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
    console.log('message')


    smtp.connect('nobey.cn', 25, function (mail) {
        mail.helo('nobey.cn');
        mail.from('nobey@nobey.cn');
        mail.to('786964300@qq.com');
        mail.data();
        stream.pipe(mail.message());
        // console.log(mail);
        mail.quit();
        console.log('ok')
    });


    ack.accept();
  });

});

server.listen(25);
console.log('25')
