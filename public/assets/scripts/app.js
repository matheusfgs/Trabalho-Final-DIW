document.addEventListener("DOMContentLoaded", function() {
    fetchGitHubProfile();
    fetchGitHubRepos();
    fetchColleagues();
    setupCarousel();
});

const GITHUB_USERNAME = 'matheusfgs';
const COLLEAGUES = ['mmoreira41', 'nkdwon'];

async function fetchGitHubProfile() {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
    if (!response.ok) {
        console.error("Erro ao buscar o perfil do GitHub");
        return;
    }
    const data = await response.json();
    displayProfile(data);
}

async function fetchGitHubRepos() {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
    if (!response.ok) {
        console.error("Erro ao buscar os repositórios do GitHub");
        return;
    }
    const data = await response.json();
    displayRepos(data);
}

function displayProfile(profile) {
    document.querySelector('#github-avatar').src = profile.avatar_url;
    document.querySelector('#github-name').textContent = profile.name;
    document.querySelector('#github-bio').textContent = profile.bio;
}

function displayRepos(repos) {
    const reposContainer = document.querySelector('#github-repos');
    reposContainer.innerHTML = '';
    repos.slice(0, 4).forEach(repo => {
        const repoElement = document.createElement('a');
        repoElement.href = `repo.html?id=${repo.id}`;
        repoElement.classList.add('card');
        repoElement.innerHTML = `
            <h5>${repo.name}</h5>
            <p>${repo.description || 'No description available'}</p>
            <div class="icons">
                <div>
                    <h1>Stars</h1>
                    <p>${repo.stargazers_count}</p>
                </div>
                <div>
                    <h1>Forks</h1>
                    <p>${repo.forks_count}</p>
                </div>
            </div>
        `;
        reposContainer.appendChild(repoElement);
    });
}

async function fetchColleagues() {
    const colleaguesContainer = document.querySelector('.colleagues-container');
    colleaguesContainer.innerHTML = '';
    
    for (const username of COLLEAGUES) {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
            console.error(`Erro ao buscar o perfil do GitHub para o usuário ${username}`);
            continue;
        }
        const data = await response.json();
        displayColleague(data);
    }
}

function displayColleague(colleague) {
    const colleaguesContainer = document.querySelector('.colleagues-container');
    const colleagueCard = document.createElement('div');
    colleagueCard.classList.add('colleague-card');
    colleagueCard.innerHTML = `
        <img src="${colleague.avatar_url}" alt="Avatar de ${colleague.name}">
        <h5>${colleague.name}</h5>
    `;
    colleaguesContainer.appendChild(colleagueCard);
}

function setupCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const nextButton = document.querySelector('.carousel-next');
    const prevButton = document.querySelector('.carousel-prev');
    const indicators = document.querySelectorAll('.carousel-indicator');

    let currentSlide = 0;

    function updateCarousel() {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
            slide.style.transform = `translateX(${-100 * currentSlide}%)`;
        });
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }

    function showNextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    }

    function showPrevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateCarousel();
    }

    nextButton.addEventListener('click', showNextSlide);
    prevButton.addEventListener('click', showPrevSlide);
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
    });

    updateCarousel();
}
