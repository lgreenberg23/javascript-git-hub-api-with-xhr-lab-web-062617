
// 1. Create a form with a `username` field that calls a `getRepositories` function 
// that loads the `repositories` div with a list of public repositories for that
// user. The displayed repositories should include the name and a link to
// the URL (HTML URL, not API URL).




let formEl = document.getElementById("get-username")
let username = document.getElementById("username")
formEl.addEventListener('submit', function(event) {
		event.preventDefault()
	
})

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a> ' + ' - <a href="#" data-repo="' + r.name + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}
 
function getRepositories() {
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username.value}/repos`)
  req.send()
}


// 2. Add a link to each repository that calls a `getCommits` function on
//    click and, when the request is complete, calls a `displayCommits`
// function that fills the `details` div with a list of commits for that repository.
// The display of commits should include the author's Github name, the
// author's full name, and the commit message. Give the link data
// attributes of `username` and `repository` to be used by the `getCommits`
// function.
function displayCommits() {
  const details = JSON.parse(this.responseText)
  const commitsList = `<ul>${details.map(commit => '<li><strong>' + commit.commit.author.name + '</strong> - ' /*+ commit.author.name*/ + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getCommits(el) {
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", `https://api.github.com/repos/${username.value}/${name}/commits`)
  req.send()
}


// request.setRequestHeader("Authorization", token
// acf21736b840740acfdc19c9be48f05ca4ff38da


// 3. Add a link to each repository that calls a `getBranches` function
//    when clicked and, when complete, calls a `displayBranches` function
// that fills the `details` div with a list of names of each
// branch of the repository. Give the link data attributes of `username` and
// `repository` for use by the `getBranches` function.


function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchList = `<ul>${branches.map(br => '<li><strong>' + br.name + '</strong> - ' + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchList
}

function getBranches(el) {
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", `https://api.github.com/repos/${username.value}/${name}/branches`)
  req.send()
}






