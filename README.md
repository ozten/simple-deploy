# simple-deploy

## Server side setup
Simple NodeJS deployment script that assumes `forever` to run the server.

Do this on your remote server:

    git clone https://github.com/ozten/simple-deploy.git
    cd simple-deploy
    cp config.js-dist config.js

Edit config.js, using a password generator and make a really long string that is URL friendly. Also change port # or whatever else...

    forever start simple_deploy.js

## Github setup

1) Github Repo > Settings

2) Webhooks & Services

3) Set Payload URL to the url of your server, port, and secret. If you used config.js-dist on http://example.com that would look like:

    http://example.com:8001/change-me-to-something-really-long-and-hard-to-guess

4) Put anything in secret, it is unused

5) Toggle "Let me select individual events"

6) Choose Push

7) Update webhook