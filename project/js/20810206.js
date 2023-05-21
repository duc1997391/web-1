document.addEventListener("DOMContentLoaded", function (event) {
  activeMenu();
  checkLogin();
});
const API = `https://web1-api.vercel.app/api/`
const USER_API = `https://web1-api.vercel.app/users`
const HeaderJson = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
}
const TokenKey = 'web1-token'

function activeMenu() {
  const href = window.location.pathname.split("/").pop() || 'index.html';
  const menuIds = ["app-menu", "menu-footer"];

  menuIds.forEach((id) => {
    const headerMenu = document.getElementById(id);
    const headerMenuItems = headerMenu.getElementsByClassName("nav-link");

    for (let index = 0; index < headerMenuItems.length; index++) {
      const element = headerMenuItems[index];
      if (element.attributes.href.value === href) {
        element.classList.add("active");
      }
    }
  });
}

async function loadData (path, templateId, containerId) {
  const response = await fetch(API + path)
  const data = await response.json()

  const source = document.getElementById(templateId).innerHTML;
  const template = Handlebars.compile(source)
  const html = template({ data })
  document.getElementById(containerId).innerHTML = html
}

async function getAuthToken(username, password) {
  const response = await fetch(`${USER_API}/authenticate`, {
    method: 'POST',
    headers: HeaderJson,
    body: JSON.stringify({username, password})
  })
  const result = await response.json()
  if (response.status === 200) {
    return result.token;
  }
  throw new Error(response.message)
}

async function login (e) {
  e.preventDefault();
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value
  

  try {
    let token = await getAuthToken(username, password)
    if (token) {
      localStorage.setItem(TokenKey, token)
      document.getElementsByClassName('btn-close')[0].click()
      displayControls();
    }
  } catch (error) {
    document.getElementById('login-err').innerHTML = error
    displayControls(false);
  }
}

function displayControls (isLogin = true) {
  const linkLogin = document.getElementsByClassName('link-login') 
  const linkLogout = document.getElementsByClassName('link-logout') 

  let showLogin = 'block';
  let showLogout = 'none';
  if (isLogin) {
    showLogin = 'none';
    showLogout = 'block';
  }
  for (let index = 0; index < 2; index++) {
    linkLogin[index].style.display = showLogin
    linkLogout[index].style.display = showLogout    
  }

  const leaveComment = document.getElementById('leave-comment')
  if (leaveComment) {
    leaveComment.style.display = showLogout
  }
}

async function checkLogin () {
  const token = localStorage.getItem(TokenKey)
  if (token) {
    try {
      let response = await fetch(`${USER_API}/verify`, {
        method: 'POST',
        headers: {
          ...HeaderJson,
          Authorization: 'Bearer ' + token
        }
      });
      if (response.status === 200) {
        displayControls();
      } else {
        throw new Error();
      }
    } catch (error) {
      displayControls(false);
    }
  } else {
    displayControls(false);
  }
}

async function logout () {
  localStorage.removeItem(TokenKey)
  displayControls(false)
}
