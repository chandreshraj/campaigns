const { config,constant } = require('../config')
const moment = require("moment");
const logger = require("../utilities/logger")
const axios = require("axios");
const { httpStatus } = constant

let method = Campaigns.prototype
const DONATEURL = config.REQUEST_URL+config.ENDPOINTS.GETCAMPAIGNS;
function Campaigns () {}

method.getCampaigns = (req, res) => {
  logger.info("Requesting for Campaigns Details")
  axios.get(DONATEURL)
    .then(campaigns => {
      let response = campaigns.data.map(
        ({ title, totalAmount, backersCount, endDate }) => ({
          title,
          totalAmount,
          backersCount,
          endDate
        })
      )
      response = sort(response)
      logger.info("Successfully Listed Campaigns Details")
      res.status(httpStatus.ok.code).json(response)
    })
    .catch(e => {
        logger.error("Error while Getting Campaigns Details - ", e)
        res.status(httpStatus.ok.code).json("Unable to get Campaigns, please try again later")
    })
}

//Utility function to sort the Campaigns on Amount
let sort = campaigns => {
  return campaigns.sort((a, b) =>
    a.totalAmount < b.totalAmount ? 1 : b.totalAmount < a.totalAmount ? -1 : 0
  )
}

method.getActiveCampaigns = (req, res) => {
    logger.info("Requesting for active Campaigns Details")
    axios.get(DONATEURL + "?type=active")
    .then(campaigns => {
        let last30ThDay = moment().subtract(30, 'days');
        let activeCampaigns = campaigns.data.filter(({created,endDate})=> moment(created) > last30ThDay && moment(endDate) > moment())
        logger.info("Successfully Listed active Campaigns Details")
        res.status(httpStatus.ok.code).json(activeCampaigns)
    }).catch(e=>{
        logger.error("Error while Getting active Campaigns Details - ", e)
        res.status(httpStatus.ok.code).json("Unable to get active Campaigns, please try again later")
    })
}

/* in the Provided document the URL that was given was
    https://testapi.donatekart.com/api/campaign?type=active
    but there was a URL named
    https://testapi.donatekart.com/api/campaign?type=closed
    I have used the same
 */

method.getClosedCampaigns = (req, res) => {
    logger.info("Requesting for closed Campaigns Details")
    axios.get(DONATEURL+"?type=closed")
    .then(campaigns => {
        let closedCampaigns = campaigns.data.filter(({endDate,totalAmount,procuredAmount})=> moment(endDate) < moment() &&  procuredAmount >= totalAmount)
        logger.info("Successfully Listed Closed Campaigns Details")
        res.status(httpStatus.ok.code).json(closedCampaigns)
    }).catch(e=>{
        console.log(e)
        logger.error("Error while Getting closed Campaigns Details - ", e)
        res.status(httpStatus.ok.code).json("Unable to get closed Campaigns, please try again later")
    })
}

module.exports = Campaigns
