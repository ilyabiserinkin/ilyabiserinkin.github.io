let currentChapter = 1;
let currentSubchapter = 0;
let chapterData;

function loadChapter(chapterNumber) {
    fetch(`chapters/chapter${chapterNumber}.json`)
      .then(response => response.json())
      .then(data => {
            chapterData = data;
            document.getElementById('chapter-title').textContent = chapterData.title;
            currentSubchapter = 0; // Reset subchapter index

            if (chapterData.subchapters && chapterData.subchapters.length > 0) {
                loadSubchapter(chapterData.subchapters[currentSubchapter]);
            } else if (chapterData.content) {  // Handle chapters with direct content
                displayContent(chapterData.content);
                document.getElementById('chapter-subtitle').textContent = ""; // Clear subtitle if no subchapters
            } else {
                document.getElementById('chapter-content').innerHTML = "<p>No content found for this chapter.</p>";
                document.getElementById('chapter-subtitle').textContent = ""; // Clear subtitle
            }

            updateButtonStates(); // Update button states after loading
            window.scrollTo(0, 0); // Scroll to top (instant)
        })
      .catch(error => {
            console.error("Error loading chapter:", error);
            document.getElementById('chapter-content').innerHTML = "<p>Error loading chapter.</p>";
            document.getElementById('chapter-subtitle').textContent = ""; // Clear subtitle
            updateButtonStates();
        });
}

function loadSubchapter(subchapterFilename) {
    fetch(`chapters/${subchapterFilename}`)
      .then(response => response.json())
      .then(subchapterData => {
            displayContent(subchapterData.paragraphs);
            document.getElementById('chapter-subtitle').textContent = subchapterData.title;
            updateButtonStates();
            window.scrollTo(0, 0); // Scroll to top (instant)
        })
      .catch(error => {
            console.error("Error loading subchapter:", error);
            document.getElementById('chapter-content').innerHTML = "<p>Error loading subchapter.</p>";
            document.getElementById('chapter-subtitle').textContent = ""; // Clear subtitle
            updateButtonStates();
        });
}

function displayContent(content) {
    const chapterContentDiv = document.getElementById('chapter-content');
    chapterContentDiv.innerHTML = ''; // Clear previous content

    if (Array.isArray(content)) {
        content.forEach(paragraph => {
            const p = document.createElement('p');
            p.textContent = paragraph;
            chapterContentDiv.appendChild(p);
        });
    } else if (typeof content === 'string') {
        const p = document.createElement('p');
        p.textContent = content;
        chapterContentDiv.appendChild(p);
    } else {
        chapterContentDiv.innerHTML = "<p>Invalid content format.</p>";
    }
}

function updateButtonStates() {
    const prevChapterButton = document.getElementById('prev-chapter');
    const nextChapterButton = document.getElementById('next-chapter');
    const prevSubchapterButton = document.getElementById('prev-subsection');
    const nextSubchapterButton = document.getElementById('next-subsection');

    prevChapterButton.disabled = currentChapter === 1;
    nextChapterButton.disabled = currentChapter === 10; // Adjust 10 if you have different number of chapters

    if (chapterData && chapterData.subchapters && chapterData.subchapters.length > 0) {
        prevSubchapterButton.disabled = currentSubchapter === 0;
        nextSubchapterButton.disabled = currentSubchapter === chapterData.subchapters.length - 1;
    } else {
        prevSubchapterButton.disabled = true;
        nextSubchapterButton.disabled = true;
    }
}

// Event listeners for navigation buttons
document.getElementById('prev-chapter').addEventListener('click', () => {
    if (currentChapter > 1) {
        currentChapter--;
        loadChapter(currentChapter);
    }
});

document.getElementById('next-chapter').addEventListener('click', () => {
    if (currentChapter < 10) { // Adjust 10 if you have different number of chapters
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
