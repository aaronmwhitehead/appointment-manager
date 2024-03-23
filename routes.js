const express = require('express');
const router = express.Router();

// This is where we would get the actual appointment data, but I elected to mock the data on the front-end
const mockData = {};

router.get('/api/v1/appointments', (req, res) => {
    res.json(mockData);
});

module.exports = router;
