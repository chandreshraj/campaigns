const express = require('express')
const router = express.Router()

const Campaigns = require('./index')
let campaigns = new Campaigns()

//API 1
/*
sort by total Amount in desc and return
* */
router.get('/', campaigns.getCampaigns)

//API 2
/*
* created within last 1 month (filter active campaigns)
campaign is active if end date >= today
campaigns created within last 30 days.
* */
router.get('/active', campaigns.getActiveCampaigns)

//API 3
/*
* Filter closed campaigns.
is closed if end date < today OR produced Amount >= total Amount
* */
router.get('/closed', campaigns.getClosedCampaigns)

module.exports = router
