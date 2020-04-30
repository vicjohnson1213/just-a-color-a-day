var Twitter = require('twitter'),
    config = require('./config');

var bot = new Twitter({
    'consumer_secret': config.consumerSecret,
    'consumer_key': config.consumerKey,
    'access_token_key': config.accessToken,
    'access_token_secret': config.accessTokenSecret
});

function tweet(message, media) {
    bot.post('statuses/update', { status: message, media_ids: media }, (error, tweet, response) => { });
}

function media(message, buffer) {
    bot.post('media/upload', { media: buffer }, function (error, media, response) {
        if (!error) {
            tweet(message, media.media_id_string);
        }
    });
}


module.exports = {
    tweet: tweet,
    media: media
};
