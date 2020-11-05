const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
       cb(null, __basedir + '/uploads/')
    },
    filename: (req, file, cb) => {
       cb(null, req.body.name_file + ".csv")
    }
  });   
   
const upload = multer({storage: storage});

module.exports = upload;
