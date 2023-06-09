document.addEventListener("DOMContentLoaded", function (event) {
  activeMenu();
});

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

async function loadData (templateId, containerId) {
  // const API = `https://web1-api.vercel.app/api/`
  // const response = await fetch(API + path)
  // const data = await response.json()

  const data = getData()

  const source = document.getElementById(templateId).innerHTML;
  const template = Handlebars.compile(source)
  const html = template({ data })
  document.getElementById(containerId).innerHTML = html
}
