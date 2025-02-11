let currentChapter = 1;
let currentSubchapter = 0;
let chapterData; // Store chapter data to access subchapters

function loadChapter(chapterNumber) {
  fetch(`chapters/chapter${chapterNumber}.json`)
  .then(response => response.json())
  .then(data => {
      chapterData = data; // Store the chapter data
      document.getElementById('chapter-title').textContent = chapterData.title;

      // Check if there are subchapters, if not, load content directly
      if (chapterData.subchapters && chapterData.subchapters.length > 0) {
          loadSubchapter(chapterData.subchapters[currentSubchapter]);
      } else if (chapterData.content) { // Handle cases with content directly in chapter
          displayContent(chapterData.content);
      } else {
        document.getElementById('chapter-content').innerHTML = "<p>No content found for this chapter.</p>";
        document.getElementById('chapter-subtitle').textContent = ""; // Clear subtitle
      }
    })
  .catch(error => {
      console.error("Error loading chapter:", error);
      document.getElementById('chapter-content').innerHTML = "<p>Error loading chapter.</p>";
      document.getElementById('chapter-subtitle').textContent = ""; // Clear subtitle
    });
}


function loadSubchapter(subchapterFilename) {
  fetch(`chapters/${subchapterFilename}`)
  .then(response => response.json())
  .then(subchapterData => {
      displayContent(subchapterData.paragraphs);
      document.getElementById('chapter-subtitle').textContent = subchapterData.title;
    })
  .catch(error => {
        console.error("Error loading subchapter:", error);
        document.getElementById('chapter-content').innerHTML = "<p>Error loading subchapter.</p>";
        document.getElementById('chapter-subtitle').textContent = ""; // Clear subtitle
      });
}

function displayContent(content) {
  const chapterContentDiv = document.getElementById('chapter-content');
  chapterContentDiv.innerHTML = ''; // Clear previous content

  if (Array.isArray(content)) { // Check if it's an array of paragraphs
    content.forEach(paragraph => {
      const p = document.createElement('p');
      p.textContent = paragraph;
      chapterContentDiv.appendChild(p);
    });
  } else if (typeof content === 'string') { // Handle single content string
      const p = document.createElement('p');
      p.textContent = content;
      chapterContentDiv.appendChild(p);
  } else {
      chapterContentDiv.innerHTML = "<p>Invalid content format.</p>";
  }
}


// Event listeners for navigation buttons
document.getElementById('next-chapter').addEventListener('click', () => {
  currentChapter++;
  currentSubchapter = 0; // Reset subchapter to 0 for the new chapter
  loadChapter(currentChapter);
});

document.getElementById('prev-chapter').addEventListener('click', () => {
    if(currentChapter > 1){
      currentChapter--;
      currentSubchapter = 0;
      loadChapter(currentChapter);
    }
});

document.getElementById('next-subsection').addEventListener('click', () => {
  if (chapterData && chapterData.subchapters && currentSubchapter < chapterData.subchapters.length - 1) {
    currentSubchapter++;
    loadSubchapter(chapterData.subchapters[currentSubchapter]);
  }
});

document.getElementById('prev-subsection').addEventListener('click', () => {
    if (chapterData && chapterData.subchapters && currentSubchapter > 0) {
        currentSubchapter--;
        loadSubchapter(chapterData.subchapters[currentSubchapter]);
    }
});



// Initial load
loadChapter(currentChapter);
