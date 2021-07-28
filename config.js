// Configuration should be Read from Database or from FILE currently reading it from JS file

const config = {
  COMPONENTNAME : "CAMPAIGNS",
  PORT : '7845',
  REQUEST_URL : "https://testapi.donatekart.com/",
  ENDPOINTS : {
    GETCAMPAIGNS : "api/campaign"
  },
  LOG:{
    FILEPATH :"./LOG/",
    FILENAME : "campaigns.log",
    LOGLEVEL : ""
  }
}
const constant = {
  httpStatus : {
    ok: { code: '200', msg: 'Success' },
    badRequest: { code: '404', msg: 'Bad Request' },
    internalError: { code: '502', msg: 'Internal Server Error' }
  }
}

module.exports = {
  config,
  constant
}
