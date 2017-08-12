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
         .slideDown(400)
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

}(jQuery)); //즉시 실행 모드