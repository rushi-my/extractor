const inputText = document.getElementById('inputText');
const output = document.getElementById('output');
const notification = document.getElementById('notification');

function processText() {
    const text = inputText.value;
    const pattern = /(\d+)\s\((\d+)\)/g;
    const result = [];
    let match;

    while ((match = pattern.exec(text)) !== null) {
        const articul = match[1];
        const value = match[2];

        if (!['21', '81'].includes(value)) {
            result.push(articul);
        }
    }

    output.innerHTML = result.length > 0 
        ? `<ul>${result.map(articul => `<li>${articul}</li>`).join('')}</ul>` 
        : '<em style="color: #666;">Артикулів не знайдено</em>';
}

function showNotification() {
    notification.classList.add('show');
    setTimeout(() => notification.classList.remove('show'), 2000);
}

function copyResults() {
    const items = Array.from(output.querySelectorAll('li'));
    const textToCopy = items.map(li => li.textContent).join('\n');
    
    if (textToCopy && items.length > 0) {
        navigator.clipboard.writeText(textToCopy).then(showNotification);
    }
}

inputText.addEventListener('input', processText);
processText();