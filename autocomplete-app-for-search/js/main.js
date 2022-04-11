const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

// Search json data 

const searchData = async searchText => {
    const res = await fetch('../data/data_repo.json');
    const data_repo = await res.json();

    // Get matches 
    let matches = data_repo.filter(data => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return data.name.match(regex) || data.abbr.match(regex);
    });
    
    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = '';
    }
    outputHtml(matches);
};

// Display results

const outputHtml = matches => {
    if (matches.length > 0) {
        const html = matches.map(match => `
            <div class="card card-body mb-1">
            <h4>${match.name}
            </h4>
            <small>${match.description} </small>
            </div>
        `).join('');

        matchList.innerHTML = html;
    }
}

// Convert to html string
search.addEventListener('input', () => searchData(search.value));