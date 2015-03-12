function respondWithData(error, response, body, res) {
	if (!error && response.statusCode == 200) {
    	res.send(response.body);
  	} else {
  		res.send(500, { "error": error });
  	}
}

module.exports = {
	respondData: respondWithData
};