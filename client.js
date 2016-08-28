var smtp = require('smtp-protocol');
var fs = require('fs');

smtp.connect('nobey.cn', 25, function (mail) {
    mail.helo('nobey.cn');
    mail.from('nobey@nobey.cn');
    mail.to('786964300@qq.com');
    mail.data();
    fs.createReadStream('./foo.txt').pipe(mail.message());
    // console.log(mail);
    mail.quit();
    console.log('ok')
});
