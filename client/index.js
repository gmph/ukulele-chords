
const majors = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const allChords = getAllChords(majors);
getChordImageUrl('A').then(console.log);
document.querySelector('button#show-fingering').onclick = () => {
  const rawText = document.querySelector('textarea#raw').value;
  const chordsInRawText = extractChords(rawText);
  displayChords(chordsInRawText);
}

function extractChords(text) {
  let chords = text.split(/\s/).filter(isChord);
  chords = [...new Set(chords)];
  return chords;
}

function displayChords(chords) {
  Promise.all(chords.map(
    chord => getChordImageUrl(chord).then((chordImageUrl) => '<div class="chord"><div class="container"><img src="' + chordImageUrl + '"/></div></div>')
  ))
    .then((chordsHtml) => {
      document.querySelector('#chords').innerHTML = chordsHtml.join('');
    });
}

function getAllChords(majors) {
  let chords = majors.concat(getAllSharps(majors), getAllFlats(majors));
  chords = chords.concat(getAllMinors(chords));
  return chords.sort();
}

function getAllSharps(chords) {
  return chords.map(chord => chord + '#');
}

function getAllFlats(chords) {
  return chords.map(chord => chord + 'b');
}

function getAllMinors(chords) {
  return chords.map(chord => chord + 'm');
}

function isChord(chord) {
  return allChords.indexOf(chord) > -1;
}

function isSharp(chord) {
  return isChord(chord) && chord.indexOf('#') > -1;
}

function getFlatForSharp(sharp) {
  const sharpNote = sharp[0];
  const flatNote = majors[(majors.indexOf(sharpNote) + 1) % majors.length];
  return flatNote + 'b' + sharp.slice(2);
}

function getChordImageUrl(chord) {
  const basePath = '.netlify/functions/server';
  return new Promise((resolve, reject) => {
    if (isSharp(chord)) {
      chord = getFlatForSharp(chord);
    }
    const request = new XMLHttpRequest();
    const onLoad = function () {
      if (this.status === 200) {
        resolve(this.responseText);
      } else {
        reject(new Error('Failed to get chord image URL'));
      }
    }
    request.addEventListener('load', onLoad);
    request.open('GET', basePath + '/' + chord);
    request.send();
  });
}