document.addEventListener("DOMContentLoaded",() => {
  const swiper = new Swiper(".swiper",{
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  });

  const swiper_elem = document.querySelector(".swiper");

  swiper_elem.addEventListener("mouseover",() => {
    swiper.autoplay.stop();
  },false);

  swiper_elem.addEventListener("mouseleave",() => {
    swiper.autoplay.start();
  });

  let c_game=1;
  const explanations = document.querySelectorAll(".games");


  swiper.on("slideChange",function(){
    c_game = swiper.realIndex;
    
    explanations.forEach((elem,Index) => {
      elem.classList.toggle("hidden",Index != c_game);
    });
  });

  document.querySelectorAll(".content_wrapper").forEach((e) => {
    var p_elem = e.querySelectorAll("a");
    if(p_elem.length > 1){
      p_elem.forEach((p) => {
        p.innerText = "・" + p.innerText;
      });
    }
  });

});





