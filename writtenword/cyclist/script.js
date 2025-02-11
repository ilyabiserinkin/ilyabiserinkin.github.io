let currentChapter = 1;
let currentSubchapter = 0; // Start with the first subchapter

function loadChapter(chapterNumber) {
  fetch(`chapter${chapterNumber}.json`)
  .then(response => response.json())
  .then(chapterData => {
      document.getElementById('chapter-title').textContent = chapterData.title;
      loadSubchapter(chapterData.subchapters[currentSubchapter]); // Load the first subchapter
    });
}

function loadSubchapter(subchapterFilename) {
  fetch(subchapterFilename)
  .then(response => response.json())
  .then(subchapterData => {
      document.getElementById('chapter-content').innerHTML = ''; // Clear existing content
      subchapterData.paragraphs.forEach(paragraph => {
        const p = document.createElement('p');
        p.textContent = paragraph;
        document.getElementById('chapter-content').appendChild(p);
      });
        document.getElementById('chapter-subtitle').textContent = subchapterData.title;

    });
}


// Event listeners for navigation buttons (example)
document.getElementById('next-chapter').addEventListener('click', () => {
    currentChapter++;
    currentSubchapter = 0; // Reset subchapter to 0 for the new chapter
    loadChapter(currentChapter);
});

document.getElementById('next-subsection').addEventListener('click', () => {
    // Check if there are more subchapters in the current chapter
    fetch(`chapter${currentChapter}.json`)
      .then(response => response.json())
      .then(chapterData => {
            if (currentSubchapter < chapterData.subchapters.length - 1) {
                currentSubchapter++;
                loadSubchapter(chapterData.subchapters[currentSubchapter]);
            } else {
                // Optionally, handle the case where there are no more subchapters
                alert("No more subchapters in this chapter.");
            }
        });
});



// Initial load
loadChapter(currentChapter);
