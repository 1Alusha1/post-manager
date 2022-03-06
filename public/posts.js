let post = document.querySelectorAll('.post');

post.forEach(item=>{
    item.addEventListener('click',function(){
        let id = this.getAttribute('data-id');
        fetch(`http://localhost:3000/posts/${id}`)
        window.location.href = `/posts/${id}`
    })
})

