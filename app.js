const apiUrl = 'https://api.github.com/users/' //STORING API LINK IN VARIABLE CONTAINING INFORMATION OF USERS (BASED ON USERNAME)

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main');

async function getUser(username) //FUNCTION TO GET INFORMATION OF USER ONCE THE USERNAME IS TYPED IN INPUT BOX
{
  try{
    const {data} = await axios(apiUrl+username)
    createUserCard(data) //FUNCTION TO DISPLAY THE INFORMATION ON SCREEN
    getRepos(username) //FUNCTION TO GET REPOSITORIES
  }
  catch(err)
  {
    if(err.response.status == 404) //IF INCASE THE USERNAME TYPED IS WRONG, IT WILL DISPLAY THIS FUNCTION
    {
      createErrorCard('No user found'); //FUNCTION TO DISPLAY THE ERROR MESSAGE
    }
  }
  
}

async function getRepos(username) //FUNCTION TO GET REPOSITORIES
{
  try{
    const {data} = await axios(apiUrl+username+'/repos?sort=created') //THE FUNCTION IS CREATED IN THE SAME WAY AS FOR GETTING THE USER'S DATA
    addReposToCard(data)
  }
  catch(err)
  {
    
      createErrorCard('Problem fetching repos'); //IF INCASE THERE IS AN ISSUE WITH GETTING THE REPOSITORIES
    
  }
}

function createUserCard(user) //THE FUNCTION GETS ACTIVATED WHEN ADDED USERNAME, TILL THEN THE HTML WILL BE HIDDEN
{
    const cardHTML = `<div class="card">   
    <div>
        <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
    </div>
    <div class="user-info">
        <h2>${user.name}</h2>
        <p>${user.bio}</p>
        <ul>
            <li>${user.followers}<strong>Followers</strong></li>
             <li>${user.following}<strong>Following</strong></li>
            <li>${user.public_repos}<strong>Repositories</strong></li>
        </ul>

    <div id="repos"></div>
    </div>
  </div>
  `
  //THE HTML IS STORED IN A VARIABLE AND THEN ADDED WHEN THE USERNAME IS ADDED
    main.innerHTML = cardHTML
}

function addReposToCard(repos) //FUNCTION TO DISPLAY REPOS ON TO THE WEBSITE WHEN USERNAME IS ADDED
{
  const reposEl = document.getElementById('repos')
  repos
        .slice(0,5)
        .forEach(repo => {
        const repoEl = document.createElement('a');
        repoEl.classList.add('repo')
        repoEl.href = repo.html_url
        repoEl.target = '_blank'
        repoEl.innerText = repo.name
        reposEl.appendChild(repoEl)
      
    }
    );
}

function createErrorCard(msg) //FUNCTION TO DISPLAY THE ERROR MESSAGE
{
  //IT DESCRIBES HOW THE MESSAGE FORMAT MUST BE USING HTML STORED IN A VARIABLE
  const cardHTML = `<div class="card">
                        <h1>${msg}</h1>
                    </div>`
        main.innerHTML = cardHTML
}
//TO ADD THE USERNAME WITHOUT REFRESHING THE PAGE INTO THE SEARCH BAR EVEN THOUGH ALREADY A USER IS BEEN SEARCHED
form.addEventListener('submit', (e)=>{
  e.preventDefault()
  const user = search.value
  if(user)
  {
    getUser(user)
    search.value=''
  }
});