var $mainContainer = document.getElementById('main-container');
var $navBar = document.getElementById('nav-bar');
var $photoUrl = document.getElementById('photo-url');
var $entryImage = document.getElementById('entry-image');
var $entryFormContainer = document.getElementById('entry-form');
var $viewFormContainer = document.getElementById('view-form');
var $entryForm = $entryFormContainer.getElementsByClassName('entry-form-container')[0];
var $newButton = $viewFormContainer.getElementsByTagName('button')[0];
var $entryList = $viewFormContainer.getElementsByTagName('ul')[0];
var $navEntries = $navBar.getElementsByClassName('nav-text')[0];
var $deteteLink = $entryForm.querySelector('.delete-text');
var $modalContainer = $mainContainer.querySelector('.modal-container');
var $modalDiv = $modalContainer.querySelector('.modal-div');
var $searchBox = $navBar.querySelector('.search-box');

$searchBox.addEventListener('input', function (event) {
  if (event.target.value !== '') {
    var $searchResults = $entryList.querySelectorAll('li');
    for (var i = 0; i < $searchResults.length; i++) {
      if ($searchResults[i].innerText.toLowerCase().indexOf(event.target.value.toLowerCase()) === -1) {
        $searchResults[i].classList.add('hidden');
      } else {
        $searchResults[i].classList.remove('hidden');
      }
    }
  } else {
    $searchResults = $entryList.querySelectorAll('li');
    for (i = 0; i < $searchResults.length; i++) {
      $searchResults[i].classList.remove('hidden');
    }
  }
});

// event listener for DOMContentLoaded and rendering of entries
document.addEventListener('DOMContentLoaded', function () {
  if (data.editing === null) {
    if (data.view === 'view-form') {
      viewViewForm();
    } else if (data.view === 'entry-form') {
      viewEntryForm();
    }
  } else if (data.editing !== null) {
    $entryFormContainer.getElementsByClassName('main-header')[0].innerText = 'Edit Entry';
    viewEntryForm();
    $entryForm.elements.entryTitle.value = data.editing.title;
    $entryForm.elements.entryNotes.value = data.editing.notesText;
    $entryForm.elements.photoUrl.value = data.editing.photoUrl;
    $deteteLink.innerText = 'Delete Entry';
    $entryImage.src = data.editing.photoUrl;
  }
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
    $searchBox.classList.add('hidden');
  }
});

// event listener for new image url input
$photoUrl.addEventListener('input', function (e) {
  if (e.target.value === '') {
    $entryImage.src = 'images/placeholder-image-square.jpg';
  } else {
    $entryImage.src = e.target.value;
  }
});

// event listener for submit form button
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
    viewViewForm();
  } else if ($entryFormContainer.getElementsByClassName('main-header')[0].innerText === 'Edit Entry') {
    data.editing.title = $entryForm.elements.entryTitle.value;
    data.editing.photoUrl = $entryForm.elements.photoUrl.value;
    data.editing.notesText = $entryForm.elements.entryNotes.value;
    const $thisnum = data.editing.arrayIndex;
    if (data.entries[$thisnum].entryId === data.editing.entryId) {
      data.entries[$thisnum] = data.editing;
      var $entry = $entryList.querySelector('[data-entry-id="' + data.editing.entryId + '"]');
      $entry.querySelector('.entry-title').innerText = data.editing.title;
      $entry.querySelector('.entry-image').src = data.editing.photoUrl;
      $entry.querySelector('.notes-view').innerText = data.editing.notesText;
      data.editing = null;
      $entryImage.src = 'images/placeholder-image-square.jpg';
      $entryForm.reset();
      viewViewForm();
    }
  }
  if (data.editing !== null) {
    data.editing = null;
  }
  if (data.nextEntryId > 1) {
    $navEntries.classList.remove('hidden');
  }
  data.view = 'view-form';
});

// event listener for cancel new entry button
$newButton.addEventListener('click', function (e) {
  if ($entryFormContainer.getElementsByClassName('main-header')[0].innerText === 'Edit Entry') {
    $entryFormContainer.getElementsByClassName('main-header')[0].innerText = 'New Entry';
    $deteteLink.innerText = '';
    $entryForm.reset();
    $entryImage.src = 'images/placeholder-image-square.jpg';
  }
  viewEntryForm();
  if (data.editing !== null) {
    data.editing = null;
  }
  data.view = 'entry-form';
});

// event listener for Entries text on the nav bar
$navBar.addEventListener('click', function (event) {
  if (event.target.matches('h2.nav-text')) {
    viewViewForm();
    if (data.editing !== null) {
      data.editing = null;
    }
    data.view = 'view-form';
  }
  $entryImage.src = 'images/placeholder-image-square.jpg';
  $entryForm.reset();
});

// event listener for edit entry button
$entryList.addEventListener('click', function (event) {
  if (event.target.matches('span.material-symbols-outlined')) {
    var $renderedEntry = event.target.parentElement.parentElement.parentElement.parentElement.parentElement;
    var $entry = {
      dataEntryId: $renderedEntry.getAttribute('data-entry-id'),
      title: $renderedEntry.getElementsByClassName('entry-title')[0].innerText,
      photoUrl: $renderedEntry.getElementsByClassName('entry-image')[0].src,
      notesText: $renderedEntry.getElementsByClassName('notes-view')[0].innerText
    };
    $deteteLink.innerText = 'Delete Entry';
    viewEntryForm();
    $entryFormContainer.getElementsByClassName('main-header')[0].innerText = 'Edit Entry';
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].dataEntryId === $entry.dataEntryId) {
        data.editing = data.entries[i];
        data.editing.arrayIndex = i;
        break;
      }
    }
    $entryForm.elements.entryTitle.value = $entry.title;
    $entryForm.elements.photoUrl.value = $entry.photoUrl;
    $entryForm.elements.entryNotes.value = $entry.notesText;
    $entryImage.src = $entry.photoUrl;
    data.view = 'entry-form';
  }
});

// function to build an li entry
function renderEntry(entry) {
  var $entry = document.createElement('li');
  // entry.dataEntryId = uuid.v4();
  $entry.setAttribute('data-entry-id', entry.entryId);
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

// listener for Delete Entry link
$deteteLink.addEventListener('click', function (event) {
  if ($modalContainer.classList.contains('hidden') === true) {
    $modalContainer.classList.remove('hidden');
    $modalContainer.classList.add('size-out');
    var $txtDiv = document.createElement('div');
    var $btnDiv = document.createElement('div');
    var $txt = document.createElement('h3');
    var $cancelButton = document.createElement('button');
    var $confirmButton = document.createElement('button');
    $cancelButton.appendChild(document.createTextNode('CANCEL'));
    $confirmButton.appendChild(document.createTextNode('CONFIRM'));
    $btnDiv.appendChild($cancelButton);
    $btnDiv.appendChild($confirmButton);
    $txt.appendChild(document.createTextNode('Are you sure you want to delete this entry?'));
    $txtDiv.appendChild($txt);
    $modalDiv.appendChild($txtDiv);
    $modalDiv.appendChild($btnDiv);
    $modalDiv.classList.add('modal-size');
    $modalDiv.classList.add('modal-position');
    $txtDiv.className = 'modal-text-div';
    $btnDiv.className = 'modal-button-div';
    $cancelButton.className = 'cancel-button';
    $confirmButton.className = 'confirm-button';
    $txt.className = 'modal-text';
    $confirmButton.addEventListener('click', confirmClick);
    $cancelButton.addEventListener('click', cancelClick);
  }
  $modalContainer.classList.remove('hidden');
}
);

// function to handle the cancel button click
function cancelClick() {
  $modalContainer.classList.add('hidden');
  // remove modalDiv children
  while ($modalDiv.firstChild) {
    $modalDiv.removeChild($modalDiv.firstChild);
  }
}

// function to handle the confirm button click
function confirmClick() {
  var $thisnum = data.editing.arrayIndex;
  if (data.entries[$thisnum].dataEntryId === data.editing.dataEntryId) {
    data.entries.splice($thisnum, 1); // done to remove the entry from the array
    var $entry = $entryList.querySelector('[data-entry-id="' + data.editing.dataEntryId + '"]');
    $entry.parentNode.removeChild($entry); // done to remove from the DOM
    data.editing = null;
  }
  if (data.entries.length === 0) {
    $navEntries.classList.add('hidden');
    $entryList.innerHTML = '<p class="no-entries">No entries have been recorded.</p>';
  }
  for (var i = data.entries.length; i > 0; i--) {
    data.entries[i - 1].entryId = data.entries.length - i + 1;
  }
  data.nextEntryId = data.entries.length + 1;
  $modalContainer.classList.add('hidden');
  // remove modalDiv children
  while ($modalDiv.firstChild) {
    $modalDiv.removeChild($modalDiv.firstChild);
  }
  viewViewForm();
  data.view = 'view-form';
}

function viewEntryForm(event) {
  $entryFormContainer.classList.remove('hidden');
  $viewFormContainer.classList.add('hidden');
  $searchBox.classList.add('hidden');
}

function viewViewForm(event) {
  $entryFormContainer.classList.add('hidden');
  $viewFormContainer.classList.remove('hidden');
  $searchBox.classList.remove('hidden');
}

/*
  <li data-entry-id="0fef1c67-00d4-42f5-89a8-8e76e8c0e312">
    <div class="row entry-container">
      <div class="column-half">
        <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcbsnews1.cbsistatic.com%2Fhub%2Fi%2Fr%2F2005%2F11%2F17%2F4a4e9216-a642-11e2-a3f0-029118418759%2Fresize%2F1240x930%2F94288a1bdeb744c75e8f67d3c4d1188a%2Fimage1052005.jpg&amp;f=1&amp;nofb=1" class="entry-image image-view">
      </div>
      <div class="column-half">
        <div class="row">
          <div class="col-80">
            <h3 class="entry-title">King Kong</h3>
          </div>
          <div class="col-20">
            <span class="material-symbols-outlined">edit</span>
          </div>
        </div>
        <p class="notes-view">
          This is a placeholder text to test the rendering of journal entries.<br>
          More will be added in detailed testing.
          <br><br>
          Please ignore content after reading this
          <br><br>
          Test only!
        </p>
      </div>
    </div>
  </li>
*/

// 1. add delete button to edit entry view = DONE!
// 2. add event listener to delete button
// 3. listen for click on delete button
// 4. find entry in data.entries
// 5. remove entry from data.entries
// 6. remove entry from DOM
// 7. if data.entries.length === 0, hide nav-text
// 8. if data.entries.length > 0, reset entryform and loop through data.entries and reorder entry ids, update data.nextEntryId
// 9. if data.entries.length > 0, reset entryimage and reset entryform
// 10. if data.entries.length > 0, show nav-text
