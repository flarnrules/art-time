let frames = [];
let recording = false;
let startTime;

let screen;

let glitchShader;

function preload() {
  glitchShader = loadShader('shader.vert', 'shader.frag')
}

function setup() {
  createCanvas(600, 600, WEBGL);
  screen = createGraphics(width, height);
  
  screen.background(50);
  screen.stroke(255);
  screen.strokeWeight(5);
  
  shader(glitchShader);
  
  createLoop({duration:3, gif:true});
  
}

function draw() {
  if(mouseIsPressed) {
    screen.line(mouseX, mouseY, pmouseX, pmouseY);
  }
  
  drawScreen();
  
  if (recording) {
    frames.push(canvas.toDataURL('image/png'));
  }
  
  if (recording && millis() - startTime > 5000) {
    recording = false;
    
  } 
}

function drawScreen() {
  glitchShader.setUniform('texture', screen);
  glitchShader.setUniform('noise', getNoiseValue());
  
  rect(-width/2, -height/2, width, height);
}

function getNoiseValue() {
  let v = noise(millis()/100);
  const cutOff = 0.5;
  
  if (v < cutOff) {
    return 0;
  }
  
  v = pow((v-cutOff) * 1/(1-cutOff), 5);
  
  return v;
}

function mousePressed() {
  if (!recording) {
    frames = []
    recording = true;
    startTime = millis();
  }
}


function resetCanvas() {
  frames = [];
  screen.background(50);
}


function saveGIF(gifData) {
  fetch('/save', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/octet-stream',
      },
      body: gifData,
  });
}