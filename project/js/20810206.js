document.addEventListener("DOMContentLoaded", function (event) {
  activeMenu();
});

function activeMenu() {
  const href = window.location.pathname.split("/").pop();
  console.log(href)
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
