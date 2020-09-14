let context,
	oscillator,
	contextGain,
	x = 0;

function start(){
	context = new AudioContext();
	oscillator = context.createOscillator();
	contextGain = context.createGain();
	
	oscillator.connect(contextGain);
	contextGain.connect(context.destination);
	oscillator.start(0);
}

function stop(){
	start();
	contextGain.gain.exponentialRampToValueAtTime(
		0.00001, context.currentTime + x
	)
}

function beep() {
	x = 2.5;
  	stop();
}