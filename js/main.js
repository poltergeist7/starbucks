(function ($) {
   'use strict';

   var _sb = _sb || {}; // '_' 가 붙어있는요소 <-왠만하면 건들지 말라고 선언하는 것
                        // _sb || {}; 혹시 겹쳐지는 상황에 대비하여 or 연산자 + {}; 를 넣어줌

   //Document Ready
   $(function () {
       _init();
       _initEvent();
   });

   // 정의를 내리는 부분
   function _init() {
       _sb.$topCard = $('.top-card');
       _sb.$header = $('header');
       _sb.headerHeight = _sb.$header.height();
       _sb.$search = $('.search');
       _sb.$searchInput = _sb.$search.find('input');
       _sb.$searchImg = _sb.$search.find('img');
       _sb.searchValue = '';
       _sb.ENTER_KEY = 13;                       //상수를 만들 때 대문자로 씀. 상수 : 절대 변하지 않은 변수 값!
       _sb.$promotion = $('.promotion .inner');
       _sb.$togglePromotionBtn = $('.notice-line .toggle-promotion');
       _sb.currentSecIndex = 0;
   }

   // 기능을 실행하는 부분 -> function 실행함수이름 설정 -> 이 안에 넣으면 실행됨
   function _initEvent() {
       toggleTopCard();
       megaMenuHandler();
       searchHandler();
       firstAnimations();
       sliderHandler();
       togglePromotionHandler();
       playTogglePromotionBtn();
       windowScroll();     //완성본 checkLocateScroll 로 되어있음
       checkSectionOffsetTop();
       setReturnToPositon();
       toTopBtnHandler();
       pluginNiceScroll();
   }

   function toggleTopCard() {
       $('.toggle-top-card').on({
           click: function () {
            _sb.$topCard.slideToggle(400);
           },
           mouseenter: function () {
               animateToggleTopCardBtn();
           }
       });
   }

   function animateToggleTopCardBtn() {
       //SET
       TweenMax.killChildTweensOf('.toggle-top-card');
       var cup = '.toggle-top-card .cup';
       var star = '.toggle-top-card .star';

       TweenMax.set(cup, { y: 44});
       TweenMax.set(star, { y: -44, opacity: .6 });

       //PLAY
       TweenMax.to(cup, 1.5, { y: 5, ease: Back.easeOut.config(2) });

       var ani =  new TimelineMax();
       ani.to(star, .8, { x: -12, y: -4, ease: Back.easeOut.config(2) })
           .to(star, .8, { x: -2, y: 0, ease: Back.easeOut.config(2) })
           .to(star, .4, { opacity: 1, repeat: 7, yoyo: true }, '-=1.6'); //repeat, yoyo 많이 사용함. -=1.6 은 .8 +.8 더한 값

   }

   function megaMenuHandler() {
       $('.main-menu > ul > li').on({
           mouseenter: function () {
               openMegaMenu($(this));
           },
           mouseleave: function() {
               closeMegaMenu($(this));
           }
       });
   }

   function openMegaMenu($this) {
       $this.addClass('on');

       var megaHeight = $this.find('.mega-menu').height();

       _sb.$header
           .css({ borderBottomColor: '#2c2a29' })
           .stop()
           .animate({
               height: _sb.headerHeight + megaHeight
           }, 250);
   }
   function closeMegaMenu($this) {
       $this.removeClass('on');

       _sb.$header
           .css({ borderBottomColor: '#c8c8c8' })
           .stop()
           .animate({
               height: _sb.headerHeight
           }, 250);
   }

   function searchHandler() {
       _sb.$searchInput.on({
           focus: function () {
              focusSearch();
           },
           blur: function () {
              blurSearch();
           },
           keydown: function (event) {
               submitSearch($(this), event);
           }
       });

       _sb.$searchImg.on({
           click:function () {
               _sb.$searchInput.focus();
           }
       });
   }

   //검색창에 마우스를 올렸을 때
   function focusSearch() {
       // console.log('dafkljasdlfj')
       _sb.$search
           .stop()
           .animate({ width: 182 }, 600);
       _sb.$searchInput
           .stop()
           .animate({ width: 182 }, 600)
           .attr({ placeholder: '통합검색' });
       _sb.$searchImg.stop(false, true).fadeOut(600);

       if (_sb.searchValue !== '') {
           _sb.$searchInput.val(_sb.searchValue);
       }
   }

   //검색창에서 마우스를 떼었을 때
   function blurSearch() {
       _sb.$search
           .stop()
           .animate({ width: 38 }, 600);
       _sb.searchValue = _sb.$searchInput.val();  //코드 순서가 중요!
       _sb.$searchInput
           .stop()
           .animate({ width: 38 }, 600)
           .attr({ placeholder: '' })
           .val('');                                //저장하고 비어있는 문자로 지워라
       _sb.$searchImg.stop(false, true).fadeIn(600);
   }

   function submitSearch($this, event) {
       if (event.which === 13) {
           event.preventDefault();
           console.log( $this.val() );
       }
       switch (event.which) {
           case _sb-ENTER_KEY:
               event.preventDefault();
               console.log( $this.val() );
           break;
       }
   }

   function firstAnimations() {
       $('.visual .fade-in').each(function (index) {
          TweenMax.to(this, 1, { opacity: 1, delay: (index + 1) * .7 });   // 하나마다 + 1 * .7 로 하나씩 순차적으로 나오도록 함!
       });

       floatingObject('.beans .icon1', 1.5, 2.5, 1, 15);
       floatingObject('.beans .icon2', 1, 2, 1, -15);
       floatingObject('.beans .icon3', 1.5, 2.5, 1.5, 20);
   }

   function sliderHandler () {
       $('.notice-line .slider ul').bxSlider({
           mode: 'vertical',    // 기본 수평('horizontal')으로 되어있으므로 모드로 설정 바꿔줌
           pager: false,       // 페이징 숨김
           controls: false,    // prev, next 버튼
           auto: true,
           pause: 5000          // 5초(5000)에 한번씩
       });

       _sb.promotionSlider = $('.promotion .slider ul').bxSlider({
           pager: true,
           controls: false,            // prev, next 버튼 사용 유무
           autoControls: true,         // 일시정지, 재생 버튼 사용 유무
           pagerSelector: '.promotion .pager',
           autoControlsSelector: '.promotion .auto-controls',
           autoControlsCombine: true,          //   start와 stop 중에 한개만 보여줌
           startText: '',
           stopText: '',
           auto: true,
           pause: 5000,
           minSlides: 1,
           maxSlides: 3,      //최대 슬라이드 개수 3개
           moveSlides: 1,     //몇개씩 움직일 것인가 - 1개씩
           slideWidth: 819,
           slideMargin: 10,
           onSliderLoad: function () {
                $('.promotion .slider li').removeClass('active');
                $('.promotion .slider li.first').addClass('active');
           },
           onSlideAfter: function ($slideElement, oldIndex, newIndex) {
                $('.promotion .slider li').removeClass('active');
                $slideElement.addClass('active');
           }
       });

       $('.promotion .prev').on('click', function () {
           _sb.promotionSlider.goToPrevSlide();
           _sb.promotionSlider.stopAuto();
       });
       $('.promotion .next').on('click', function () {
           _sb.promotionSlider.goToNextSlide();
           _sb.promotionSlider.stopAuto();
       });

       _sb.awardSlider = $('.award .slider ul').bxSlider({
           pager: false,
           controls: false,
           auto: true,
           pause: 3000,
           minSlides: 5,
           maxSlides: 5,
           moveSlides: 1,
           slideWidth: 192,
           slideMargin: 35
       });

       $('.award .prev').on('click', function () {
           _sb.awardSlider.goToPrevSlide();
           _sb.awardSlider.stopAuto();   // 클릭시 자동 슬라이드 기능이 멈춤
           restartAwardSlider();
       });
       $('.award .next').on('click', function () {
           _sb.awardSlider.goToNextSlide();
           _sb.awardSlider.stopAuto();
           restartAwardSlider();
       });
   }

   function togglePromotionHandler() {
       _sb.$togglePromotionBtn.on('click', function () {
          if (_sb.$promotion.data('opened') === 'opened') {
              closePromotion();
          } else {
              openPromotion();
          }
       });
   }

   function openPromotion() {
     _sb.$promotion
         .stop()
         .slideDown(400, function () {
             $('html').getNiceScroll().resize();
         })
         .data({
             opened: 'opened'
         });
     _sb.promotionSlider.reloadSlider();
     pauseTogglePromotionBtn();              // 프로모션 내용물이 보이면 멈추도록
   }

    function closePromotion() {
        _sb.$promotion
            .stop()
            .slideUp(400, function() {
                _sb.promotionSlider.destroySlider();
            })                              // 콜백함수 사용 slideUp 이 실행된 후 사용 -> destroySlider
            .data({
                opened: ''
            });
        playTogglePromotionBtn();             // 프로모션 내용이 닫히면 화살표가 다시 움직이도록 설정
    }

    function playTogglePromotionBtn() {
       TweenMax.set(_sb.$togglePromotionBtn, { scale: .9 });
       TweenMax.to(_sb.$togglePromotionBtn, .5, { rotation: 0 });
       _sb.toggleZoom = TweenMax.to(_sb.$togglePromotionBtn, 1, {
           scale: 1.1,
           repeat: -1,
           yoyo: true
       });
    }

    function pauseTogglePromotionBtn() {
       TweenMax.set(_sb.$togglePromotionBtn, { scale: 1 });
       TweenMax.to(_sb.$togglePromotionBtn, .5, { rotation: -180 });     //  -180deg 약자
       _sb.toggleZoom.pause();        //pause() <- TweenMax 에 들어있음 (GSOCK 참조)
    }

    function restartAwardSlider() {
        setTimeout(function() {
            _sb.awardSlider.startAuto();
        }, 4000); // 4초가 지난 다음에 익명 함수가 실행
    }

    function random(min, max) {
       return parseFloat(Math.random() * (max - min) + min).toFixed(2);
    }

    function floatingObject(selector, minTime, maxTime, delay, size) {
       TweenMax.to(selector, random(minTime, maxTime), {
           delay: random(0, delay),
           y: size,
           repeat: -1,
           yoyo: true,
           ease: Power0.easeNone
       });
    }

    function windowScroll() {
       $(window).on('scroll', function () {
           _sb.scrollLocate = $(this).scrollTop() + ($(this).height() / 2);

           checkCurrentSection();
       });
    }

    function checkCurrentSection() {
       var secLength = _sb.secOffsetTop.length;

       for (var i = 0;  i < secLength; i++) {
           if (_sb.scrollLocate >= _sb.secOffsetTop[i] && _sb.scrollLocate < _sb.secOffsetTop[i + 1]) {
               if (_sb.currentSecIndex === i) {
                   return;   // 함수를 종료
               } else {
                   _sb.currentSecIndex = i;   // 현재 섹션이 몇번인지 갱신해주는 코드
                                      
                   changeSectionHandler();
               }
           }
       }
    }

    function changeSectionHandler() {
        console.log('현재 섹션은 ' + _sb.currentSecIndex);   // 난이도 상

        returnToPosition('.season-product', 1, 4);
        returnToPosition('.reserve', 1, 5);
        returnToPosition('.favorite', 1, 6);
        returnToPosition('.find-store', 1, 8);

        resetReturnToPosition();
        toggleToTop();
    }

    function checkSectionOffsetTop() {
       _sb.secOffsetTop = [];
       $('.section').each(function () {
           _sb.secOffsetTop.push(
               $(this).offset().top
           );
       });
       console.log(_sb.secOffsetTop) ;
   }

   function setReturnToPositon() {
      $('.return-to-position').each(function () {
          var x = 100;

          if ($(this).hasClass('to-right')) {  //왼쪽에서 오른쪽으로
             //음수
              x *= -1;
          } else if ($(this).hasClass('to-left')) {   //오른쪽에서 왼쪽으로
             //양수
              x = Math.abs(x);    // 없어도 되지만 굳이 넣자면
          }

          TweenMax.set(this, { x: x, opacity: 0 });
      });
   }

    function returnToPosition(sectionSelector, duration,  whichSectionIndex) {
       if (_sb.currentSecIndex === whichSectionIndex) {
           $(sectionSelector + ' .return-to-position').each(function (index) {
               TweenMax.to(this, duration, {
                   delay: index * .3,
                   x: 0,
                   opacity: 1
               });
           });
       }
    }

    function resetReturnToPosition () {
       if (_sb.currentSecIndex <= 1) {
           setReturnToPositon();
       }
    }

    function toTopBtnHandler() {
       $('#to-top').on('click', function () {
           toTop();
        });
    }

    function toTop() {
       TweenMax.to(window, .7, { scrollTo: 0 });
    }

    function toggleToTop() {
       if (_sb.currentSecIndex > 3) {
           showToTop();
       } else {
           hideToTop();
       }
    }

    function showToTop() {
       $('#to-top').stop(false, true).fadeIn(400);
    }

    function hideToTop() {
        $('#to-top').stop(false, true).fadeOut(400);
    }

    function pluginNiceScroll() {
       $('html').niceScroll({
           cursorcolor: 'rgba(0,0,0,.7)', //보통 카멜법으로 씀
           cursorwidth: 10,
           cursorborder: 'none',
           cursorborderradius: 0,
           zindex: 9999
       });
    }

}(jQuery)); //즉시 실행 모드