'use strict';

// This is an exmaple plugin that is disabled by default. To enable it,
// see the "plugins"."example" option in config.json

// Set module title
module.exports.title = 'ExamplePlugin';

// Initialize the module
module.exports.init = (app, done) => {

    // register a new hook that fires when message headers have been parsed
    app.addHook('message:headers', (envelope, messageInfo, next) => {

        // Check if the message has header "X-Block-Message: Yes"
        if (/^Yes$/i.test(envelope.headers.getFirst('X-Block-Message'))) {
            let err = new Error('This message was blocked');
            err.responseCode = 500; // SMTP response code
            return next(err);
        }

        // add a new header
        envelope.headers.add('X-Blocked', 'no');

        // allow the message to pass
        return next();
    });

    // all set up regarding this plugin
    done();
};
