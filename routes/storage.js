/**
 * The file contains REST endpoints for managing files
 */

const express = require('express');
const router = express.Router();

/**
 * This handler is responsible for storing the uploaded files in FS and DB
 */
router.get('/:path', async (req, res, next) => {
    res.send(`Here is the file stored under "${req.params.path}"!`);
});
router.post('/', async (req, res, next) => {
    res.send('File is successfully stored!');
});

module.exports = router;
