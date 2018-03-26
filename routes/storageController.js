const fs = require('fs');
const path = require('path');
const mv = require('mv');
const mkdirp = require('mkdirp');
const shortid = require('shortid');
const mongoose = require('mongoose');
const UPLOAD_DIR = global.SOURCE_DIR + '/storage/';

class StorageController {

    getFile(directory, name) {
        //Upload.findByPathAndFileName(id, handleUpload);
    }

    saveFile(file, success, error) {
        if (!file) {
            error(new Error("File is not provied"))
        }
        success();
        return;
        const date = new Date();
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1;
        const uploadPath = path.resolve(path.join(UPLOAD_DIR, String(year), String(month)));
        const upload = {};

        mkdirp(uploadPath, function (err) {

            if (err) throw err;
            const fileName = shortid.generate();
            mv(path.normalize(file.path), { mkdirp: true }, path.join(uploadPath, fileName), function (err) {

                if (err) throw err;

                /* upload._id = mongoose.Types.ObjectId();
                 upload.type = file.type;
                 upload.size = file.size;
                 upload.path = path.join(String(year), String(month), file.name);*/

                function handleUploadCreate(err, upload) {
                    if (err) throw err;
                    res.end(JSON.stringify(upload));
                }

                //Upload.create(upload, handleUploadCreate);
            });
        });
    }

    deleteFile() {

    }
}

module.exports = new StorageController();