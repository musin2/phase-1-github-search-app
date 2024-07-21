document.addEventListener('DOMContentLoaded', () => {
    let form = document.getElementById('github-form');
    let searchInput = document.getElementById('search');
    let userList = document.getElementById('user-list');
    let reposList = document.getElementById('repos-list');
  
    form.addEventListener('submit', event => {
      event.preventDefault();
      let query = searchInput.value;
      searchUsers(query);
    });
  
    function searchUsers(query) {
      let url = `https://api.github.com/search/users?q=${query}`;
      fetch(url, {
        headers: {
          Accept: 'application/vnd.github.v3+json'
        }
      })
        .then(response => response.json())
        .then(data => {
          displayUsers(data.items);
        });
    }
  
    function displayUsers(users) {
      userList.innerHTML = '';
      reposList.innerHTML = '';
      users.forEach(user => {
        let li = document.createElement('li');
        li.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.login}" width="50">
          <a href="${user.html_url}" target="_blank">${user.login}</a>
          <button data-username="${user.login}">Show Repos</button>
        `;
        li.querySelector('button').addEventListener('click', () => {
          getUserRepos(user.login);
        });
        userList.appendChild(li);
      });
    }
  
    function getUserRepos(username) {
      let url = `https://api.github.com/users/${username}/repos`;
      fetch(url, {
        headers: {
          Accept: 'application/vnd.github.v3+json'
        }
      })
        .then(response => response.json())
        .then(data => {
          displayRepos(data);
        });
    }
  
    function displayRepos(repos) {
      reposList.innerHTML = '';
      repos.forEach(repo => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
        reposList.appendChild(li);
      });
    }
  });
  