function rainHeartCat() {
    const artCat = [
        'https://static.vecteezy.com/system/resources/previews/009/973/924/non_2x/cute-kitty-cat-head-cartoon-element-free-png.png',
        'https://static.vecteezy.com/system/resources/previews/009/384/878/non_2x/cat-paw-clipart-design-illustration-free-png.png',
        'https://images.vexels.com/media/users/3/151200/isolated/preview/71b99b7323bfd07bab3fc7dd973261e1-elemento-hippie-coracao-vermelho.png',
        'https://images.vexels.com/media/users/3/151200/isolated/preview/71b99b7323bfd07bab3fc7dd973261e1-elemento-hippie-coracao-vermelho.png',
        'https://images.vexels.com/media/users/3/151200/isolated/preview/71b99b7323bfd07bab3fc7dd973261e1-elemento-hippie-coracao-vermelho.png'
    ];
    const totalItens = 100;

    for (let i = 0; i < totalItens; i++) {
        const icons = document.createElement("div");
        icons.classList.add("icons");

        let image = document.createElement('img')
        image.src = artCat[parseInt(Math.random() * 5)];

        icons.appendChild(image)

        icons.style.left = `${Math.random() * 100}%`;
        icons.style.top = `${parseInt(Math.random() * (-60) + -50)}px`
        icons.style.animationDuration = `${Math.random() * 6 + 3}s`;

        const minHeight = 26;
        icons.style.height = `${Math.random() * 20 + minHeight}px`;

        document.body.appendChild(icons);

        setTimeout(() => {
            icons.remove();
        }, 7000);
    }
}

function exibirHeart() {
    const btn_likes = document.querySelectorAll('.btn_like');
    console.log(btn_likes)

    btn_likes.forEach(element => {
        if (element.classList.contains('liked')) {
            element.src = '../assets/componentes-img/heart-post.svg';
        }
    });
}

function pulseElement(element) {
    element.classList.add('pulse');

    setTimeout(() => {
        element.classList.remove('pulse');
    }, 400);
}
