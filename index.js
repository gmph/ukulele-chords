
const majors = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const allChords = getAllChords(majors);
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
  )).then((chordsHtml) => {
    document.querySelector('#chords').innerHTML = chordsHtml.join('');
  });
}

function getAllChords(majors) {
  let chords = majors.concat(getAllSharps(majors), getAllFlats(majors));
  chords = chords.concat(getAllMinors(chords));
  return chords.sort();
}

function getAllSharps(chords) {
  return chords.filter(chord => !['B', 'E'].includes(chord)).map(chord => chord + '#');
}

function getAllFlats(chords) {
  return chords.filter(chord => !['C', 'F'].includes(chord)).map(chord => chord + 'b');
}

function getAllMinors(chords) {
  return chords.map(chord => chord + 'm');
}

function isChord(chord) {
  return typeof chord === 'string' && allChords.indexOf(chord) > -1;
}

function isSharp(chord) {
  return isChord(chord) && chord.indexOf('#') > -1;
}

function getFlatForSharp(sharp) {
  const sharpNote = sharp[0];
  const flatNote = majors[(majors.indexOf(sharpNote) + 1) % majors.length];
  return sharp.replace(sharpNote, flatNote).replace('#', 'b');
}

function getNormalChord(chord) {
  if (!isChord(chord)) {
    return null;
  } else if (isSharp(chord)) {
    return getFlatForSharp(chord);
  } else {
    return chord;
  }
}

function getChordImageUrl(chord) {
  return new Promise((resolve, reject) => {
    if (!isChord(chord)) {
      reject(new Error('Invalid chord'));
    } else {
      resolve(`https://ukutabs.com/chords/standard/${getNormalChord(chord)}.svg`);
    }
  });
}