const medias = {audio : false, video : {
        facingMode : {
          exact : "environment"
        }
      }},
      video  = document.getElementById("video");

navigator.getUserMedia(medias, successCallback, errorCallback);




var canvas = document.getElementById('canvas');
if (canvas.getContext) {

    var context = canvas.getContext('2d');

    //左から20上から40の位置に、幅50高さ100の四角形を描く
    context.fillRect(20,40,50,100);

    //色を指定する
    context.strokeStyle = 'rgb(00,00,255)'; //枠線の色は青
    context.fillStyle = 'rgb(255,00,00)'; //塗りつぶしの色は赤

    //左から200上から80の位置に、幅100高さ50の四角の枠線を描く
    context.strokeRect(200,80,100,50);

    //左から150上から75の位置に、半径60の半円を反時計回り（左回り）で描く
    context.arc(150,75,60,Math.PI*1,Math.PI*2,true);
    context.fill();

} 




function successCallback(stream) {
  video.srcObject = stream;
};

function errorCallback(err) {
  alert(err);
};
