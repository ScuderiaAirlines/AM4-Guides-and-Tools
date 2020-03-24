function alertmsg() {
    var request = new XMLHttpRequest()
    request.open('GET', 'https://cors-anywhere.herokuapp.com/https://www.airline4.net/api/?access_token=JKJHkjhkSDHFGKSFDHKWerHGsbv.783KJhSLSKsdjfhskejfhskjjjhHHHllkihgHJKlSBmBNMVvxGAgdgh&search=Star Alliance', true)
    request.onload = function() {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)
    var msg = data.status[request];
    console.log(msg);
    };
  }