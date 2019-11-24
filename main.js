
let canvas = document.querySelector('.canvas');
let ctx = canvas.getContext('2d');


ctx.strokeStyle = '#fff';
ctx.lineWidth = '3';
ctx.moveTo(300, 0);
ctx.lineTo(200, 70);
ctx.lineTo(400, 70);
ctx.lineTo(300, 150);
ctx.lineTo(300, 230);
ctx.lineTo(200, 280);
ctx.lineTo(300, 320);
ctx.lineTo(130, 320);
ctx.lineTo(230, 420);



ctx.lineCap = 'round';
ctx.stroke();

let city = [];
fetch('city.js')
    .then(function (resp) { return resp.json() })
    .then(function (data) {
        city = data;
    })



let btn = document.querySelectorAll('.nav__btn').forEach(function (element) {
    element.onclick = showWindow;
})

document.querySelector('.modal-wrap').onclick = closeWindow;

function showWindow(e) {
    e.preventDefault();
    let modalId = this.dataset.modal;
    document.querySelector(modalId).classList.remove('hide');
    clear();
    showWeather();


}

function showWeather() {
    let input = document.querySelector('.nav__input').value.toLowerCase().trim();
    let find = false;
    for (let i = 0; i < city.length; i++) {
        const name = city[i].name.toLowerCase();
        if (name == input && city[i].country == 'IT') {
            find = true;

            fetch(`http://api.openweathermap.org/data/2.5/weather?id=${city[i]['id']}&appid=70e1ed322b02acbc57d443dd91065f3e`)
                // fetch(`http://api.openweathermap.org/data/2.5/forecast/daily?id=${city[i]['id']}&appid=2d9d809ecaea6a6c46ae044067edba81`)

                .then(function (resp) { return resp.json() })
                .then(function (data) {
                    console.log(data);
                    document.querySelector('.li-1').innerHTML = data.name;
                    document.querySelector('.li-2').innerHTML = data.sys['country'];
                    document.querySelector('.li-3').innerHTML = parseInt(data.main['temp'] - 273) + '&deg;';
                    document.querySelector('.li-4').innerHTML = data.weather[0]['description'];
                    document.querySelector('.li-5').innerHTML = '';
                    let img = document.createElement('img');
                    img.src = `https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png`;
                    document.querySelector('.li-5').appendChild(img);

                })
                .catch(function () {
                    // catch any errors
                });
        }
    }
    if (!find) alert('Введите только города Италии');

}


function closeWindow() {
    let window = document.querySelector('.modal-wrap');
    window.classList.add('hide');
}

const clear = () => {

}





