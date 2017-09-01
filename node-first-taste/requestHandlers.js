
var fs=require('fs')
var querystring = require("querystring");
var formidable=require('formidable')

function start(response){
  console.log("4.Request handler 'start' was called.");
  fs.readFile('./index.html','utf8',readHtml)


// get html
  function readHtml(err,data){
    response.writeHead(200,{"Content-Type":"text/html"});
    response.write(data);
    response.end();
  }
}


//get the picture uploaded and renamed
function upload(response,request){
  var form =new formidable.IncomingForm();
  form.parse(request,function(error, fields, files){
   fs.renameSync(files.upload.path,"./tmp/upload.jpg");
   response.writeHead(200,{"Content-Type":"text/html"});
   response.write("received image:<br/>");
   response.write("<img src='/show'>");
   response.end();
 });
}


// post img saved in tmp
function show(response, postData){
  fs.readFile("./tmp/upload.jpg","binary",function(error, file){
    if(error){
      response.writeHead(500,{"Content-Type":"text/plain"});
      response.write(error +"\n");
      response.end();
    }else{
      response.writeHead(200,{"Content-Type":"image/png"});
      response.write(file,'binary');
      response.end();
    }
  });
}

exports.show = show;
exports.start = start;
exports.upload = upload;
