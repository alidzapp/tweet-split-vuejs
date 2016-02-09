new Vue({
  el: '.tweets',
  data: {
    tweets: []
  },
  ready: function () {
    this.loadTweets();
  },
  methods: {
    loadTweets: function () {
      var tweets = [];
      
      // load dummy file
      this.$http.get('/tweet-split.txt')
        .success(function (tweets) {
          // a bit of clean up removing line breaks
          var text = tweets.replace(/\n/g, ' ');
          
          // simple (and hacky) way to split the
          // tweets - not the nicest way but it does
          // the job for now.
          tweets = text.match(/[\s\S]{1,134}/g);

          // concatenate the pieces together to display the tweet
          // with indexing number.
          for (var i = 0; i < tweets.length; i++) {
              tweets[i] = (i+1)+'/'+tweets.length+' '+tweets[i];
          }
          
          // tweets are good to go
          this.$set('tweets', tweets);
        })
        .error(function (err) {
          console.log(err);
        });
    }
  }
});