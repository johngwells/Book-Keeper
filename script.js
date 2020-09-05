const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

let bookmarks = [];

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

// Fetch Bookmarks
function fetchBookmarks() {
  // Get bookmarks from localstorage if available
  if (localStorage.getItem('bookmarks')) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  } else {
    bookmarks = [
      {
        name: 'Design',
        url: 'http://design.com'
      }
    ];
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  console.log(bookmarks);
}

// Handle Data from form
function storeBookmark(e) {
  e.preventDefault();
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  if (!urlValue.includes('http://', 'https://')) {
    urlValue = `https://${urlValue}`;
  }
  if (!validate(nameValue, urlValue)) {
    return false;
  }
  const bookmark = {
    name: nameValue,
    url: urlValue
  };
  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();
  bookmarkForm.reset();
  websiteNameEl.focus();
}

// Event Listener
bookmarkForm.addEventListener('submit', storeBookmark);

// On Load - Fetch Bookmarks
fetchBookmarks();