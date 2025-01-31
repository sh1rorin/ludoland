document.addEventListener("DOMContentLoaded",() => {
  const divElem = document.querySelector(":root");
  const game1_int = document.querySelectorAll(".game1_explanation");
  const game2_int = document.querySelectorAll(".game2_explanation");
  const game3_int = document.querySelectorAll(".game3_explanation");
  
  let c_expl = 1;

  divElem.addEventListener("mouseup",show_toggle,false);

  function show_toggle(){
    if (c_expl == 1){
      game1_int.forEach((element) => {
        element.classList.toggle("showing");
      });

      setTimeout(() =>{
        game2_int.forEach((element)=>{
          element.classList.toggle("showing");
        });
        c_expl = 2;
      },600);

      c_expl = 2;
    } else if (c_expl == 2){
      game2_int.forEach((element) => {
        element.classList.toggle("showing");
      });

      setTimeout(() =>{
        game3_int.forEach((element)=>{
          element.classList.toggle("showing");
        });
        c_expl = 3;
      },600);

      c_expl = 3;
    } else if (c_expl == 3){
      game3_int.forEach((element) => {
        element.classList.toggle("showing");
      });

      setTimeout(() =>{
        game1_int.forEach((element)=>{
          element.classList.toggle("showing");
      });
        c_expl = 1;
      },600);
    }
  
    
  }
});





