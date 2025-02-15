const inputText = document.getElementById('inputText');
const output = document.getElementById('output');
const notification = document.getElementById('notification');

function processText() {
    const text = inputText.value;
    const result = [];
    
    // Разбиваем текст на товарные блоки
    const blocks = text.split(/\n\s*\n|(?=Ш)/gi);
    
    blocks.forEach(block => {
        // Ищем количество для выставления
        const quantityMatch = block.match(/Виставлено:\s*(\d+)/);
        const quantity = quantityMatch ? parseInt(quantityMatch[1]) : 0;
        
        if(quantity > 0) {
            // Ищем все артикулы в блоке
            const articuls = block.matchAll(/(\d+)\s\((\d+)\)/g);
            
            for(const match of articuls) {
                const articul = match[1];
                const code = match[2];
                
                if(!['21', '81'].includes(code)) {
                    // Добавляем артикул N раз
                    for(let i = 0; i < quantity; i++) {
                        result.push(articul);
                    }
                }
            }
        }
    });

    updateCounter(result.length);
    output.innerHTML = result.length > 0 
        ? `<ul>${result.map(articul => `<li>${articul}</li>`).join('')}</ul>` 
        : '<em style="color: #666;">Артикулів не знайдено</em>';
}

function updateCounter(value) {
    const counterElement = document.getElementById('counter');
    let current = parseInt(counterElement.textContent) || 0;
    const increment = value > current ? 1 : -1;
    
    const update = () => {
        if (current !== value) {
            current += increment;
            counterElement.textContent = current;
            requestAnimationFrame(update);
        }
    };
    
    requestAnimationFrame(update);
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