export default function userAlert(message, parent, selector = "") {
  let div = document.createElement("div");

  div.classList.add(`user-alert-success`);

  div.innerHTML = message;

  parent.prepend(div);

  div.addEventListener("click", function () {
    this.remove();
  });

  setTimeout(() => {
    div.remove();
  }, 3000);
}
