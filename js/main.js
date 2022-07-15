var $photoUrl = document.getElementById('photo-url');
var $entryFormContainer = document.getElementById('entry-form');
var $entryForm = $entryFormContainer.getElementsByClassName('entry-form-container')[0];
var $entryImage = document.getElementById('entry-image');
var $viewFormContainer = document.getElementById('view-form');
var $newButton = $viewFormContainer.getElementsByTagName('button')[0];
var $entryList = $viewFormContainer.getElementsByTagName('ul')[0];
var $navBar = document.getElementById('nav-bar');
var $navEntries = $navBar.getElementsByClassName('nav-text')[0];

document.addEventListener('DOMContentLoaded', function () {
  if (data.nextEntryId > 1) {
    $navEntries.classList.remove('hidden');
    $entryList.innerHTML = '';
    for (var i = data.entries.length - 1; i >= 0; i--) {
      var $entry = renderEntry(data.entries[i]);
      data.entries[i].dataEntryId = $entry.getAttribute('data-entry-id');
      $entryList.prepend($entry);
    }
  } else {
    $entryList.innerHTML = '<p class="no-entries">No entries have been recorded.</p>';
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
  if ($entryFormContainer.getElementsByClassName('main-header')[0].innerText === 'New Entry') {
    var newData = {
      entryId: data.nextEntryId,
      title: $entryForm.elements.entryTitle.value,
      photoUrl: $entryForm.elements.photoUrl.value,
      notesText: $entryForm.elements.entryNotes.value
    };
    data.entries.unshift(newData);
    if (data.nextEntryId === 1) {
      $entryList.innerHTML = '';
    }
    $entryList.prepend(renderEntry(newData));
    data.nextEntryId++;
    $entryImage.src = 'images/placeholder-image-square.jpg';
    $entryForm.reset();
    $entryFormContainer.classList.add('hidden');
    $viewFormContainer.classList.remove('hidden');
  } else if ($entryFormContainer.getElementsByClassName('main-header')[0].innerText === 'Edit Entry') {
    data.editing.title = $entryForm.elements.entryTitle.value;
    data.editing.photoUrl = $entryForm.elements.photoUrl.value;
    data.editing.notesText = $entryForm.elements.entryNotes.value;
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].dataEntryId === data.editing.dataEntryId) {
        data.entries[i] = data.editing;
        var $entry = $entryList.querySelector('[data-entry-id="' + data.editing.dataEntryId + '"]');
        $entry.querySelector('.entry-title').innerText = data.editing.title;
        $entry.querySelector('.entry-image').src = data.editing.photoUrl;
        $entry.querySelector('.notes-view').innerText = data.editing.notesText;
        data.editing = null;
        $entryImage.src = 'images/placeholder-image-square.jpg';
        $entryForm.reset();
        $entryFormContainer.classList.add('hidden');
        $viewFormContainer.classList.remove('hidden');
        break;
      }
    }

  }
  if (data.nextEntryId > 1) {
    $navEntries.classList.remove('hidden');
  }
});

$newButton.addEventListener('click', function (e) {
  if ($entryFormContainer.getElementsByClassName('main-header')[0].innerText === 'Edit Entry') {
    $entryFormContainer.getElementsByClassName('main-header')[0].innerText = 'New Entry';
    $entryForm.reset();
    $entryImage.src = 'images/placeholder-image-square.jpg';
  }
  $entryFormContainer.classList.remove('hidden');
  $viewFormContainer.classList.add('hidden');
});

$entryList.addEventListener('click', function(event) {
  if (event.target.matches('span.material-symbols-outlined')) {
    var $renderedEntry = event.target.parentElement.parentElement.parentElement.parentElement.parentElement;
    var $entry = {
      dataEntryId: $renderedEntry.getAttribute('data-entry-id'),
      title: $renderedEntry.getElementsByClassName('entry-title')[0].innerText,
      photoUrl: $renderedEntry.getElementsByClassName('entry-image')[0].src,
      notesText: $renderedEntry.getElementsByClassName('notes-view')[0].innerText
    };
    $entryFormContainer.classList.remove('hidden');
    $viewFormContainer.classList.add('hidden');
    $entryFormContainer.getElementsByClassName('main-header')[0].innerText = 'Edit Entry';
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].dataEntryId === $entry.dataEntryId) {
        data.editing = data.entries[i];
        break;
      }
    }
    $entryForm.elements.entryTitle.value = $entry.title;
    $entryForm.elements.photoUrl.value = $entry.photoUrl;
    $entryForm.elements.entryNotes.value = $entry.notesText;
    $entryImage.src = $entry.photoUrl;
  }
});

function renderEntry(entry) {
  var $entry = document.createElement('li');
  entry.dataEntryId = uuid.v4();
  $entry.setAttribute('data-entry-id', entry.dataEntryId);
  var $entryContainer = document.createElement('div');
  var $imageDiv = document.createElement('div');
  var $textDiv = document.createElement('div');
  var $entryImage = document.createElement('img');
  var $entryTitleDiv = document.createElement('div');
  var $titleDiv = document.createElement('div');
  var $entryTitle = document.createElement('h3');
  var $editDiv = document.createElement('div');
  var $entryEdit = document.createElement('span');
  var $entryNotes = document.createElement('p');
  $entryImage.src = entry.photoUrl;
  $entryImage.classList.add('entry-image');
  $entryImage.classList.add('image-view');
  $imageDiv.classList.add('column-half');
  $entryTitleDiv.classList.add('row');
  $titleDiv.classList.add('col-80');
  $entryTitle.classList.add('entry-title');
  $editDiv.classList.add('col-20');
  $entryEdit.classList.add('material-symbols-outlined');
  $textDiv.classList.add('column-half');
  $entryTitle.innerText = entry.title;
  $entryEdit.innerText = 'edit';
  $entryNotes.classList.add('notes-view');
  $entryNotes.innerText = entry.notesText;
  $entryContainer.classList.add('row');
  $entryContainer.classList.add('entry-container');
  $imageDiv.appendChild($entryImage);
  $titleDiv.appendChild($entryTitle);
  $editDiv.appendChild($entryEdit);
  $entryTitleDiv.appendChild($titleDiv);
  $entryTitleDiv.appendChild($editDiv);
  $textDiv.appendChild($entryTitleDiv);
  $textDiv.appendChild($entryNotes);
  $entryContainer.appendChild($imageDiv);
  $entryContainer.appendChild($textDiv);
  $entry.appendChild($entryContainer);
  return $entry;
}

$navBar.addEventListener('click', function (event) {
  if (event.target.matches('h2.nav-text')) {
    $entryFormContainer.classList.add('hidden');
    $viewFormContainer.classList.remove('hidden');
  }
});
