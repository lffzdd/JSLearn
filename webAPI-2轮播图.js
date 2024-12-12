const img = document.querySelector('.picture img');
const info = document.querySelector('.info');
const footer = document.querySelector('.footer');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

const data = [
	{ url: './images/webAPI-2/slider01.jpg', title: '对人类来说会不会太超前了？', color: 'rgb(100, 67, 68)' },
	{ url: './images/webAPI-2/slider02.jpg', title: '开启剑与雪的黑暗传说！', color: 'rgb(43, 35, 26)' },
	{ url: './images/webAPI-2/slider03.jpg', title: '真正的jo厨出现了！', color: 'rgb(36, 31, 33)' },
	{
		url: './images/webAPI-2/slider04.jpg',
		title: '李玉刚：让世界通过B站看到东方大国文化',
		color: 'rgb(139, 98, 66)',
	},
	{ url: './images/webAPI-2/slider05.jpg', title: '快来分享你的寒假日常吧~', color: 'rgb(67, 90, 92)' },
	{ url: './images/webAPI-2/slider06.jpg', title: '哔哩哔哩小年YEAH', color: 'rgb(166, 131, 143)' },
	{ url: './images/webAPI-2/slider07.jpg', title: '一站式解决你的电脑配置问题！！！', color: 'rgb(53, 29, 25)' },
	{ url: './images/webAPI-2/slider08.jpg', title: '谁不想和小猫咪贴贴呢！', color: 'rgb(99, 72, 114)' },
];

let index = 0;

prev.addEventListener('click', () => {
	index--;
	index = index >= 0 ? index : data.length - 1;
	toggle();
});
next.addEventListener('click', () => {
	index++;
	index = index < data.length ? index : 0;
	toggle();
});

function toggle() {
	img.src = data[index].url;
	info.innerHTML = data[index].title;
	footer.style.backgroundColor = data[index].color;

	document.querySelector('.slider-indicator li.active').classList.remove('active');
	document.querySelector(`.slider-indicator li:nth-child(${index + 1})`).classList.add('active');
}

let autoplay = setInterval(() => next.click(), 1000);
const slider = document.querySelector('.slider');
slider.addEventListener('mouseenter', () => clearInterval(autoplay));
slider.addEventListener('mouseleave', (e) => {
	if (autoplay) clearInterval(autoplay);
	autoplay = setInterval( () => next.click(), 1000 );
	console.log(e.type, e.clientX)
});
