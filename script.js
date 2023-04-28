var voices = [];

function populateVoiceList() {
  voices = speechSynthesis.getVoices();
  var voiceSelect = document.getElementById('voiceSelect');
  for (var i = 0; i < voices.length; i++) {
    var option = document.createElement('option');
    option.value = voices[i].name;
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
    if (voices[i].default) {
      option.selected = true;
    }
    voiceSelect.appendChild(option);
  }
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function getSelectedVoice() {
  var voiceName = document.getElementById('voiceSelect').value;
  for (var i = 0; i < voices.length; i++) {
    if (voices[i].name === voiceName) {
      return voices[i];
    }
  }
}

function speak() {
  var msg = new SpeechSynthesisUtterance();
  var inputText = document.getElementById('inputText');
  var text = inputText.value;
  msg.text = text;
  msg.voice = getSelectedVoice();
  msg.pitch = document.getElementById('pitch').value;
  msg.rate = document.getElementById('rate').value;
  speechSynthesis.speak(msg);
}
