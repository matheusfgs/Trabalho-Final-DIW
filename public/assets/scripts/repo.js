document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const repoId = params.get('id');

    if (repoId) {
        fetchRepoDetails(repoId);
    } else {
        console.error("ID do repositório não encontrado na URL.");
    }
});

async function fetchRepoDetails(repoId) {
    const response = await fetch(`https://api.github.com/repositories/${repoId}`);
    if (!response.ok) {
        console.error("Erro ao buscar os detalhes do repositório");
        return;
    }
    const repo = await response.json();
    displayRepoDetails(repo);
}

function displayRepoDetails(repo) {
    document.querySelector('#repo-name').textContent = repo.name;
    document.querySelector('#repo-description').textContent = repo.description;
    document.querySelector('#repo-created').textContent = new Date(repo.created_at).toLocaleDateString();
    document.querySelector('#repo-owner').textContent = repo.owner.login;
    document.querySelector('#repo-avatar').src = repo.owner.avatar_url;
    document.querySelector('#repo-url').href = repo.html_url;
    document.querySelector('#repo-url').textContent = repo.html_url;
    document.querySelector('#repo-language').textContent = repo.language;
    document.querySelector('#repo-stars').textContent = repo.stargazers_count;
    document.querySelector('#repo-watchers').textContent = repo.watchers_count;
    document.querySelector('#repo-forks').textContent = repo.forks_count;
    document.querySelector('#repo-license').textContent = repo.license ? repo.license.name : 'No license';

    const topicsContainer = document.querySelector('#repo-topics');
    topicsContainer.innerHTML = '';
    repo.topics.forEach(topic => {
        const topicElement = document.createElement('li');
        topicElement.textContent = topic;
        topicsContainer.appendChild(topicElement);
    });
}
