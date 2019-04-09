function getXmlPath() {
  const url = document.getElementById('url').value;
  if (!url.trim() || !url.includes('?XML=')) {
    return; // TODO: Add error near input field
  }

  // TODO: Add check if more than one XML parameters in query string
  const xmlRegexpMatch = url.match(/[?|&]XML=(.*?\.xml)/i);
  const xmlPath = xmlRegexpMatch && xmlRegexpMatch.length > 0 ? xmlRegexpMatch[1] : null;
  return xmlPath;
}

document.getElementById('button').addEventListener('click', getXmlPath);