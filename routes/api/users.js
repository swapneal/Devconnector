const express = require('express');

const router = express.Router();

router.get('/test', (req,res) => res.json({
  msg:'Inside Users test page'
}));

module.exports = router;