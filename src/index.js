function getXmlPath() {
  const url = document.getElementById('url').value;
  if (!url.trim() || !url.toLowerCase().includes('xml=')) {
    return; // TODO: Add error near input field
  }

  // TODO: Add check if more than one XML parameters in query string
  const xmlRegexpMatch = url.match(/[?|&]XML=(.*?\.xml)/i);
  const xmlPath = xmlRegexpMatch && xmlRegexpMatch.length > 0 ? xmlRegexpMatch[1] : null;
  return xmlPath;
};

async function fetchXmlFile(xmlPath) {
  if (!xmlPath || typeof xmlPath !== 'string') {
    return;
  }

  const response = await fetch(xmlPath);
  return await response.text();
}

document.getElementById('button').addEventListener('click', async () => {
  const xmlPath = getXmlPath();
  const splittedName = xmlPath.split('/');
  const fileName = splittedName.pop();
  const xmlText = await fetchXmlFile(xmlPath);
  const parser = new DOMParser();
  const parsedXml = parser.parseFromString(xmlText, 'text/xml');

  const internalLinks = Array.from(parsedXml.getElementsByTagName('a')).filter(elem => {
    if (elem.attributes.length === 0) {
      return false;
    }
    
    const attributes = elem.attributes;
    return Array.from(attributes).some(attribute => (
      attribute.name === 'l:href' && attribute.value[0] === '#'
    ));
  });

  let text = '';
  const treeWalker = document.createTreeWalker(parsedXml, NodeFilter.SHOW_TEXT);
  while (treeWalker.nextNode()) {
    if (treeWalker.currentNode.parentElement.nodeName === 'binary') {
      continue;
    }

    text += treeWalker.currentNode.nodeValue.replace(/\d/g, '');
  };

  const lengthTextWithoutSpaces = text.replace(/\s/g, '').length;
  const lengthText = text.length;

  let brokenLinks = internalLinks.filter(link => {
    const href = link.attributes.getNamedItem('l:href').value;
    return !parsedXml.querySelector(href);
  })

  document.getElementById('links').innerText = internalLinks.length;
  document.getElementById('letters-w/o-spaces').innerText = new Intl.NumberFormat().format(lengthTextWithoutSpaces);
  document.getElementById('letters-w/-spaces').innerText = new Intl.NumberFormat().format(lengthText);
  document.getElementById('broken-links').innerText = brokenLinks.length;
  document.getElementById('file-name').innerText = fileName;
});