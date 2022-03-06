let createPost = document.querySelector(".create-new-post");

createPost.addEventListener("submit", (e) => {
  e.preventDefault();
  let post = {
    author: createPost.elements["author"].value,
    name: createPost.elements["name"].value,
    text: createPost.elements["text"].value,
  };
  fetch("http://localhost:3000/create-post", {
    method: "POST",
    body: JSON.stringify(post),
    headers: { "content-type": "application/json" },
  });
});
