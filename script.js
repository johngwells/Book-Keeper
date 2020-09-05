const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

// Show modal, Focus on input
function showModal() {
  modal.classList.add('show-modal');
  websiteNameEl.focus();
}

// Modal Event Listeners
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));
window.addEventListener('click', e => (e.target === modal ? modal.classList.remove('show-modal') : false));

// Validate form
function validate(nameValue, urlValue) {
  const expression = /^(ftp|http|https):\/\/[^ "]+$/g;
  const regex = new RegExp(expression);
  if (!nameValue || !urlValue) {
    alert('please submit both fields');
    return false;
  }
  // if (urlValue.match(regex)) {
  //   alert('match');
  // }
  if (!urlValue.match(regex)) {
    alert('Please provide a valid web address');
    return false;
  }
  // Valid
  return true;
}

// Handle Data from form
function storeBookmark(e) {
  e.preventDefault();
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  if (!urlValue.includes('http://', 'https://')) {
    urlValue = `https://${urlValue}`;
  }
  console.log(nameValue, urlValue)
  // validate(nameValue, urlValue);
  if (!validate(nameValue, urlValue)) {
    return false;
  }
}

// Event Listener
bookmarkForm.addEventListener('submit', storeBookmark);