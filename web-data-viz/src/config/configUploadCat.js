const multer = require('multer');

const diretorioBase = 'public/assets/uploads/catUploads/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, diretorioBase);
  },

  filename: (req, file, cb) => {
    const extensaoArquivo = file.originalname.split('.').pop();
    const novoNomeArquivo = require('crypto')
      .randomBytes(64)
      .toString('hex');

    cb(null, `${novoNomeArquivo}.${extensaoArquivo}`);
  }
});

module.exports = multer({ storage });
