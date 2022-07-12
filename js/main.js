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
  var newData = {
    entryId: data.nextEntryId,
    title: $entryForm.elements.entryTitle.value,
    photoUrl: $entryForm.elements.photoUrl.value,
    notesText: $entryForm.elements.entryNotes.value
  };
  data.entries.unshift(newData);
  data.nextEntryId++;
  $entryImage.src = 'images/placeholder-image-square.jpg';
  $entryForm.reset();
});
