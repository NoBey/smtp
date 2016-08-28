var smtp = require('smtp-protocol');
var fs = require('fs');

smtp.connect('mx1.qq.com', 25, function (mail) {
    console.log('kaishi')
    mail.helo('okokok.cn');
    mail.from('substack@okokok.cn');
    mail.to('786964300@qq.com');
    mail.data();
    // mail.message('ss')
    // fs.createReadStream('./foo.txt').pipe(mail.message());
    mail.quit();
    console.log('ok')

});
