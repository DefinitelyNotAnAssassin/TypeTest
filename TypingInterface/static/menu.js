const InitializeMenu = () => { 

    const main = document.querySelector(".main") 
    main.innerHTML = "" 
    const menu = document.createElement("div") 
    menu.classList.add("menu")
    menu.classList.add("text-white") 
  
    menu.innerHTML = ` 
        <div class="menu-item" id="start-game">Start Game</div> 
        <div class="menu-item" id="high-scores">High Scores</div> 
        <div class="menu-item" id="instructions">Instructions</div> 
    `
    main.appendChild(menu)

} 

export { InitializeMenu  } 
