var smtp = require('smtp-protocol');

var MailParser = require("mailparser").MailParser;
var mailparser = new MailParser();
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtp://mx1.qq.com');

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

    var mailOptions = {
        from: 'nobey@nobey.cn',
        to: '786964300@qq.com',
        subject: 'Hello',
        text: 'Hello world',
        html: '<b>Hello world</b>'
    };
    stream.pipe(mailparser);
    mailparser.on("end", function(mail_object){
      console.log(mail_object.subject)
      console.log(mail_object.text)
      console.log(mail_object.html)
      mailOptions = mail_object
      mailOptions.to = '786964300@qq.com'
    })

    req.from.split('@')[1] === 'qq.com' ? transporter.sendMail(mailOptions, function(error, info){
      if(error) return console.log(error);
      console.log('Message sent: ' + info.response);
  }) : smtp.connect('mx1.qq.com', 25, function (mail) {
        mail.helo('mx1.qq.com');
        mail.from('nobey@nobey.cn');
        mail.to('786964300@qq.com');
        mail.data();
        stream.pipe(mail.message());
        mail.quit();
    });

    ack.accept();
  });

});

server.listen(25);
// console.log('25')