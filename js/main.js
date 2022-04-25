// main slider
let mainSlider = new Swiper('.js-main-slider', {
  pagination: {
    el: '.js-main-slider-dots',
    type: 'bullets',
    clickable: true
  },
  navigation: {
    nextEl: '.js-swiper-button-right',
    prevEl: '.js-swiper-button-left'
  },
  effect: 'fade',
  autoplay: {
    delay: 5000,
    stopOnLastSlide: false,
    disableOnInteraction: true,
  }
});

//main slider fractions
if (document.querySelector('.main-slider__fraction-current') && document.querySelector('.main-slider__fraction-total')) {
  const mainSliderCurrent = document.querySelector('.main-slider__fraction-current');
  const mainSliderTotal = document.querySelector('.main-slider__fraction-total');

  mainSliderTotal.innerHTML = mainSlider.slides.length;
  mainSlider.on('slideChange', function () {
    mainSliderCurrent.innerHTML = ++mainSlider.realIndex;
  });
}

//open / close category item on mobile version

if (document.querySelector('.category-item')) {

  let categoryItems = document.querySelectorAll('.category-item');

  categoryItems.forEach((categoryItem) => {

    categoryItem.addEventListener('click', () => {
      if (categoryItem.classList.contains('_active')) {
        categoryItem.classList.remove('_active');
      } else {
        categoryItems.forEach((i) => {
          i.classList.remove('_active');
        });
        categoryItem.classList.add('_active');
      }
    });
  });
}

// change region

if (document.querySelector('.place')) {
  let place = document.querySelector('.place');
  let placeNameText = place.querySelector('.place__name-text');
  let placeListBtn = place.querySelectorAll('.place__list-btn');


  placeListBtn.forEach((i) => {
    if (i.innerHTML == placeNameText.innerHTML) {
      i.classList.add('_active');
    }
    i.addEventListener('click', () => {
      placeListBtn.forEach((k) => {
        k.classList.remove('_active');
      });
      i.classList.add('_active');
      placeNameText.innerHTML = i.innerHTML;
    })
  });
}

//tabs
let tab = function () {
  let tabs = document.querySelectorAll('.tabs'),
    tabName;

  for (let i = 0; i < tabs.length; i++) {
    let tabNav = tabs[i].querySelectorAll('.tabs-nav');
    let tabContent = tabs[i].querySelectorAll('.tab');

    tabNav.forEach(item => {
      item.addEventListener('click', selectTabNav)
    });

    function selectTabNav() {
      tabNav.forEach(item => {
        item.classList.remove('is-active');
      });
      this.classList.add('is-active');
      tabName = this.getAttribute('data-tab-name');
      selectTabContent(tabName);
    }

    function selectTabContent(tabName) {
      tabContent.forEach(item => {
        item.classList.contains(tabName) ? item.classList.add('is-active') : item.classList.remove('is-active');
      })
    }
  }
};

tab();

//products slider
new Swiper('.products-content__slider', {
  slidesPerView: 1,
  spaceBetween: 7,
  observer: true,
  observeParents: true,
  observeSlideChildren: true,
  pagination: {
    el: '.tab__slider-dots-inner',
    type: 'bullets',
    clickable: true
  },
  breakpoints: { //сработают при ширине экрана больше, чем указанные значения
    1399: {
      slidesPerView: 6,
    },
    1149: {
      slidesPerView: 5,
    },
    929: {
      slidesPerView: 4,
    },
    699: {
      slidesPerView: 3,
    },
    480: {
      slidesPerView: 2,
    }
  }
});



//favorite button
const favorite = document.querySelectorAll('.products-item__favorites-btn');

for (let key of favorite) {
  key.onclick = () => {
    key.classList.toggle('_active');
  }
}

//products item price calculator
let priceCalculator = function () {


  const priceInput = document.querySelectorAll('.products-item__number-input');
  const priceUp = document.querySelectorAll('.products-item__number-up');
  const priceDown = document.querySelectorAll('.products-item__number-down');
  const price = document.querySelectorAll('.products-item__price');


  let countPrice = function (ind, val) {
    price[ind].innerHTML = val * +price[ind].getAttribute('data-price');
  }


  for (let i = 0; i < priceInput.length; i++) {
    const priceMax = +priceInput[i].getAttribute('max');
    const priceMin = +priceInput[i].getAttribute('min');

    priceUp[i].onclick = () => {
      if (+priceInput[i].value < priceMax) {
        priceInput[i].value = +priceInput[i].value + 1;
        countPrice(i, priceInput[i].value);
      }
    }
    priceDown[i].onclick = () => {
      if (+priceInput[i].value > priceMin) {
        priceInput[i].value = +priceInput[i].value - 1;
        countPrice(i, priceInput[i].value);
      }
    }
    priceInput[i].oninput = () => {
      if (+priceInput[i].value > priceMax) {
        priceInput[i].value = +priceInput[i].value.slice(0, 2);
        countPrice(i, priceInput[i].value);
      } else if (+priceInput[i].value == 0) {
        price[i].innerHTML = +price[i].getAttribute('data-price');
      } else if (+priceInput[i].value.length == 0) {
        price[i].innerHTML = +price[i].getAttribute('data-price');
      } else {
        countPrice(i, priceInput[i].value);
      }
    }
    priceInput[i].onchange = () => {
      if (+priceInput[i].value == 0 || priceInput[i].value.length == 0) {
        priceInput[i].value = priceMin;
        countPrice(i, priceInput[i].value);
      }
    }
  }
}

priceCalculator();

//map
function initMap() {
  // The location of Uluru
  const uluru = { lat: 50.449122614221935, lng: 30.474685456088555 };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
    center: uluru,
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: { lat: 50.449122614221935, lng: 30.474685456088555 },
    map: map
  });
}

//modal window================================
function popUp() {
  const modalBtnOpen = document.querySelectorAll('.pop-up-button'),
    modalWindow = document.querySelectorAll('.pop-up-window');
  function closeModal(index) {
    modalWindow[index].classList.remove('_active');
    setTimeout(() => {
      body.classList.remove('_active');
      body.style.paddingRight = '0px';
    }, 300);

  }

  for (let i = 0; i < modalBtnOpen.length; i++) {
    let modalIndex,
      closeBtn,
      closeArea;

    modalBtnOpen[i].onclick = () => {
      const lockPadding = window.innerWidth - document.querySelector('body').offsetWidth + 'px';
      for (let k = 0; k < modalWindow.length; k++) {
        if (modalWindow[k].getAttribute('data-modal') == modalBtnOpen[i].getAttribute('data-modal')) {
          modalIndex = k;
          closeBtn = modalWindow[modalIndex].querySelector('.pop-up-close');
          closeArea = modalWindow[modalIndex].firstElementChild;
          modalWindow[k].classList.add('_active');
          body.classList.add('_active');
          body.style.paddingRight = lockPadding;
        }
      }
      closeBtn.onclick = () => {
        closeModal(modalIndex);
      }
      window.onclick = function (e) {
        if (e.target == closeArea) {
          closeModal(modalIndex);
        }
      }
    }
  }
}
popUp();


//scroll on/off
let keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; }
  }));
} catch (e) { }

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

//phone-mask
window.addEventListener("DOMContentLoaded", function () {
  function setCursorPosition(pos, elem) {
    elem.focus();
    if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
    else if (elem.createTextRange) {
      var range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd("character", pos);
      range.moveStart("character", pos);
      range.select()
    }
  }

  function mask() {
    var matrix = this.defaultValue,
      i = 0,
      def = matrix.replace(/\D/g, ""),
      val = this.value.replace(/\D/g, "");
    def.length >= val.length && (val = def);
    matrix = matrix.replace(/[_\d]/g, function (a) {
      return val.charAt(i++) || "_"
    });
    this.value = matrix;
    i = matrix.lastIndexOf(val.substr(-1));
    i < matrix.length && matrix != this.defaultValue ? i++ : i = matrix.indexOf("_");
    setCursorPosition(i, this)
  }

  var input = document.querySelector(".phone");
  input.addEventListener("input", mask, false)
});

const body = document.querySelector('body');

//modal add on basket 
const addBasketBtn = document.querySelectorAll('.products-item__basket-add'),
  productName = document.querySelectorAll('.products-item__name'),
  addBasketModal = document.querySelector('.modal-basketadd'),
  productBasketName = document.querySelector('.modal-basketadd__title');
let timerOffBasketModal,
  timerOnBasketModal;


for (let i = 0; i < addBasketBtn.length; i++) {
  addBasketBtn[i].onclick = () => {
    if (addBasketModal.classList.contains('_active') == false) {
      addBasketModal.classList.add('_active');
      productBasketName.textContent = productName[i].textContent;
      timerOffBasketModal = setTimeout(() => {
        addBasketModal.classList.remove('_active');
      }, 2000);
    } else {
      clearTimeout(timerOffBasketModal);
      addBasketModal.classList.remove('_active');
      timerOnBasketModal = setTimeout(() => {
        addBasketModal.classList.add('_active');
        productBasketName.textContent = productName[i].textContent;
      }, 500);
      timerOffBasketModal = setTimeout(() => {
        addBasketModal.classList.remove('_active');
      }, 2500);
    }
  }
}

// sticky menu======================================
const stickyMenu = document.querySelector('.header__top'),
  stickyMenuNext = stickyMenu.nextElementSibling;

window.onscroll = () => {
  if (stickyMenu.getBoundingClientRect().y < 0) {
    if (document.querySelector('body').offsetWidth > 1180) {
      stickyMenu.classList.add('js-fixed');
      stickyMenuNext.style.paddingTop += `${stickyMenu.offsetHeight}px`;
    } else {
      stickyMenu.classList.remove('js-fixed');
    }
  } else if (stickyMenuNext.getBoundingClientRect().y > 0) {
    stickyMenu.classList.remove('js-fixed');
    stickyMenuNext.style.paddingTop = '';
  }
}


//scroll to top
const sttElem = document.querySelector('.js-go-top');
let screanHeight = window.innerHeight;

let sttScroll = function sttScroll() {
  document.addEventListener('scroll', function (e) {
    if (screanHeight <= window.scrollY) {
    } else if (e.target.scrollingElement.scrollTop <= screanHeight) {
      sttElem.style.pointerEvents = 'auto';
    }
  });
};

let sttClick = function sttClick() {
  sttElem.addEventListener('click', function () {
    let docHeight = window.scrollY;
    let progress = 0;
    let position = docHeight;
    let speed = 5;

    sttElem.style.pointerEvents = 'none';

    let sttAnim = function sttAnim() {
      if (position >= 500) {
        progress += 1;
        position -= progress * speed;
        window.scrollTo(0, position);
      }
      if (position < 500) {
        progress += 1;
        position -= speed + (progress / speed);
        window.scrollTo(0, position);
      }

      if (position > 0) {
        requestAnimationFrame(sttAnim);
      }
    };

    requestAnimationFrame(sttAnim);
  });
};

let sttFunc = function sttFunc() {
  sttScroll();
  sttClick();
};

document.addEventListener('DOMContentLoaded', sttFunc);

// mobile button on/off
function openMobileMenu() {

  let mobileMenuBtn = document.querySelector('.header__call-btn-mobile'),
    header = document.querySelector('.header'),
    menuListItem = document.querySelectorAll('.menu__list-item'),
    dropMenuChapterBtn = document.querySelectorAll('.drop-menu__chapter-btn');

  mobileMenuBtn.onclick = () => {
    mobileMenuBtn.classList.toggle('_active');
    header.classList.toggle('_mobile');
    if (!mobileMenuBtn.classList.contains('_active')) {
      for (let i = 0; i < menuListItem.length; i++) {
        menuListItem[i].classList.remove('_active');
        if (menuListItem[i].querySelector('.drop-menu')) {
          let dropMenu = menuListItem[i].querySelector('.drop-menu');
          dropMenu.classList.remove('_active');
        }
      }
      for (let i = 0; i < dropMenuChapterBtn.length; i++) {
        dropMenuChapterBtn[i].classList.remove('_active');
        dropMenuChapterBtn[i].nextElementSibling.classList.remove('_active');
      }
    }
  }

  window.addEventListener("resize", function () {
    if (document.documentElement.clientWidth >= 1181) {
      header.classList.remove('_mobile');
      mobileMenuBtn.classList.remove('_active');
      for (let i = 0; i < menuListItem.length; i++) {
        menuListItem[i].classList.remove('_active');
        let dropMenu = menuListItem[i].querySelector('.drop-menu');
        if (dropMenu != null) {
          dropMenu.classList.remove('_active');
        }

      }
      for (let i = 0; i < dropMenuChapterBtn.length; i++) {
        dropMenuChapterBtn[i].classList.remove('_active');
        dropMenuChapterBtn[i].nextElementSibling.classList.remove('_active');
      }
    }
  })

  for (let i = 0; i < menuListItem.length; i++) {
    menuListItem[i].onclick = () => {
      if (!menuListItem[i].classList.contains('_active')) {
        for (let k = 0; k < dropMenuChapterBtn.length; k++) {
          dropMenuChapterBtn[k].classList.remove('_active');
          dropMenuChapterBtn[k].nextElementSibling.classList.remove('_active');
        }
      }
    }
  }

  //catalog-btn prteventDefault
  let catalogBtn = document.querySelector('.catalog-btn');
  catalogBtn.onclick = (e) => {
    e.preventDefault;
  }

  //menu open onclick first level


  for (let i = 0; i < menuListItem.length; i++) {
    let dropMenu = menuListItem[i].querySelector('.drop-menu'),
      menuListLink = menuListItem[i].querySelector('.menu__list-link');
    if (menuListLink != null) {
      menuListLink.onclick = (e) => {
        if (dropMenu != null) {
          dropMenu.classList.toggle('_active');
          menuListItem[i].classList.toggle('_active');
        }
      }
    }
  }

  //menu open onclick second level

  for (let i = 0; i < dropMenuChapterBtn.length; i++) {
    dropMenuChapterBtn[i].onclick = () => {
      dropMenuChapterBtn[i].classList.toggle('_active');
      dropMenuChapterBtn[i].nextElementSibling.classList.toggle('_active');
    }
  }
}
openMobileMenu();


// global select
document.querySelectorAll('.js-select').forEach(function (select) {
  const dropDownBtn = select.querySelector('.js-select__btn');
  const dropDownList = select.querySelector('.js-select__list');
  const dropDownListItems = dropDownList.querySelectorAll('.js-select__li');
  const dropDownInput = select.querySelector('.js-select__input');

  dropDownBtn.addEventListener('click', function (e) {
    dropDownList.classList.toggle('_visible');
    this.classList.add('_active');
  });

  dropDownListItems.forEach(function (listItem) {
    listItem.addEventListener('click', function (e) {
      e.stopPropagation();
      dropDownBtn.innerText = this.innerText;
      dropDownBtn.focus();
      dropDownInput.value = this.dataset.value;
      dropDownList.classList.remove('_visible');
    });
  });

  document.addEventListener('click', function (e) {
    if (e.target !== dropDownBtn) {
      dropDownBtn.classList.remove('_active');
      dropDownList.classList.remove('_visible');
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab' || e.key === 'Escape') {
      dropDownBtn.classList.remove('_active');
      dropDownList.classList.remove('_visible');
    }
  });
});



//double range


let priceSlider = document.querySelectorAll('.double-slider').forEach(function (priceSlider) {
  let inpMin = priceSlider.querySelector('.double-slider__counter-min');
  let inpMax = priceSlider.querySelector('.double-slider__counter-max');
  let priceSliderMin = +priceSlider.getAttribute('data-min');
  let priceSliderMax = +priceSlider.getAttribute('data-max');
  let priceSliderStartMin = +priceSlider.getAttribute('data-startMin');
  let priceSliderStartMax = +priceSlider.getAttribute('data-startMax');

  noUiSlider.create(priceSlider, {
    start: [priceSliderStartMin, priceSliderStartMax],
    connect: true,
    range: {
      'min': priceSliderMin,
      'max': priceSliderMax
    }
  });

  priceSlider.noUiSlider.on('update', function (values) {
    inpMin.value = parseInt(values[0]);
    inpMax.value = parseInt(values[1]);
  });

  inpMin.addEventListener('change', () => {
    priceSlider.noUiSlider.set([+inpMin.value, +inpMax.value]);
  });

  inpMax.addEventListener('change', () => {
    priceSlider.noUiSlider.set([+inpMin.value, +inpMax.value]);
  });
});

//filter sidebar on products page

document.querySelectorAll('.p-products-block__sidebar').forEach(function (sidebar) {
  let sidebarOpenBtn = document.querySelector('.p-products-catalog__controls-filter');
  let sidebarCloseBtn = document.querySelector('.p-products-block__sidebar-close');
  let sidebarBgMobile = document.querySelector('.sidebar-bg-mobile');

  sidebarOpenBtn.addEventListener('click', () => {
    sidebar.classList.add('_active');
    sidebarBgMobile.classList.add('_active');
  });
  sidebarCloseBtn.addEventListener('click', () => {
    sidebar.classList.remove('_active');
    sidebarBgMobile.classList.remove('_active');
  });
  sidebarBgMobile.addEventListener('click', (e) => {
    if (e.target === sidebarBgMobile) {
      sidebar.classList.remove('_active');
      sidebarBgMobile.classList.remove('_active');
    }
  });
});


//favorits btn on product-page

document.querySelectorAll('.favorites').forEach((ppFavorites) => {
  ppFavorites.addEventListener('click', () => {
    ppFavorites.classList.toggle('_active');
  });
});


//product-page slider 

let productPageSlider = new Swiper('.product-gallery__main', {
  effect: 'fade',
  thumbs: {
    swiper: {
      el: '.product-gallery__choice',
      direction: 'vertical',
      slidesPerView: 3,
      navigation: {
        nextEl: '.product-gallery__naw-next',
        prevEl: '.product-gallery__naw-prev'
      },
    }
  }
});

//product-page slider zoom images
  let galleryPopUp = document.querySelector('.gallery-popup');
  let galleryImg = galleryPopUp.querySelector('.gallery-popup__img');
  document.querySelectorAll('.product-gallery__main-slide').forEach((productSlide) => {
    productSlide.addEventListener('click', () => {
      galleryPopUp.classList.add('_active');
      let imgLink = productSlide.querySelector('.main-slide-img').getAttribute('src');
      galleryImg.setAttribute('src', imgLink);

      galleryPopUp.addEventListener('click', () => {
        galleryPopUp.classList.remove('_active');
      });
    });
  });
