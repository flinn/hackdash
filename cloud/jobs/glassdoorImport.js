Parse.Cloud.job('glassdoorImport', function(request, status) {

  Parse.Cloud.httpRequest({
      method: "GET",
      url: 'http://api.fool.com/quotes/v3/admin/instruments/usa:AAPL',
      params: {
          apikey: 'J6tv7JMuX6DRTqgWbhFIR8pKEww4YV81'
      }
  }).then(function(result) {
    console.log(result);
    status.success("GOT THE RESULT!");
  }, function(error) {
    status.error("Uh oh, something went wrong...", error);
  });

});

