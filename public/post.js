import userAlert from "./alert.js";

let remove = document.querySelector(
  ".post__control .post__control-remove a .remove-post"
);
let change = document.querySelector(
  ".post__control .post__control-edit a button.change-post"
);
let save = document.querySelector(
  ".post__control .post__control-edit a button.save-post"
);
remove.addEventListener("click", function async(e) {
  e.preventDefault();
  let id = this.closest(".post").getAttribute("data-id");
  fetch(`http://localhost:3000/posts/${id}?id=${id}&action=remove`);
  window.location.href = "/post-remove";
});

function swapBtn() {
  if (save.classList.contains("hide")) {
    change.classList.add("hide");
    save.classList.remove("hide");
  } else {
    save.classList.add("hide");
    change.classList.remove("hide");
  }
}

change.addEventListener("click", function (e) {
  e.preventDefault();
  let TA = document.createElement("textarea");
  let textBody = this.closest(".post").querySelector(".post__body");

  let value = textBody.innerHTML;
  textBody.innerHTML = "";

  textBody.append(TA);
  let textAreaBody = textBody.querySelector("textarea");
  textAreaBody.value = value;

  swapBtn();
});

save.addEventListener("click", function (e) {
  e.preventDefault();

  let id = this.closest(".post").getAttribute("data-id");
  let name = this.closest(".post").querySelector(".post .post__name").innerHTML,
    author = this.closest(".post").querySelector(
      ".post .post__author"
    ).innerHTML;

  let textAreaBody = this.closest(".post").querySelector(
    ".post__body textarea"
  );
  let textBody = this.closest(".post").querySelector(".post__body");

  let value = textAreaBody.value;

  textBody.innerHTML = "";
  textBody.innerHTML = value;

  fetch(`http://localhost:3000/posts/${id}`, {
    method: "post",
    body: JSON.stringify({
      id: id,
      author: author,
      name: name,
      text: value,
    }),
    headers: { "content-type": "application/json" },
  });
  swapBtn();
  userAlert("Изменения внесены", this.closest(".container"));
});
