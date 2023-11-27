const textarea = document.querySelector('textarea');
const voiceList = document.querySelector('select');
const speechBtn = document.querySelector('button');

let synth = speechSynthesis,
isSpeaking = true;

voices();

function voices() {
  for(let voice of synth.getVoices()) {
    let selected = voice.name === 'Google US English' ? 'selected' : '';
    let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
    voiceList.insertAdjacentHTML('beforeend', option);
  }
}

synth.addEventListener('voiceschanged', voices);

function textToSpeech(text) {
  let utterance = new SpeechSynthesisUtterance(text);

  for(let voice of synth.getVoices()) {
    if(voice.name === voiceList.value) {
      utterance.voice = voice;
    }
  }
  synth.speak(utterance);
}

speechBtn.addEventListener('click', e => {
  e.preventDefault();

  if(textarea.value !== '') {
    // check if not speaking, speak textarea text
    if(!synth.speaking) {
      textToSpeech(textarea.value);
    }
    // if text was long, add resume and pause
    if(textarea.value.length > 80) {
      setInterval(() => {
        if(!synth.speaking && !isSpeaking) {
          isSpeaking = true;
          speechBtn.innerText = 'Convert To Speech';
        } else {}
      }, 500)

      if(isSpeaking) {
        synth.resume();
        isSpeaking = false;
        speechBtn.innerText = 'Pause Speach';
      } else {
        synth.pause();
        isSpeaking = true;
        speechBtn.innerText = 'Resume Speach';
      }
    } else {
      speechBtn.innerText = 'Convert To Speech';
    }
  }
})