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
   }

   //기능을 실행하는 부분
   function _initEvent() {
       toggleTopCard();
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
       TweenMax.to('.toggle-top-card .cup', 1.5, {
           y: -30,
           repeat: -1,
           yoyo: true
       });
   }


}(jQuery)); //즉시 실행 모드