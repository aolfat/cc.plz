import S3 from "aws-sdk/clients/s3";

const s3 = new S3({
  region: "us-west-2",
  accessKeyId: "",
  secretAccessKey: "",
  signatureVersion: "v4",
});

// Upload Image
const uploadImageToS3 = async (file: File, key: string): Promise<string> => {
  console.log(process.env.NEXT_PUBLIC_S3_BUCKET_NAME);
  const params = {
    Bucket: "cc.plz",
    Key: key,
    Body: file,
  };

  // debugger;
  try {
    const { Location } = await s3.upload(params).promise();
    return Location;
  } catch (err) {
    console.log(err);
    throw new Error("Error uploading image to S3");
  }
};

export default uploadImageToS3;

// export default function handler(req: any, res: any) {
//   const { fileName, fileType } = req.query;
//   const s3Params = {
//     Bucket: process.env.BUCKET_NAME,
//     Key: fileName,
//     Expires: 60,
//     ContentType: fileType,
//     ACL: "public-read",
//   };

//   s3.getSignedUrl("putObject", s3Params, (err, data) => {
//     if (err) {
//       console.log(err);
//       return res.end();
//     }
//     const returnData = {
//       signedRequest: data,
//       url: `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${fileName}`,
//     };
//     return res.send(returnData);
//   });
// }
