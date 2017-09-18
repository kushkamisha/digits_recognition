var canvas = document.querySelector('#paint');
var ctx = canvas.getContext('2d');

var sketch = document.querySelector('#sketch');
var sketch_style = getComputedStyle(sketch);
canvas.width = parseInt(sketch_style.getPropertyValue('width'));
canvas.height = parseInt(sketch_style.getPropertyValue('height'));

/* Mouse interaction. */
var mouse = {x: 0, y:0};
var last_mouse = {x:0, y:0};
// Mouse capturing work.
canvas.addEventListener('mousemove', function(e) {
    last_mouse.x = mouse.x;
    last_mouse.y = mouse.y;
    
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
}, false);

/* Drawing. */
ctx.lineWidth = 10;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.strokeStyle = 'black';

canvas.addEventListener('mousedown', function(e) {
    ctx.beginPath();
    ctx.moveTo(mouse.x, mouse.y);
    
    canvas.addEventListener('mousemove', onPaint, false);
}, false);

canvas.addEventListener('mouseup', function(e) {
    canvas.removeEventListener('mousemove', onPaint, false);
}, false);

function onPaint() {
    ctx.beginPath();
    ctx.moveTo(last_mouse.x, last_mouse.y);
    ctx.lineTo(mouse.x, mouse.y);
    ctx.closePath();
    ctx.stroke();
}



function clear_() {
    document.getElementById('save_result').innerHTML = '';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function save() {
    document.getElementById('save_result').innerHTML = 'Connecting...';
    // Canvas to base64 format.
    var img = canvas.toDataURL('image/jpg');
    var dig = document.querySelector('input[name="digit"]:checked').value;
    
    $.ajax({
        type: 'POST',
        data: {
            image: img,
            digit: dig
        },
        // url: 'php/save_image.php'
        url: '/hook'
    }).done(function (response) {
        document.getElementById('save_result').innerHTML = response;
    });
}