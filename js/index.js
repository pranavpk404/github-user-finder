const API_URL = "https://api.github.com/users/";

// get input value when pressed enter in input box
document.getElementById("form").addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    getUser(e.target.value);
  }
});

async function getUser(username) {
  try {
    const resp = await fetch(API_URL + username);
    const respData = await resp.json();
    if (respData.html_url === undefined) {
      alert("No user");
    } else {
      getRepos(username);
      addTopSection(respData);
    }
  } catch (error) {
    alert("Some Error Occured");
  }
}

function addTopSection(data) {
  let card = ` <div class="img">
    <img src="${data.avatar_url}" alt="profile" id="profile" />
    <a
      id="github-link"
      href="${data.html_url}"
      target="_blank"
      ><img id="link-svg" src="imgs/link.svg" alt="link to profiles" />Link To Profile</a
    >
  </div>
  <div class="name-bio">
    <h1 id="profileName">${data.name}</h1>
    <p id="bio">
    ${data.bio}
    </p>
    <p><img src="imgs/loc.svg" alt="" />${data.location}</p>
    <p>Twitter User Name:${data.twitter_username}</p
      
    >
  </div>`;

  document.getElementById("top-section").innerHTML = card;
}

async function getRepos(username) {
  try {
    const resp = await fetch(API_URL + username + "/repos");
    const respData = await resp.json();
    addReposToCard(respData);
  } catch (error) {
    alert("Some error occured");
  }
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
