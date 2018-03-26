/**
 * The file contains REST endpoints for managing files
 */
let express = require('express');
let multiparty = require('connect-multiparty');
let StorageController = require('./storageController');
//Upload = require('../model');

const router = express.Router();

router.use(multiparty);

/**
 * This handler is responsible for storing the uploaded files in FS and DB
 */
router.get('/:dir/:fileName', async (req, res, next) => {

    const { dir, fileName } = req.params;

    function handleUpload(err, upload) {
        if (err) throw err;
        res.end(JSON.stringify(upload));
    }

    StorageController.getFile(dir, fileName, handleUpload)
    //res.send(`Here is the file stored under "${req.params.path}"!`);

});

router.post('/', async (req, res, next) => {

    // const { files: { file } } = { req };

    StorageController.saveFile(file, success => {
        res.send({ success: true })
    }, err => {
        res.send({ error: err.message })
    })
    //res.send('File is successfully stored!');

});


router.delete(':path/:fileName', function (req, res) {
    /*const id = req.params.id;

    function handleUploadRemove(err) {
        if (err) throw err;
        res.end();
    }

    Upload.findByIdAndRemove(id, handleUploadRemove);*/
});

module.exports = router;