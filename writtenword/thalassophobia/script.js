function loadStory() {
  fetch('story.json')
  .then(response => response.json())
  .then(storyData => {
      document.getElementById('story-title').textContent = storyData.title;
      displayContent(storyData.content);
      window.scrollTo(0, 0); // Scroll to top after content is loaded
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
      p.innerHTML = paragraph; // Use innerHTML to render HTML tags
      storyContentDiv.appendChild(p);
    });
  } else if (typeof content === 'string') {
    storyContentDiv.innerHTML = content; // Use innerHTML for the whole content
  } else {
    storyContentDiv.innerHTML = "<p>Invalid content format.</p>";
  }
}

// Initial load
loadStory();
