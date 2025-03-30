function search() {
    const query = document.querySelector('.inputs').value;
    if (query.trim() !== '') {
        window.location.href = `results.html?query=${encodeURIComponent(query)}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.querySelector('.searchbtn');
    const searchInput = document.querySelector('.inputs');
    
    searchButton.addEventListener('click', search);
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            search();
        }
    });

    const params = new URLSearchParams(window.location.search);
    const query = params.get('query');
    if (query) {
        // Отображаем введённый запрос в поле ввода
        searchInput.value = query;
        fetchResults(query);
    }
});

function fetchResults(query) {
    const apiKey = 'AIzaSyCXX32YeN6U3fURzBMaYc607dThQVgQO8o';
    const cx = 'b342f1a9d4ebe433d';
    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${apiKey}&cx=${cx}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let results = '';
            if (data.items) {
                results += '<ul>';
                data.items.forEach(item => {
                    results += `<li><a href="${item.link}" target="_self">${item.title}</a><p>${item.snippet}</p></li>`;
                });
                results += '</ul>';
            } else {
                results += '<p>Ничего не найдено. ;)</p>';
            }
            document.getElementById('results').innerHTML = results;
        })
        .catch(error => {
            document.getElementById('results').innerHTML = '<p>Ошибка при выполнении поиска.</p>';
            console.error('Ошибка:', error);
        });
}
