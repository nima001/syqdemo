
/**
 * 生成水印图片
 * @param {*} iconUrl 
 * @param {*} text 
 * @param {*} config 
 */
export default async function(iconUrl, text, config) {
  let { iconSize, fontSize, spaceV, spaceH, rotate } = Object.assign({
    iconSize: 40, //图标大小
    fontSize: 30, //字体大小
    spaceV: 200, //水平间距
    spaceH: 120, //水平间距
    rotate: 30, //旋转角度
  }, config)
  rotate = rotate * Math.PI / 180;
  let textIndent = iconUrl ? iconSize + 15 : 0;
  let width = textIndent + (text.length * fontSize)
  let height = Math.max(iconSize, fontSize);
  let canvasWidth = Math.sin(rotate) * height + Math.cos(rotate) * width + spaceH;
  let canvasHeight = Math.cos(rotate) * height + spaceV;

  let img;
  if(iconUrl){
    try {
      img = await new Promise((resolve, reject) => {
        var img = new Image();
        img.src = iconUrl;
        img.setAttribute("crossOrigin", '*');
        img.onload = () => {
          resolve(img);
        };
        img.onerror = (error) => {
          reject(error);
        }
      });  
    } catch (error) {
      // console.log(error);
    }
  }

  var canvas = document.createElement("canvas");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  var ctx = canvas.getContext("2d");
  ctx.globalAlpha = 0.1;
  ctx.save();
  ctx.translate(spaceH/2 + Math.sin(rotate) * height, 0)
  ctx.rotate(rotate);
  //画图标和文字
  if(img){
    let imgWidth = img.width, imgHeight = img.height, scale = iconSize / Math.max(imgWidth, imgHeight);
    let w = imgWidth * scale, h = imgHeight * scale;
    ctx.drawImage(img, (iconSize - w)/2, (height - h)/2, w, h);
     //灰化处理
    var pixels = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    let data = pixels.data;
    for(let i=0; i<data.length; i+=4){
      let R = data[i], G = data[i+1], B = data[i+2];
      // let grayscale = (R*38 + G*75 + B*15) >> 7;//灰化处理不同图片灰度不同
      data[i] = 0;
      data[i+1] = 0;
      data[i+2] = 0;
    }
    ctx.putImageData(pixels, 0, 0, 0, 0, pixels.width, pixels.height);
  }
  ctx.font = fontSize + "px 微软雅黑";
  ctx.fillStyle = "#000";
  ctx.textBaseline = 'top';
  ctx.fillText(text, textIndent, (height - fontSize)/2); 
  //画出上部残余（上部分只有尾部会显示在画布内，不需要画图标）
  ctx.restore();
  ctx.translate(spaceH/2 + Math.sin(rotate) * height, -canvasHeight)
  ctx.rotate(rotate);
  ctx.font = fontSize + "px 微软雅黑";
  ctx.textBaseline = 'top';
  ctx.fillStyle = "#000";
  ctx.fillText(text, textIndent, (height - fontSize)/2);
  return canvas.toDataURL();
}