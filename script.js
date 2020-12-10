const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionaireBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateBtn = document.getElementById('calculate-wealth');


let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

//fetch random users and add money 
async function getRandomUser() {
    const result = await fetch('https://randomuser.me/api');
    const data = await result.json();
    
    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };

    addData(newUser);
}

function doubleMoney() {
    data = data.map((user) => {
        return {...user, money: user.money * 2};
    })

    updateDOM();
}

function sortRichest() {
    data.sort((a, b) => b.money - a.money);
    updateDOM();
}

function showMillionaire() {
    data = data.filter((user) => user.money > 1000000);
    updateDOM();
}

function totalMoney() {
    const total = data.reduce((acc, user) => (acc += user.money), 0);

    const moneyElement = document.createElement('div');
    moneyElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(total)}</strong></h3>`;
    main.appendChild(moneyElement);
}

function addData(obj) {
    data.push(obj);

    updateDOM();
}

function updateDOM(provideData = data) {
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    provideData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    })
}

function formatMoney(money) {
    return '$' + (money).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortRichest);
showMillionaireBtn.addEventListener('click', showMillionaire);
calculateBtn.addEventListener('click', totalMoney);