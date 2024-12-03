const express = require('express');
const router = express.Router();
const ownerController = require('../Controller/ownerController');
const authenticate = require('../middleware/authenticate');
const pgController = require('../Controller/pgController')
// Protected route


router.post('/SavePgDtls', authenticate,pgController.savePgDetails);
router.get('/GetPgList',authenticate,pgController.getPgList)
router.post('/SaveFloorDetails',authenticate,pgController.saveFloorDetails)

module.exports = router;
