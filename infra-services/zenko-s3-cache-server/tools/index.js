var s3 = require('s3');

var apiEndpoint = process.env.S3_ENDPOINT_URL;
var httpProxy = process.env.HTTP_PROXY;
var accessKeyID = process.env.S3_ACCESS_KEY_ID;
var secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
var bucketName = process.env.S3_BUCKET_NAME;

console.log(apiEndpoint, httpProxy, accessKeyID, secretAccessKey, bucketName)

var client = s3.createClient({
  s3Options: {
    logger: console,
    accessKeyId: accessKeyID,
    s3ForcePathStyle: true,
    secretAccessKey: secretAccessKey,
    endpoint: apiEndpoint,
    httpOptions: { proxy: httpProxy },
    sslEnabled: false
  }
});


client.s3.createBucket({ Bucket: bucketName }, function () {

	var params = {
		localFile: "index.js",

		s3Params: {
			Bucket: bucketName,
			Key: "touchme"
		}
	};

	var uploader = client.uploadFile(params);

	uploader.on('error', function(err) {
		console.error("unable to upload:", err.stack);
	});
	uploader.on('progress', function() {
		console.log("progress", uploader.progressMd5Amount, uploader.progressAmount, uploader.progressTotal);
	});
	uploader.on('end', function() {
		console.log("done uploading");
	});

});

