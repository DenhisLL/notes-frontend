# NotesFrontend

В этом репозитории содержится код фронтенд-приложения для проекта Notes. В качестве хранения данных используется local
storage. Notes - это прект для создания, просмотра и редактирования заметок/напоминаний, с возможностью добавлять теги.

### Установка

Скопируйте проект из репозитория используя ключ SSH в локальную папку на вашей рабочей станции:

```sh
$ git clone <ssh-link>
```

Перейдите в папку проекта и установите необходимые для работы пакеты(для установки потребуется node v18):

```sh

$ npm install

```

## Запуск проекта локально

Для запуска проекта необходимо выполнить установку из пункта выше. Далее используйте команды:

```sh

$ npm start

```

или

```sh

$ ng serve

```

## Предпросмотр

Для удобства приложение размещенно на бесплатном [хостинге](https://cheerful-fairy-8fb810.netlify.app/)

## Технологии

Фронтенд Notes разработан с использованием следующих технологий:

- [Angular 17](https://cli.angular.io/) - Фронтенд фреймворк для разработки SPA, с применением
  [TypeScript](https://www.typescriptlang.org/) и [RxJS](https://rxjs-dev.firebaseapp.com//).

- [TaigaUI](https://taiga-ui.dev/) - Готовые компоненты на Ангуляр, библиотека UI.

- Для стилей используется препроцессор [SASS](https://sass-scss.ru/) и его диалект [SCSS](https://sass-scss.ru/).

## Линтеры

Используются eslint и prettier от [Tinkoff](https://github.com/TinkoffCreditSystems/).

## Автор

- [Ермолаев Денис](https://t.me/denhisll) - Фронт-енд разработчик
