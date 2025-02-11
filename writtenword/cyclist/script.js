let currentChapter = 1;

function loadChapter(chapterNumber) {
  fetch(`chapters/chapter${chapterNumber}.json`)
    .then(response => response.json())
    .then(chapterData => {
      document.getElementById('chapter-title').textContent = chapterData.title;
      const chapterContentDiv = document.getElementById('chapter-content');
      chapterContentDiv.innerHTML = ''; // Clear previous content

      chapterData.paragraphs.forEach(paragraph => {
        const paragraphElement = document.createElement('p');
        paragraphElement.textContent = paragraph;
        chapterContentDiv.appendChild(paragraphElement);
      });

      // Update button states
      document.getElementById('prev-button').disabled = (chapterNumber === 1);
      document.getElementById('next-button').disabled = (chapterNumber === totalChapters); // Assuming you have a `totalChapters` variable
    });
}

// Event listeners for buttons
document.getElementById('prev-button').addEventListener('click', () => {
  currentChapter--;
  loadChapter(currentChapter);
});

document.getElementById('next-button').addEventListener('click', () => {
  currentChapter++;
  loadChapter(currentChapter);
});

// Initial chapter load
loadChapter(currentChapter);
