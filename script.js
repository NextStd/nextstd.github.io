// Update this string to your exact GitHub Organization/Repository name
const githubRepo = "NextStd/NextStd"; 

// Function to dynamically render the dev cards using GitHub API
async function renderContributors() {
    const grid = document.getElementById('dev-grid');

    try {
        // Fetch contributor data directly from GitHub
        const response = await fetch(`https://api.github.com/repos/${githubRepo}/contributors`);
        
        if (!response.ok) {
            throw new Error("Could not fetch contributors.");
        }

        const contributors = await response.json();
        grid.innerHTML = ''; // Clear the "Loading..." text

        contributors.forEach(dev => {
            const card = document.createElement('div');
            card.className = 'card';

            // Give yourself the Lead Developer title automatically!
            let role = "Open Source Contributor";
            if (dev.login === "vaishnav-sg") {
                role = "Lead Developer / Creator";
            }

            card.innerHTML = `
                <img src="${dev.avatar_url}" alt="${dev.login}">
                <h3>${dev.login}</h3>
                <p>${role}</p>
                <a href="${dev.html_url}" target="_blank" class="btn btn-secondary" style="padding: 0.4rem 1rem; font-size: 0.8rem;">GitHub Profile</a>
            `;

            grid.appendChild(card);
        });

    } catch (error) {
        console.error("Error fetching GitHub contributors:", error);
        
        // Fallback in case of API rate limits or errors
        grid.innerHTML = `
            <div class="card">
                <img src="[https://ui-avatars.com/api/?name=Vaishnav+S+G&background=88C0D0&color=2E3440](https://ui-avatars.com/api/?name=Vaishnav+S+G&background=88C0D0&color=2E3440)" alt="Vaishnav-sg">
                <h3>vaishnav-sg</h3>
                <p>Lead Developer / Creator</p>
                <a href="[https://github.com/vaishnav-sg](https://github.com/vaishnav-sg)" target="_blank" class="btn btn-secondary" style="padding: 0.4rem 1rem; font-size: 0.8rem;">GitHub Profile</a>
            </div>
        `;
    }
}

// Run the function when the page loads
document.addEventListener('DOMContentLoaded', renderContributors);
