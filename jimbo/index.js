const medias = {audio : false, video : {
        facingMode : {
          exact : "environment"
        }
      }},
      video  = document.getElementById("video");

// const medias = {audio : false, video: true};

navigator.getUserMedia(medias, successCallback, errorCallback);
var cvs = document.createElement('canvas');



function successCallback(stream) {
    video.srcObject = stream;

    video.onloadedmetadata = function(e) {

        
        var websocket = new WebSocket("wss://10.73.8.154:8000/websocket");

        // When the connection is open, send some data to the server
        websocket.onopen = function () {
                
                websocket.send("aa");

            //https://javascript.programmer-reference.com/js-image-base64/
            //canvas要素を生成してimg要素を反映する
            cvs.width  = video.videoWidth;
            cvs.height = video.videoHeight;

            function sendData(){
                // websocket.send(video);
                //while(true){
                var ctx = cvs.getContext('2d');
                ctx.drawImage(video, 0, 0);

                //canvas要素をBase64化する
                var data = cvs.toDataURL("image/jpeg");

                websocket.send(data);

                delete ctx;
                delete data;
            }
            setInterval(sendData, 100);
        };

        // Log errors
        websocket.onerror = function (error) {
            console.log('WebSocket Error ' + error);
        };

        // Log messages from the server
        websocket.onmessage = function (e) {
            //https://stackoverflow.com/questions/8473205/convert-and-insert-base64-data-to-canvas-in-javascript
            var c = document.getElementById("canvasResult");
            var ct = c.getContext("2d");

            var image = new Image();

            image.onload = function() {
                c.width = image.width;
                c.height = image.height;            
                ct.drawImage(image, 0, 0);
            };
            image.src = "data:image/jpeg;base64," + e.data;
            delete c;
            delete ct;
            delete e;
            delete image;
        };
    };
    
};

function errorCallback(err) {
    alert(err);
};
