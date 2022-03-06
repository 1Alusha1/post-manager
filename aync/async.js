import fetch from "node-fetch";

export default class Async {
  async getPosts() {
    const res = await fetch(
      `https://thoughts-b8609-default-rtdb.firebaseio.com/posts.json`
    );
    const data = res.json();
    return data;
  }
  async getPost(id) {
    let obj = {};
    await this.getPosts().then((data) => {
      let b = Object.keys(data).map((item) => {
        return {
          id: item,
          ...data[item],
        };
      });
      //   console.log(b)
      b.find((item) => (item.id == id ? (obj = item) : ""));
    });
    return obj;
  }
  setPost(data) {
    fetch(`https://thoughts-b8609-default-rtdb.firebaseio.com/posts.json`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    });
  }
  async remove(id) {
    await fetch(
      `https://thoughts-b8609-default-rtdb.firebaseio.com/posts/${id}.json`,
      {
        method: "DELETE",
      }
    );
  }
  async change(data) {
    fetch(
      `https://thoughts-b8609-default-rtdb.firebaseio.com/posts/${data.id}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          author: data.author,
          name: data.name,
          text: data.text,
        }),
      }
    );
  }
}
