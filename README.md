# Coffee House — сайт кофейни

Учебный проект RS School по готовому макету Figma: главная страница и каталог с выбором размера и добавок продукта.

[Открыть демо](https://kondrati3vmaksim.github.io/rsschool-landing-page/) · [Исходный код](https://github.com/Kondrati3vMaksim/rsschool-landing-page) · [Все проекты](https://github.com/Kondrati3vMaksim/frontend-portfolio)

[![Coffee House — главная страница](https://raw.githubusercontent.com/Kondrati3vMaksim/frontend-portfolio/main/assets/previews/coffee-house.jpg)](https://kondrati3vmaksim.github.io/rsschool-landing-page/)

## Мой вклад

- Сверстал главную страницу и каталог; использовал Flexbox, Grid и media queries для адаптивности.
- Добавил мобильное меню, блокировку прокрутки, закрытие по Escape и переходу по ссылке.
- Реализовал загрузку локального JSON, карточки товаров и переключение категорий.
- Реализовал модальное окно продукта с выбором размера и добавок и пересчётом цены.
- Добавил закрытие модального окна по фону, кнопке и Escape, а также сохранение темы в localStorage.

Карусель со стрелками и свайпами реализована с помощью ИИ. Дизайн предоставлен в учебном макете; мой вклад — вёрстка и поведение интерфейса.

## Результат и технологии

Посетитель выбирает категорию, открывает продукт и меняет его параметры; итоговая цена обновляется в интерфейсе. Каталог использует локальный `products.json`. Реального заказа, оплаты и внешнего backend нет.

**JavaScript, HTML5, CSS3, Flexbox, Grid, DOM API, Fetch API, localStorage, Figma.**

## Запуск

Нужны Git, современный браузер и HTTP-сервер, например Python 3:

```bash
git clone https://github.com/Kondrati3vMaksim/rsschool-landing-page.git
cd rsschool-landing-page
python3 -m http.server 8080
```

Главная: http://localhost:8080. Каталог: http://localhost:8080/catalog.html. Подойдёт Live Server в VS Code. Нужен HTTP-сервер, поскольку каталог загружает JSON через fetch.

## Код

- [index.html](https://github.com/Kondrati3vMaksim/rsschool-landing-page/blob/main/index.html) и [catalog.html](https://github.com/Kondrati3vMaksim/rsschool-landing-page/blob/main/catalog.html) — страницы.
- [script.js](https://github.com/Kondrati3vMaksim/rsschool-landing-page/blob/main/script.js) — меню, тема, карусель, каталог и цена продукта.
- `style.css`, `catalog.css` — стили; `products.json` — данные каталога.

Код и описание доступны в `main`; рабочая ветка `landing-page-part-2` и её история сохранены.

## Что улучшить дальше

Обработка ошибок загрузки каталога, доступность карточек и модального окна, разделение скрипта на модули и самостоятельное воспроизведение карусели.
