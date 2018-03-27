/**
 * The file contains REST endpoints for managing files
 */
let express = require('express');
let StorageController = require('./storageController');
const multiparty = require('connect-multiparty');
//Upload = require('../model');

module.exports = express.Router()
    .use(multiparty())
    .get('/*', async (req, res, next) => {

        const path = req.originalUrl;

        function handleUpload(pathToFile, err) {
            if (err) throw err;
            res.sendFile(pathToFile);
        }

        StorageController.getFile(path, handleUpload);

    })
    .post('/', async (req, res, next) => {
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
    .delete('/*', function (req, res) {
        const path = req.originalUrl;
        StorageController.deleteFile(path, (err) => {
            //if (err) throw err;
            res.end();
        });
    });