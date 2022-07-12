var $photoUrl = document.getElementById('photo-url');
var $entryForm = document.querySelector('.entry-form-container');
var $entryImage = document.getElementById('entry-image');
var $newButton = document.getElementById('new-button');
var $navBar = document.getElementById('nav-bar');

document.addEventListener('DOMContentLoaded', function () {
  if (data.nextEntryId > 1) {
    var $navEntries = document.getElementById('nav-entries');
    $navEntries.classList.remove('hidden');
    var $entryList = document.getElementById('entry-list');
    $entryList.innerHTML = '';
    for (var i = data.entries.length - 1; i >= 0; i--) {
      var entry = data.entries[i];
      var $entry = renderEntry(entry);
      $entryList.appendChild($entry);
    }
  } else {
    document.getElementById('entry-list').innerHTML = '<p class="no-entries">No entries have been recorded.</p>';
  }
});

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
  data.entries.unshift(newData);
  document.getElementById('entry-list').appendChild(renderEntry(newData));
  data.nextEntryId++;
  $entryImage.src = 'images/placeholder-image-square.jpg';
  $entryForm.reset();
  if (data.nextEntryId > 1) {
    var $navEntries = document.getElementById('nav-entries');
    $navEntries.classList.remove('hidden');
  }
});

$newButton.addEventListener('click', function (e) {
  var $entryDiv = document.getElementById('entry-form');
  $entryDiv.className = '';
  var $viewDiv = document.getElementById('view-form');
  $viewDiv.className = 'hidden';
});

/*
  <li>
    <div class="row entry-container">
      <div class="column-half">
        <img src="images/placeholder-image-square.jpg" alt="Placeholder Image" class="entry-image image-view">
      </div>
      <div class="column-half">
        <h3 class="entry-title">Title</h3>
        <p class="notes-view">Darth Vader is a fictional character in the Star Wars franchise.
          The character is the central antagonist of the original trilogy and, as Anakin Skywalker,
          is one of the main protagonists throughout the prequel trilogy. Star Wars creator George
          Lucas has collectively referred to the first six episodic films of the franchise as &quot;the
          tragedy of Darth Vader&quot;.[2] He has become one of the most iconic villains in popular
          culture, and has been listed among the greatest villains and fictional characters ever
        </p>
      </div>
    </div>
  </li>
*/

function renderEntry(entry) {
  var $entry = document.createElement('li');
  var $entryContainer = document.createElement('div');
  var $imageDiv = document.createElement('div');
  var $textDiv = document.createElement('div');
  var $entryImage = document.createElement('img');
  var $entryTitle = document.createElement('h3');
  var $entryNotes = document.createElement('p');
  $entryImage.src = entry.photoUrl;
  $entryImage.classList.add('entry-image');
  $entryImage.classList.add('image-view');
  $imageDiv.classList.add('column-half');
  $entryTitle.classList.add('entry-title');
  $textDiv.classList.add('column-half');
  $entryTitle.innerText = entry.title;
  $entryNotes.classList.add('notes-view');
  $entryNotes.innerText = entry.notesText;
  $entryContainer.classList.add('row');
  $entryContainer.classList.add('entry-container');
  $imageDiv.appendChild($entryImage);
  $textDiv.appendChild($entryTitle);
  $textDiv.appendChild($entryNotes);
  $entryContainer.appendChild($imageDiv);
  $entryContainer.appendChild($textDiv);
  $entry.appendChild($entryContainer);
  return $entry;
}

$navBar.addEventListener('click', function (event) {
  if (event.target.matches('h2.nav-text')) {
    document.getElementById('entry-form').classList.add('hidden');
    document.getElementById('view-form').classList.remove('hidden');
  }
});
