document.addEventListener("DOMContentLoaded", function (event) {
  activeMenu();
});
const API = `https://web1-api.vercel.app/api/`
const USER_API = `https://web1-api.vercel.app/users`
const HeaderJson = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
}

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
