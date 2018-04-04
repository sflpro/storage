const fs = require('fs');
const path = require('path');
const mv = require('mv');
const mkdirp = require('mkdirp');
const shortid = require('shortid');
const mongoose = require('mongoose');
const UPLOAD_DIR = process.env.SOURCE_DIR || './store/';

class StorageController {

    getFile(apiPath, callback) {
        if (callback && typeof callback === 'function') {
            // db check !
            callback(path.resolve(path.join(UPLOAD_DIR, apiPath)));
        } else {
            console.log("No handler provided for getting file");
        }
    }

    saveFile(file, host, success, error) {
        const date = new Date();
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1;
        const uploadPath = path.resolve(path.join(UPLOAD_DIR, String(year), String(month)));
        const upload = {};

        mkdirp(uploadPath, function (err) {

            if (err) throw err;
            const fileName = `${shortid.generate()}.${file.name.split('.').pop()}`;
            mv(path.normalize(file.path), path.join(uploadPath, fileName), function (err) {

                if (err) error(err);
                const apiPath = `/${year}/${month}/${fileName}`;
                success({ id: apiPath });

                // DB save goes here
                /* upload._id = mongoose.Types.ObjectId();
                 upload.type = file.type;
                 upload.size = file.size;
                 upload.path = path.join(String(year), String(month), file.name);

                function handleUploadCreate(err, upload) {
                    if (err) throw err;
                    res.end(JSON.stringify(upload));
                }


                Upload.create(upload, handleUploadCreate);*/
            });
        });
    }

    deleteFile(apiPath, handler) {
        fs.unlink(path.resolve(path.join(UPLOAD_DIR, apiPath)), handler);
        // DB delete goes here
    }
}

module.exports = new StorageController();
