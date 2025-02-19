function loadStory() {
  fetch('story.json')
  .then(response => response.json())
  .then(storyData => {
      document.getElementById('story-title').textContent = storyData.title;
      displayContent(storyData.content);
    })
  .catch(error => {
      console.error("Error loading story:", error);
      document.getElementById('story-content').innerHTML = "<p>Error loading story.</p>";
    });
}

function displayContent(content) {
  const storyContentDiv = document.getElementById('story-content');
  storyContentDiv.innerHTML = '';

  if (Array.isArray(content)) {
    content.forEach(paragraph => {
      const p = document.createElement('p');
      p.textContent = paragraph; // No hyphenation
      storyContentDiv.appendChild(p);
    });
  } else if (typeof content === 'string') {
    const p = document.createElement('p');
    p.textContent = content; // No hyphenation
    storyContentDiv.appendChild(p);
  } else {
    storyContentDiv.innerHTML = "<p>Invalid content format.</p>";
  }
}

// Initial load
loadStory();
