var nodemailer = require('nodemailer');
var directTransport = require('nodemailer-direct-transport');
// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(directTransport({
    name: 'alt3.gmail-smtp-in.l.google.com',// should be the hostname machine IP address resolves to
    logger: true,
}).headers['Received-SPF']="")
// var transporter = nodemailer.createTransport('smtp://@');

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'nobey@nobey.top', // sender address
    to: 'nobeycn@gmail.com', // list of receivers
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
