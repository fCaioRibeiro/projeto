const multer = require('multer');
const path = require('path');

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'imagens'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'imagens'));
        },
        filename: (req, file, cb) => {
            const fileName = `ecafff64f7857993b8e74a28be62858a-${file.originalname}`;
            cb(null, fileName);
        }
    }),
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ];

        if (allowedMimes.includes(file.mimetype)) {
            file.isValid = true;
            cb(null, true);
        } else {
            file.isValid = false;
            cb(null, true)
        }
    }
};