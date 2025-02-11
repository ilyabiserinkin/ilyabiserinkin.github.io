let currentChapter = 1;
let currentSubchapter = 0;
let chapterData;

function loadChapter(chapterNumber) {
  fetch(`chapters/chapter${chapterNumber}.json`)
  .then(response => response.json())
  .then(data => {
      chapterData = data;
      document.getElementById('chapter-title').textContent = chapterData.title;
      currentSubchapter = 0; // Reset subchapter index when loading a new chapter

      if (chapterData.subchapters && chapterData.subchapters.length > 0) {
        loadSubchapter(chapterData.subchapters[currentSubchapter]);
      } else {
        document.getElementById('chapter-content').innerHTML = "<p>No content found for this chapter.</p>";
        document.getElementById('chapter-subtitle').textContent = ""; // Clear subtitle
      }

      // Update button states (NEW!)
      updateButtonStates();
    })
  .catch(error => {
      console.error("Error loading chapter:", error);
      document.getElementById('chapter-content').innerHTML = "<p>Error loading chapter.</p>";
      document.getElementById('chapter-subtitle').textContent = ""; // Clear subtitle
      updateButtonStates(); // Update button states even on error
    });
}

function loadSubchapter(subchapterFilename) {
  fetch(`chapters/${subchapterFilename}`)
  .then(response => response.json())
  .then(subchapterData => {
      displayContent(subchapterData.paragraphs);
      document.getElementById('chapter-subtitle').textContent = subchapterData.title;
      updateButtonStates(); // Update button states after loading subchapter
    })
  .catch(error => {
      console.error("Error loading subchapter:", error);
      document.getElementById('chapter-content').innerHTML = "<p>Error loading subchapter.</p>";
      document.getElementById('chapter-subtitle').textContent = ""; // Clear subtitle
      updateButtonStates(); // Update button states even on error
    });
}

function displayContent(content) { //... (no changes needed here) }

// NEW FUNCTION: Update button states
function updateButtonStates() {
  const prevChapterButton = document.getElementById('prev-chapter');
  const nextChapterButton = document.getElementById('next-chapter');
  const prevSubchapterButton = document.getElementById('prev-subsection');
  const nextSubchapterButton = document.getElementById('next-subsection');

  prevChapterButton.disabled = currentChapter === 1;
  nextChapterButton.disabled = currentChapter === 10; // Assuming 10 chapters. Adjust as needed.

  if (chapterData && chapterData.subchapters) {
    prevSubchapterButton.disabled = currentSubchapter === 0;
    nextSubchapterButton.disabled = currentSubchapter === chapterData.subchapters.length - 1;
  } else {
    prevSubchapterButton.disabled = true;
    nextSubchapterButton.disabled = true;
  }
}


// Event listeners for navigation buttons (Corrected)
document.getElementById('prev-chapter').addEventListener('click', () => {
  if (currentChapter > 1) {
    currentChapter--;
    loadChapter(currentChapter);
  }
});

document.getElementById('next-chapter').addEventListener('click', () => {
  if (currentChapter < 10) { // Assuming 10 chapters. Adjust as needed.
    currentChapter++;
    loadChapter(currentChapter);
  }
});

document.getElementById('prev-subsection').addEventListener('click', () => {
  if (chapterData && chapterData.subchapters && currentSubchapter > 0) {
    currentSubchapter--;
    loadSubchapter(chapterData.subchapters[currentSubchapter]);
  }
});

document.getElementById('next-subsection').addEventListener('click', () => {
  if (chapterData && chapterData.subchapters && currentSubchapter < chapterData.subchapters.length - 1) {
    currentSubchapter++;
    loadSubchapter(chapterData.subchapters[currentSubchapter]);
  }
});

// Initial load
loadChapter(currentChapter);
