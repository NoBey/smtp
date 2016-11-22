// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
var nodemailer = require('nodemailer');
var directTransport = require('nodemailer-direct-transport');
// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(directTransport({
  name: 'mx1.qq.com'
}));

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'nobey@nobey.cn', // sender address
    to: 'nobeycn@qq.com', // list of receivers
    subject: 'Hello', // Subject line
    text: 'Hello world', // plaintext body
    html: '<b>Hello world</b>' // html body
    //  data:'dsdsds'
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});
