var $photoUrl = document.getElementById('photo-url');
var $entryForm = document.querySelector('.entry-form-container');
var $entryImage = document.getElementById('entry-image');

$photoUrl.addEventListener('input', function (e) {
  if ($entryImage.src === '') {
    $entryImage.style.display = 'none';
  } else {
    $entryImage.src = e.target.value;
  }
});

$entryForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var $entryTitle = document.getElementById('entry-title');
  var $entryNotes = document.getElementById('entry-notes');
  var newData = {
    entryId: data.nextEntryId,
    title: $entryTitle.value,
    photoUrl: $photoUrl.value,
    notesText: $entryNotes.value
  };
  data.entries.push(newData);
  data.nextEntryId++;
  $entryImage.src = 'images/placeholder-image-square.jpg';
  $entryForm.reset();
});
