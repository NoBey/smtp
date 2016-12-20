var POP3Client = require("poplib");
var MailParser = require("mailparser").MailParser;
var mailparser = new MailParser();

mailparser.on("end", function(mail_object) {
  console.log(mail_object)
});

// send the email source to the parser

var client = new POP3Client(110, 'nobey.cn', {

  tlserrs: false,
  enabletls: false,
  debug: false

});

client.on("error", function(err) {

  if (err.errno === 111) console.log("Unable to connect to server");
  else console.log("Server error occurred");

  console.log(err);

});

client.on("login", function(status, rawdata) {

  if (status) {

    console.log("LOGIN/PASS success");
    setTimeout(function(){
      client.list();
    }, 1000)


  } else {

    console.log("LOGIN/PASS failed");
    client.quit();

  }
});
client.on("list", function(status, msgcount, msgnumber, data, rawdata) {

  if (status === false) {

    console.log("LIST failed");
    client.quit();

  } else {
    console.log(new Date())
    console.log("LIST success with " + msgcount + " element(s)");
    console.log(data)
    if (msgcount > 0) {

        client.retr(1)

      // client.retr(39);
    } else{

    }
      // client.quit();

  }
});

client.on("retr", function(status, msgnumber, data, rawdata) {
  if (status === true) {

    console.log("RETR success for msgnumber " + msgnumber);
    mailparser.write(data);
    mailparser.end();

    // client.dele(msgnumber);
    client.quit();

  } else {

    console.log("RETR failed for msgnumber " + msgnumber);
    client.quit();

  }
});

client.on("dele", function(status, msgnumber, data, rawdata) {

  if (status === true) {

    console.log("DELE success for msgnumber " + msgnumber);
    client.quit();

  } else {

    console.log("DELE failed for msgnumber " + msgnumber);
    client.quit();

  }
});

client.on("quit", function(status, rawdata) {

  if (status === true) console.log("QUIT success");
  else console.log("QUIT failed");

});
client.on("connect", function() {

  console.log("CONNECT success");
  client.login('nobey@nobey.cn', '12345');

});

client.on("invalid-state", function(cmd) {
  console.log("Invalid state. You tried calling " + cmd);
});

client.on("locked", function(cmd) {
  console.log("Current command has not finished yet. You tried calling " + cmd);
});
