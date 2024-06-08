Приложение с API Star Wars
Задействовал технологии: React.js, Javascript, SCSS. Библиотеки: React Router, React transition group для анимаций и React Helmet для заголовков документа. Еще API “Звездных войн”.
В приложении 3 страницы: персонажи, планеты и корабли. На главной странице - лист персонажей с подгрузкой, компонент с подробностями по персонажу и компонент с поиском по имени.
Пользователь кликает на любого персонажа и в компоненте справа видит характеристики персонажа, фильмы с участием и корабли. Нажимает на фильм и перенаправляется на страницу с описанием фильма. Ссылка при клике на элемент списка кораблей ведет на страницу 404.
Список персонажей и данные по персонажу сохраняются в Local Storage. Поэтому не требуется запрос к базе данных при возврате к списку персонажей. Благодаря этому интерфейс для пользователя работает быстрее.

Application with Star Wars API
Technologies used: React.js, Javascript, SCSS. Libraries: React Router, React transition group for animations and React Helmet for document headings.
The app contains 3 pages: characters, planets and ships. On the main page there is a list of characters with loading, a component with details on the character and a component with a search by name.
The user clicks on any character and in the component on the right sees the characteristics of the character, films with the participation and ships. Clicks on a movie and is redirected to a page with a description of the movie. When you click on a ship list element, the link leads to a 404 page.
The list of characters and character data are saved in Local Storage. Therefore, no database query is required when returning to the character list. This makes the user interface faster.
