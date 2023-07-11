
// Обработчик события для формы авторизации
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Получение значений из полей формы
    const email = document.getElementById('loginEmailInp').value;
    const password = document.getElementById('loginPasswordInp').value;

    // Проверка введенных данных
    const user = JSON.parse(localStorage.getItem(email));
    if (!user || user.password !== password) {
      showMessage('loginMessage', 'Неверный email или пароль.');
      return;
    }

    // Вход пользователя
    login(user);
  });
}

// Функция входа пользователя
function login(user) {
  // Сохранение информации о вошедшем пользователе в localStorage
  localStorage.setItem('currentUser', JSON.stringify(user));

  // Переадресация на страницу только для авторизованных пользователей
  window.location.href = 'authorized.html';
}

// Обработчик события для кнопки выхода
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', function () {
    // Удаление информации о текущем пользователе из localStorage
    localStorage.removeItem('currentUser');

    // Переадресация на страницу авторизации
    window.location.href = 'login.html';
  });
}

// Функция вывода сообщения
function showMessage(elementId, message) {
  const messageElement = document.getElementById(elementId);
  if (messageElement) {
    messageElement.textContent = message;
  }
}

// Проверка авторизации при загрузке страницы authorized.html
window.addEventListener('DOMContentLoaded', function () {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) {
    // Скрытие блока authorizedPage
    const authorizedPage = document.getElementById('authorizedPage');
    authorizedPage.style.display = 'none';

    // Отображение предупреждения
    const warningMessage = document.createElement('p');
    warningMessage.textContent = 'Доступ запрещен. Пожалуйста, авторизуйтесь.';
    warningMessage.classList.add('warning-message'); // Добавление класса стилей
    authorizedPage.parentNode.insertBefore(warningMessage, authorizedPage.nextSibling);

    // Задержка перед переадресацией на страницу авторизации
    setTimeout(function () {
      window.location.href = 'login.html';
    }, 3000);
  }
});




// Поиск страны
const countryInput = document.getElementById('registrationCountryInp');
const countryDropdownList = document.getElementById('countryDropdownList');

// Список всех стран
const countries = [
  'Австралия',
'Австрия',
'Азербайджан',
'Албания',
'Алжир',
'Ангола',
'Андорра',
'Антигуа и Барбуда',
'Аргентина',
'Армения',
'Афганистан',
'Багамские острова',
'Бангладеш',
'Барбадос',
'Бахрейн',
'Беларусь',
'Белиз',
'Бельгия',
'Бенин',
'Болгария',
'Боливия',
'Босния и Герцеговина',
'Ботсвана',
'Бразилия',
'Бруней',
'Буркина-Фасо',
'Бурунди',
'Бутан',
'Вануату',
'Ватикан',
'Великобритания',
'Венгрия',
'Венесуэла',
'Восточный Тимор',
'Вьетнам',
'Габон',
'Гаити',
'Гайана',
'Гамбия',
'Гана',
'Гватемала',
'Гвинея',
'Гвинея-Бисау',
'Германия',
'Гондурас',
'Гренада',
'Греция',
'Грузия',
'Дания',
'Джибути',
'Доминика',
'Доминиканская Республика',
'Египет',
'Замбия',
'Зимбабве',
'Израиль',
'Индия',
'Индонезия',
'Иордания',
'Ирак',
'Иран',
'Ирландия',
'Исландия',
'Испания',
'Италия',
'Йемен',
'Кабо-Верде',
'Казахстан',
'Камбоджа',
'Камерун',
'Канада',
'Катар',
'Кения',
'Кипр',
'Киргизия',
'Кирибати',
'Китай',
'Колумбия',
'Коморские острова',
'Конго',
'Демократическая Республика Конго',
'Коста-Рика',
'Куба',
'Кувейт',
'Лаос',
'Латвия',
'Лесото',
'Либерия',
'Ливан',
'Ливия',
'Литва',
'Лихтенштейн',
'Люксембург',
'Маврикий',
'Мавритания',
'Мадагаскар',
'Малави',
'Малайзия',
'Мали',
'Мальдивы',
'Мальта',
'Марокко',
'Маршалловы острова',
'Мексика',
'Микронезия',
'Мозамбик',
'Молдова',
'Монако',
'Монголия',
'Мьянма',
'Намибия',
'Науру',
'Непал',
'Нигер',
'Нигерия',
'Нидерланды',
'Никарагуа',
'Новая Зеландия',
'Норвегия',
'Объединенные Арабские Эмираты',
'Оман',
'Пакистан',
'Палау',
'Панама',
'Папуа-Новая Гвинея',
'Парагвай',
'Перу',
'Польша',
'Португалия',
'Республика Корея',
'Россия',
'Руанда',
'Румыния',
'Сальвадор',
'Самоа',
'Сан-Марино',
'Сан-Томе и Принсипи',
'Саудовская Аравия',
'Северная Македония',
'Сейшельские острова',
'Сенегал',
'Сент-Винсент и Гренадины',
'Сент-Китс и Невис',
'Сент-Люсия',
'Сербия',
'Сингапур',
'Сирия',
'Словакия',
'Словения',
'Соединенные Штаты Америки',
'Соломоновы острова',
'Сомали',
'Судан',
'Суринам',
'Сьерра-Леоне',
'Таджикистан',
'Таиланд',
'Танзания',
'Того',
'Тонга',
'Тринидад и Тобаго',
'Тувалу',
'Тунис',
'Туркменистан',
'Турция',
'Уганда',
'Узбекистан',
'Украина',
'Уругвай',
'Фиджи',
'Филиппины',
'Финляндия',
'Франция',
'Хорватия',
'Центральноафриканская Республика',
'Чад',
'Черногория',
'Чехия',
'Чили',
'Швейцария',
'Швеция',
'Шри-Ланка',
'Эквадор',
'Экваториальная Гвинея',
'Эритрея',
'Эсватини',
'Эстония',
'Эфиопия',
'Южная Африка',
'Южный Судан',
'Ямайка',
'Япония'
  
];

// Функция для отображения списка стран при вводе
function showCountryDropdown() {
  const searchQuery = countryInput.value.toLowerCase();
  const filteredCountries = countries.filter(country => country.toLowerCase().startsWith(searchQuery));
  renderCountryDropdown(filteredCountries);
}

// Функция для отображения списка стран
function renderCountryDropdown(countries) {
  countryDropdownList.innerHTML = '';

  if (countries.length > 0) {
    countries.forEach(country => {
      const listItem = document.createElement('li');
      listItem.textContent = country;
      listItem.addEventListener('click', function () {
        countryInput.value = country;
        countryDropdownList.innerHTML = '';
      });
      countryDropdownList.appendChild(listItem);
    });
  } else {
    const listItem = document.createElement('li');
    listItem.textContent = 'Страны не найдены';
    listItem.classList.add('disabled');
    countryDropdownList.appendChild(listItem);
  }
}

countryInput.addEventListener('input', showCountryDropdown);


// Обработчик события для формы регистрации
const registrationForm = document.getElementById('registrationForm');
if (registrationForm) {
  registrationForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Получение значений из полей формы
    const firstName = document.getElementById('registrationFirstNameInp').value;
    const lastName = document.getElementById('registrationLastNameInp').value;
    const email = document.getElementById('registrationEmailInp').value;
    const password = document.getElementById('registrationPasswordInp').value;
    const company = document.getElementById('registrationCompanyInp').value;
    const country = document.getElementById('registrationCountryInp').value;
    const phone = document.getElementById('registrationPhoneInp').value;
    const agreement = document.getElementById('agreementChkbox').checked;

    // Проверка введенных данных
    if (!agreement) {
      showMessage('registrationMessage', 'Пожалуйста, примите условия использования.');
      return;
    }

    // Проверка валидности пароля (минимум 8 символов, хотя бы один специальный знак, хотя бы одна буква, хотя бы одна цифра)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      showMessage('registrationMessage', 'Пароль должен содержать минимум 8 символов, хотя бы одну букву, хотя бы одну цифру и хотя бы один специальный знак.');
      return;
    }

    // Регистрация пользователя
    const user = {
      firstName,
      lastName,
      email,
      password,
      company,
      country,
      phone
    };
    registerUser(user);
  });
}

// Функция регистрации пользователя
function registerUser(user) {
  // Проверка, существует ли пользователь с таким email в localStorage
  const existingUser = JSON.parse(localStorage.getItem(user.email));
  if (existingUser) {
    showMessage('registrationMessage', 'Пользователь с таким email уже зарегистрирован.');
    return;
  }

  // Сохранение пользователя в localStorage
  localStorage.setItem(user.email, JSON.stringify(user));

  // Вывод сообщения об успешной регистрации
  showMessage('registrationMessage', 'Вы успешно зарегистрированы!');

  // Очистка полей формы
  if (registrationForm) {
    registrationForm.reset();
  }
}

