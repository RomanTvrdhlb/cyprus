document.addEventListener('DOMContentLoaded', function() {
  const searchButton = document.getElementById('searchButton');
  const clearButton = document.getElementById('clearButton');
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');

  searchButton.addEventListener('click', function(event) {
    event.preventDefault();
    searchForm.submit();
  });

  clearButton.addEventListener('click', function(event) {
    event.preventDefault();
    searchInput.value = '';
  });
});
