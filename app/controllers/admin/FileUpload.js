const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

const { awsS3Key } = require("../../../config/apiKey")

aws.config.update({
    secretAccessKey: awsS3Key.secretAccessKey,
    accessKeyId: awsS3Key.accessKeyId,
    region: awsS3Key.region
})

const s3 = new aws.S3()
 
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'banty-ecom-images',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname})
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

module.exports = upload