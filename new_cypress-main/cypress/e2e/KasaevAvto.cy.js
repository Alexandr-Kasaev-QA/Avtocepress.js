describe('Авторизация и валидация', function () {

    it('Верный логин и верный пароль', function () {
       cy.visit('https://login.qa.studio/');  //Зайти на сайт
       cy.get('#mail').type('german@dolnikov.ru'); //Ввести правильный логин
       cy.get('#pass').type('iLoveqastudio1');     //Ввести правильный пароль
       cy.get('#loginButton').click();             //Нажать войти
       cy.get('#messageHeader').contains('Авторизация прошла успешно'); //Нужный текст
       cy.get('#exitMessageButton > .exitIcon').should('be.visible');  //Крестик виден
    })

    it('Логика восстановления пароля', function () {
        cy.visit('https://login.qa.studio/');  //Зайти на сайт
        cy.get('#forgotEmailButton').click();  //Нажал на кнопку "Забыли пароль"
        cy.get('#mailForgot').type('german@dolnikov.ru');  //Ввести любой имейл
        cy.get('#restoreEmailButton').click();  //Нажать "отправить код"
        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail'); //Нужный текст
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');  //Крестик виден
     })

     it('Авторизация НЕправильный пароль', function () {
        cy.visit('https://login.qa.studio/');  //Зайти на сайт
        cy.get('#mail').type('german@dolnikov.ru'); //Ввести правильный логин
        cy.get('#pass').type('iLoveqastudio8');     //Ввести НЕправильный пароль
        cy.get('#loginButton').click();             //Нажать войти
        cy.get('#messageHeader').contains('Такого логина или пароля нет'); //Нужный текст
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');  //Крестик виден
     })

     it('Авторизация НЕправильный логин', function () {
        cy.visit('https://login.qa.studio/');  //Зайти на сайт
        cy.get('#mail').type('alex@dolnikov.ru'); //Ввести НЕправильный логин
        cy.get('#pass').type('iLoveqastudio1');     //Ввести правильный пароль
        cy.get('#loginButton').click();             //Нажать войти
        cy.get('#messageHeader').contains('Такого логина или пароля нет'); //Нужный текст
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');  //Крестик виден
     })
     
     it('Негативная валидация', function () {
        cy.visit('https://login.qa.studio/');  //Зайти на сайт
        cy.get('#mail').type('germandolnikov.ru'); //Ввести логин без @
        cy.get('#pass').type('iLoveqastudio1');     //Ввести правильный пароль
        cy.get('#loginButton').click();             //Нажать войти
        cy.get('#messageHeader').contains('Нужно исправить проблему валидации'); //Нужный текст
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');  //Крестик виден
     })

     it('Приведение к строчным буквам в логине', function () {
      cy.visit('https://login.qa.studio/');  //Зайти на сайт
      cy.get('#mail').type('GerMan@Dolnikov.ru'); //Ввести правильный логин
      cy.get('#pass').type('iLoveqastudio1');     //Ввести правильный пароль
      cy.get('#loginButton').click();             //Нажать войти
      cy.get('#messageHeader').contains('Авторизация прошла успешно'); //но текст "Такого логина или пароля нет" Тест должен упасть — и это ок
      cy.get('#exitMessageButton > .exitIcon').should('be.visible');  //Крестик виден
   })


})

