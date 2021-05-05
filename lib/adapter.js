// Create responder takes a specific part of the request object
// and passes that to the controller function
// this allows the controller function to be decoupled from the 
// data source i.e body, params, queryparams e.t.c

function createResponder(type){
  return function responder(fn){

    return async function(req, res){
      let response
      if(type == "req")
        response = await fn(req)
      else
        response = await fn(req[type])
      return sendResponse(res, response)
    }

    function sendResponse(res, responseData){
      if(!responseData)
        return res.status(500).json({
          code: "NO_RESPONSE",
          message: "Got no response from the server"
        })
      if(!responseData.status)
        responseData.status = 500
      return res.status(responseData.status).json(responseData)
    }

  }
}

module.exports = {
  bodyResponder: createResponder("body"),
  paramResponder: createResponder("params")
}
