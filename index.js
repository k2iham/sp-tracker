const snowplow =  require ('@snowplow/node-tracker');
var gotEmitter = snowplow.gotEmitter;
var tracker = snowplow.tracker;
var buildPageView = snowplow.buildPageView;
const main =  () => new Promise ((res, rej) => {
    const e = gotEmitter(
        '34.173.164.119', // Endpoint
        snowplow.HttpProtocol.HTTP, // Protocol
        8080, // Port
        snowplow.HttpMethod.POST, // Method 
         1, // Buffer Size
        5,
        undefined, // Retries
        function (error, response) { // Callback called for each request
            if (error) {
                console.log(error, 'Request error');
                rej(error);
            } else {
                console.log('Event Sent', response.statusCode);
                res(response);
            }
        },
       )

    const t = tracker([e], 'myTracker', 'myApp', false);

    t.track(buildPageView({
        pageUrl: 'http://www.airasia.com/holiday',
        referrer: 'http://www.google.com'
    }),
        [{
            "schema": "iglu:com.acme_company/movie_poster/jsonschema/2-1-1",
            "data": {
                "e": "pv",
                "page": "curl-test",
                "url": "http://www.airasia.com/holiday",
                "aid": "thalavali"

            }
        }]);
    // console.log(t)
});
main().then (console.log). catch(console.error);
