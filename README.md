# Setup

### Cypress:

Requires Node.js. To check if you have Node.js installed already, run `npm -v` in the terminal.

If it's not installed, download it here: https://nodejs.org/en/download/ and then **restart your computer**.

Once you've cloned this repo you should be able to open Cypress by running `npx cypress open` from the command line in this directory. After a few seconds Cypress should open and you should be able to run the tests just by clicking on them.

### Locust:

Requires Python 3.6 or later: https://docs.python-guide.org/starting/installation/

Install Locust using pip by running `pip3 install locust`

Then you should just be able to run `locust` in the command line to start. Once you've done that, open a web browser and go to http://localhost:8089/ (if that doesn't work try http://127.0.0.1:8089/). There you can select the max number of users to create and how quickly to spawn them. I recommend sticking with ~10 users unless you want to actually load test this API.

Once you've started the test you'll be able to see all kinds of stats about the number of requests being made to each endpoint and their response times. You can also click on "charts" to see this data graphed in real time.

If you have any issues with setup or execution please let me know!
