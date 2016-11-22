var smtp = require('smtp-protocol');
var fs = require('fs');

smtp.connect('mx1.qq.com', 25, function (mail, err) {
    mail.helo('nobey.cn');
    mail.from('nobey@nobey.topn');
    mail.to('nobeycn@qq.com');
    mail.data();
    fs.createReadStream('./foo.txt').pipe(mail.message());
    // console.log(mail);
    mail.quit();
    console.log('ok')
    console.log(err)
});
