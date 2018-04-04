/**
 * The file contains REST endpoints for managing files
 */
let express = require('express');
let StorageController = require('./storageController');
const multiparty = require('connect-multiparty');
//Upload = require('../model');

module.exports = express.Router()
    .use(multiparty())
    .get('/storage/*', async (req, res, next) => {

        const path = req.originalUrl;
	const innerPath = path.replace("/storage",'');
        function handleUpload(pathToFile, err) {
            if (err) throw err;
            res.sendFile(pathToFile);
        }

        StorageController.getFile(innerPath, handleUpload);

    })
    .post('/storage/', async (req, res, next) => {
        const { files, headers: { host } } = req;

        if (files && files.file) {
            StorageController.saveFile(files.file, host, result => {
                res.send({ success: true, id: result.id })
            }, err => {
                res.send(JSON.stringify({ error: err.message }))
            });
        } else {
            res.send(JSON.stringify({ error: "File is not provided" }))
        }

    })
    .delete('/storage/*', function (req, res) {
        const path = req.originalUrl;
        StorageController.deleteFile(path, (err) => {
            //if (err) throw err;
            res.end();
        });
    });
