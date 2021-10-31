const API_URL = "https://api.github.com/users/";

// get input value when pressed enter in input box
document.getElementById("form").addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    getUser(e.target.value);
  }
});

async function getUser(username) {
  const resp = await fetch(API_URL + username);
  const respData = await resp.json();
  getRepos(username);
  console.log(respData);
  addTopSection(respData);
}

function addTopSection(data) {
  let card = ` <div class="img">
    <img src="${data.avatar_url}" alt="profile" id="profile" />
    <a
      id="github-link"
      href="${data.html_url}"
      target="_blank"
      ><img src="link.svg" alt="" />Link To Profile</a
    >
  </div>
  <div class="name-bio">
    <h1>${data.name}</h1>
    <p id="bio">
    ${data.bio}
    </p>
    <p><img src="loc.svg" alt="" />${data.location}</p>
    <a href="${data.twitter_username}" target="_blank"
      >Twitter</a
    >
  </div>`;

  document.getElementById("top-section").innerHTML = card;
}

async function getRepos(username) {
  const resp = await fetch(API_URL + username + "/repos");
  const respData = await resp.json();
  addReposToCard(respData);
}

function addReposToCard(repos) {
  document.getElementById("repos").innerHTML = "";
  repos.forEach((repo) => {
    // console.log(repo);
    let card = `      

    <div class="item">
      <h1>${repo.name}</h1>
      <p>
        ${repo.description}
      </p>
      <a href="${repo.html_url}" target="_blank" id="linkToRepo">Link to repo</a>
      <div class="languages-used">
        <div class="language">${repo.language}</div>
      </div>
    </div>
`;

    document.getElementById("repos").innerHTML += card;
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = search.value;
  if (user) {
    getUser(user);
    search.value = "";
  }
});
