// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
var nodemailer = require('nodemailer');
var directTransport = require('nodemailer-direct-transport');
// create reusable transporter object using the default SMTP transport
// var transporter = nodemailer.createTransport('smtp://115.159.217.96:25')
var transporter = nodemailer.createTransport('smtp://nobey.cn')

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'nobey@nobey.cn', // sender address
    to: 'nobeycn@gmail.com', // list of receivers
    subject: '打开黄金时代好看', // Subject line
    text: '师傅说的话就发烧快点好快', // plaintext body
    html: '<b>收到反馈就是大家看健康</b>' // html body
    //  data:'dsdsds'
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});
