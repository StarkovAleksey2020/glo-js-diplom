'use strict';

import './index.html';

import './css/animate.css';
import './css/bootstrap.css';
import './css/font-awesome.css';
import './css/jquery.fancybox.css';
import './css/lightgallery.min.css';
import './css/settings.css';

import './css/style.css';


import logo from './images/logo.png';
import slide1 from './images/slide1.jpg';
import slide2 from './images/slide2.jpg';
import slide3 from './images/slide3.jpg';
import marker from './images/marker.png';
import service1 from './images/service1.jpg';
import service2 from './images/service2.jpg';
import service3 from './images/service3.jpg';
import service4 from './images/service4.jpg';
import service5 from './images/service5.jpg';
import service6 from './images/service6.jpg';
import services1 from './images/services1.png';
import services2 from './images/services2.png';
import services3 from './images/services3.png';
import services4 from './images/services4.png';
import services5 from './images/services5.png';
import chevron from './images/32_chevron_up.svg';
import rightArrow from './images/right-arrow_1.svg';
import icon1 from './images/icon1.png';
import icon2 from './images/icon2.png';
import icon3 from './images/icon3.png';
import addresIcon from './images/address-icon.png';
import telIcon from './images/tel-icon.png';
import clockIcon from './images/clock-icon.png';
import closeIcon from './images/close_icon_green.svg';

import Modal from './modules/modal';
import scrollHref from './modules/scroll';
import Menu from './modules/menu';
import slider from './modules/slider';
import dots from './modules/add-dots';


// Добавляем обработку открытия модального окна с оверлеем
const modalOverlay = document.querySelector('.modal-overlay');
const modalWindow = document.getElementById('callback');
const callBackBtn = document.getElementById('callBckBtnFirst');
const menuBtn = document.querySelector('.mob-menu-btn');
const topMenu = document.querySelector('.visible-md-inline-block');

const modalInstance = new Modal(modalWindow, modalOverlay);
const menuInstance = new Menu(topMenu);

class MainClass {
    constructor(modal, menu) {
        this.modal = modal;
        this.menu = menu;
        this.menuOpened = false;
    }

    eventsListeners() {
        callBackBtn.addEventListener('click', () => {
            this.modal.openModal();
            const closeModalBtn = document.getElementById('closeModalBtn');
            
            closeModalBtn.addEventListener('click', () => {
                this.modal.closeModal();
            });
            this.modal.modalOverlay.addEventListener('click', () => {
                this.modal.closeModal();
            });
        });
        menuBtn.addEventListener('click', () => {
            this.menuOpened = menuInstance.toggleMenu(this.menuOpened);
        });
    }
}

const mainClass = new MainClass(modalInstance, menuInstance);
mainClass.eventsListeners();

// скроллинг
const anchors = document.querySelectorAll('a[href*="#"]');
scrollHref(anchors);

// добавить пойнтер на кнопку меню
menuBtn.style.cursor = 'pointer';

// добавляем точки в слайдер
dots();
// запуск слайдера
slider();
