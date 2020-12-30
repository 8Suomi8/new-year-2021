let supportLetters = document.getElementById('support__path');
let ixLetters = document.getElementsByClassName('ix__path');
let wireEls = document.getElementsByClassName('wire-circle');
let nyLetters = document.getElementsByClassName('ny__letter');
let animatedNY = document.getElementsByClassName('ny__letter fadeIn');

function animateIx() {
  for (let i = 0; i < ixLetters.length; i++) {
    let element = ixLetters[i];
    setTimeout(function () { addAnimateClass(element) }, i * 500);
  }
}

function addAnimateClass(el) {
  el.classList.add('animate');
}

function removeAnimateClass(el) {
  el.classList.remove('animate');
}

function addFadeInClass(el) {
  el.classList.remove('fadeOut');
  el.classList.add('fadeIn');
}

function removeFadeInClass(el) {
  el.classList.remove('fadeIn');
  el.classList.add('fadeOut');
}

function wireFadeIn() {
  for (let i = 0; i < wireEls.length; i++) {
    let element = wireEls[i];
    setTimeout(function () { addFadeInClass(element) }, i * 22);
  }
}

function wireFadeOut() {
  for (let i = 1; i < wireEls.length + 1; i++) {
    let element = document.getElementsByClassName('wire-circle ' + 'c_' + i + ' fadeIn')[0];
    setTimeout(function () { removeFadeInClass(element) }, i * 10);
  }
}

function fadeInNY() {
  for (let i = 0; i < nyLetters.length; i++) {
    let element = nyLetters[i];
    setTimeout(function () { addFadeInClass(element) }, i * 333);
  }
}

function fadeOutNY() {
  for (let i = 1; i < animatedNY.length + 1; i++) {
    let element = document.getElementsByClassName('ny__letter ' + 'l_' + i + ' fadeIn')[0];
    setTimeout(function () { removeFadeInClass(element) }, i * 100);
  }
}

function animateNYLetters() {
  setTimeout(fadeInNY, 1000);
  setTimeout(fadeOutNY, 7000);
}

function initAnimation() {
  setTimeout(wireFadeIn, 1000);
  setTimeout(animateNYLetters, 1100);
  setTimeout(wireFadeOut, 9700);
}

// setTimeout(function () { addAnimateClass(supportLetters) }, 1000);
// setTimeout(animateIx, 2000);

initAnimation();
setInterval(initAnimation, 10000);












