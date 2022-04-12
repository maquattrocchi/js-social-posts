const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];
//funzione per creare il post
function stampaPost(){
    const container = document.getElementById('container');
    console.log(container);
    posts.forEach((element)=>{
        const post = document.createElement('div');
        post.setAttribute('class', 'post');
        post.innerHTML = `
        <div class="post__header">
            <div class="post-meta">
                <div class="post-meta__icon">
                    <img class="profile-pic" src="${element.author.image}" alt="${element.author.name}">
                </div>
                <div class="post-meta__data">
                    <div class="post-meta__author">${element.author.name}</div>
                    <div class="post-meta__time">${element.created}</div>
                </div>
            </div>
        </div>
        <div class="post__text">${element.content}</div>
        <div class="post__image">
            <img src="${element.media}" alt="">
        </div>
        <div class="post__footer">
            <div class="likes js-likes">
                <div class="likes__cta">
                    <a class="like-button js-like-button" href="#" data-postid="${element.id}">
                        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                        <span class="like-button__label">Mi Piace</span>
                    </a>
                </div>
                <div class="likes__counter">
                    Piace a <b id="like-counter-${element.id}" class="js-likes-counter">${element.likes}</b> persone
                </div>
            </div> 
        </div>
        `
        container.append(post)
        console.log(post)
    })
};
stampaPost();
//variabile array di bottoni dei likes
const likes = Array.from(document.getElementsByClassName('like-button')) 
console.log(likes)

likes.forEach((like)=>{
    like.addEventListener('click', miPiace);
});
//creo un array per gli id
const postId = []
//funzione like
function miPiace(event){
    event.preventDefault()
    //aggiunta classe
    this.classList.add('like-button--liked');
    //variabile per data-postid
    const data = this.dataset.postid;
    console.log(data);
    //variabile aray counter
    const counter = Array.from(document.getElementsByClassName('js-likes-counter'))
    counter.forEach((element)=>{
        //prendo il valore finale dell'id di ogni elemento
        const elementId = element.id.charAt(element.id.length-1);
        // verifico se corrispondono
        if(data === elementId){
            console.log(elementId)
            element.innerHTML++
        };
    });
    postId.push(data)
    console.log(postId)
    this.removeEventListener('click', miPiace)
    this.addEventListener('click', nonMiPiace)
};

function nonMiPiace(event){
    event.preventDefault()
    //rimozione classe
    this.classList.remove('like-button--liked');
    //variabile per data-postid
    const data = this.dataset.postid;
    console.log(data);
    //variabile aray counter
    const counter = Array.from(document.getElementsByClassName('js-likes-counter'))
    counter.forEach((element)=>{
        //prendo il valore finale dell'id di ogni elemento
        const elementId = element.id.charAt(element.id.length-1);
        // verifico se corrispondono
        if(data === elementId){
            console.log(elementId)
            element.innerHTML--
        };
    });
    //rimozione id dall'array
    for(let i = 0; i < postId.length; i++){ 
        if(postId[i] === data) { 
            postId.splice(i, 1); 
        }
    }
    console.log(postId)
    this.removeEventListener('click', nonMiPiace);
    this.addEventListener('click', miPiace)
}
