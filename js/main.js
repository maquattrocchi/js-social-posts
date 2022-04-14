//array post
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
//funzione data
function changeDate(element){
    let data = new Date(element.created).toLocaleDateString();
    console.log(data);
    element.created = data;
};
//funzione iniziali
function getInitials(element){
    if(element.author.image === null){
        let iniziali = element.author.name.split(' ');
        iniziali = iniziali[0].charAt(0) + iniziali[1].charAt(0);
        element.author.image = iniziali;
        console.log(iniziali);
    };
};
//cambio data e iniziali dove necessario
posts.forEach((element)=>{
    changeDate(element);
    getInitials(element);
});
//funzione per creare il post
function stampaPost(){
    const container = document.getElementById('container');
    console.log(container);
    //creazione post
    posts.forEach((element)=>{
        const post = document.createElement('div');
        post.setAttribute('class', 'post');
        post.innerHTML = `
        <div class="post__header">
            <div class="post-meta">
                <div class="post-meta__icon">
                    <img class="profile-pic" src="${element.author.image}" alt="${element.author.image}">
                    <div style="display:none" class="profile-pic-default">
                        <span>${element.author.image}</span>
                    </div>
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
        container.append(post);
        console.log(post)
    });
};
//stampo i post
stampaPost();
//array di profile-pic
const images = Array.from(document.getElementsByClassName('profile-pic'));
console.log(images);
//aggiungo l'evento
images.forEach((img) =>{
    img.addEventListener('error', imageNotFound);
});
//funzione quando l'img non viene trovata
function imageNotFound (){
        const span = this.nextElementSibling;
        span.style.display = "flex";
        this.remove();
};
//variabile array di bottoni dei likes
const likes = Array.from(document.getElementsByClassName('like-button')) ;
console.log(likes);
//aggiungo la funzione al click
likes.forEach((like)=>{
    like.addEventListener('click', miPiace);
});
//creo un array per gli id
const postId = []
//funzione like
function miPiace(event){
    event.preventDefault();
    //variabile per data-postid
    const data = this.dataset.postid;
    console.log(data);
    //variabile counter per numero di mi piace
    const counter = document.getElementById(`like-counter-${data}`);
    console.log(counter);
    //aggiungo o tolgo il mi piace
    if(!this.classList.contains('like-button--liked')){
        counter.innerHTML++;
        this.classList.add('like-button--liked');
        postId.push(data);
        console.log(postId);
    } else {
        counter.innerHTML--;
        this.classList.remove('like-button--liked');
        for(let i = 0; i < postId.length; i++){ 
            if(postId[i] === data) { 
                postId.splice(i, 1); 
                console.log(postId);
            };
        };
    };
};
