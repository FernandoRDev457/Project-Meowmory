var post = document.querySelectorAll('.post-blog');

console.log(post)

post.forEach(post_blog => {
    post_blog.addEventListener('click', ()=>{
        window.location.href = `./post-blog.html?id=${post_blog.id}`;
    })
});