function openInNewWindow(url) {
    window.open(url, "_blank");
}


//   var copy = document.querySelector(".logos-slide").cloneNode(true);
//   document.querySelector(".logos").appendChild(copy);

  const burger = document.getElementById('burger');
  const list = document.getElementById('list');
  const links = document.querySelectorAll('#list a');
  
  burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      list.classList.toggle('active');
  });
  
  // Add event listener to each link to close the menu when clicked
  links.forEach(link => {
      link.addEventListener('click', () => {
          burger.classList.remove('active');
          list.classList.remove('active');
      });
  });