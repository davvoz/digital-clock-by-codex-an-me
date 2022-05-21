/* no scroll */
document.body.style.overflow = 'hidden';
/* crea canvas */
var canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
/* crea context */
var ctx = canvas.getContext('2d');
/* background grigio chiaro */
ctx.fillStyle = '#eee';
ctx.fillRect(0, 0, canvas.width, canvas.height);
/* posiziona la canvas in modo da occupare solo lo schermo */
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
/* riscrivi drawNumber separa i numeri di 4 px */
function drawNumber(number, x, y, numberColor, backgroundColor) {
  var digit = [
    [1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1],
    [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1]
  ];
  var size = 15;
  var padding = 2;
  var width = 3 * size + 2 * padding;
  var height = 5 * size + 4 * padding;
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(x, y, width, height);
  ctx.fillStyle = numberColor;
  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 3; j++) {
      if (digit[number][i * 3 + j]) {
        ctx.fillRect(x + j * size + (j + 1) * padding, y + i * size + (i + 1) * padding, size, size);
      }
    }
  }
  ctx.fillStyle = '#000';
  ctx.fillRect(x + width, y + height / 2 - padding / 2, padding, padding);
  ctx.fillRect(x + width + padding, y + height / 2 - padding / 2, padding, padding);
}
/* drawClock prende in input size  padding width height totalWidth e colori */
function drawClock(size, padding, width, height, totalWidth, numberColor, backgroundColor) {
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var milliseconds = date.getMilliseconds();
  var x = canvas.width / 2 - totalWidth / 2;
  var y = canvas.height / 2 - height / 2;
  drawNumber(Math.floor(hours / 10), x, y, numberColor, backgroundColor);
  drawNumber(hours % 10, x + width, y, numberColor, backgroundColor);
  drawNumber(Math.floor(minutes / 10), x + 2 * width, y, numberColor, backgroundColor);
  drawNumber(minutes % 10, x + 3 * width, y, numberColor, backgroundColor);
  drawNumber(Math.floor(seconds / 10), x + 4 * width, y, numberColor, backgroundColor);
  drawNumber(seconds % 10, x + 5 * width, y, numberColor, backgroundColor);
  drawNumber(Math.floor(milliseconds / 100), x + 6 * width, y, numberColor, backgroundColor);
  drawNumber(Math.floor(milliseconds / 10) % 10, x + 7 * width, y, numberColor, backgroundColor);
  drawNumber(milliseconds % 10, x + 8 * width, y, numberColor, backgroundColor);
}
/* crea i controlli per pRAMETRIZZARE L'OROLOGIO */
var size = 15;
var padding = 2;
var width = 3 * size + 2 * padding;
var height = 5 * size + 4 * padding;
var totalWidth = 9 * width;
var numberColor = '#000';
var backgroundColor = '#fff';
/* CREA I COLOR PICK PER BINDARE  backgroundColor E numberColor */
var backgroundColorPicker = document.createElement('input');
backgroundColorPicker.type = 'color';
backgroundColorPicker.value = backgroundColor;
backgroundColorPicker.addEventListener('change', function() {
  backgroundColor = backgroundColorPicker.value;
});
document.body.appendChild(backgroundColorPicker);
var numberColorPicker = document.createElement('input');
numberColorPicker.type = 'color';
numberColorPicker.value = numberColor;
numberColorPicker.addEventListener('change', function() {
  numberColor = numberColorPicker.value;
});
document.body.appendChild(numberColorPicker);
/* METTILI SOPRA LA CANVAS */
backgroundColorPicker.style.position = 'fixed';
backgroundColorPicker.style.top = 0;
backgroundColorPicker.style.left = 0;
numberColorPicker.style.position = 'fixed';
numberColorPicker.style.top = 0;
numberColorPicker.style.left = '50px';
/* ANIMA */
function animate() {
  ctx.fillStyle = '#eee';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawClock(size, padding, width, height, totalWidth, numberColor, backgroundColor);
  requestAnimationFrame(animate);
}
animate();
/* CREA UN CONTROLLO PER BINDARE LA SIZE */
var sizeSlider = document.createElement('input');
sizeSlider.type = 'range';
sizeSlider.min = 1;
sizeSlider.max = 50;
sizeSlider.value = size;
sizeSlider.addEventListener('change', function() {
  size = sizeSlider.value;
  width = 3 * size + 2 * padding;
  height = 5 * size + 4 * padding;
  totalWidth = 9 * width;
});
document.body.appendChild(sizeSlider);
/* METTILO SOPRA LA CANVAS */
sizeSlider.style.position = 'fixed';
sizeSlider.style.top = 0;
sizeSlider.style.left = '100px';
/* CREA UN CONTROLLO PER BINDARE LA ,width */
var widthSlider = document.createElement('input');
widthSlider.type = 'range';
widthSlider.min = 1;
widthSlider.max = 50;
widthSlider.value = width;
widthSlider.addEventListener('change', function() {
  width = widthSlider.value;
  totalWidth = 9 * width;
});
document.body.appendChild(widthSlider);
/* METTILO SOPRA LA CANVAS */
widthSlider.style.position = 'fixed';
widthSlider.style.top = 0;
widthSlider.style.left = '250px';
/* CREA UN CONTROLLO PER BINDARE height */
var heightSlider = document.createElement('input');
heightSlider.type = 'range';
heightSlider.min = -150;
heightSlider.max = 150;
heightSlider.value = height;
heightSlider.addEventListener('change', function() {
  height = heightSlider.value;
});
document.body.appendChild(heightSlider);
/* METTILO SOPRA LA CANVAS */
heightSlider.style.position = 'fixed';
heightSlider.style.top = 0;
heightSlider.style.left = '400px';
/* /* CREA UN CONTROLLO PER BINDARE totalWidth */
var totalWidthSlider = document.createElement('input');
totalWidthSlider.type = 'range';
totalWidthSlider.min = -1;
totalWidthSlider.max = 500;
totalWidthSlider.value = totalWidth;
totalWidthSlider.addEventListener('change', function() {
  totalWidth = totalWidthSlider.value;
});
document.body.appendChild(totalWidthSlider);
/* METTILO SOPRA LA CANVAS */
totalWidthSlider.style.position = 'fixed';
totalWidthSlider.style.top = 0;
totalWidthSlider.style.left = '550px';