function getXmlPath() {
  const url = document.getElementById('url').value;
  if (!url.trim() || !url.includes('?XML=')) {
    return; // TODO: Add error near input field
  }

  const xmlPath = url.match(/[?|&]XML=(.*\.xml)/iU);
}