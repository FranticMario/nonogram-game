import puzzles from "../../data/puzzles.js"
import GameBoardView from "../../gameboard/gameboard.js";
import View from "../../utils/view.js"
import GameBoardManagmentView from "../../gameboard/reset_timer_solution/gameboard-managment.js";

export default class GameLevelMode extends View {
    constructor() {
        super()
        this.wrapper = this.createElement("div", "", "game__level-mode");
        this.gameName = "Maske";
        this.actions = [];
        this.updateMode("easy", this.gameName);
    }

    updateMode(level, gameName = this.gameName ) {
        this.wrapper.innerHTML = "";

       puzzles.forEach(item => {
        if(item.level === level) {
            const createGame = this.createElement("div", item.name, [`level`])
            if(item.name === gameName ) {
                createGame.classList.add("tag-selected")
            }
            createGame.addEventListener("click", (e) => this.handleTagSelected(e, level))
            this.wrapper.append(createGame)
        }
       })

      
    }

    handleTagSelected(event, level) {
        const eventTarget = event.currentTarget
        const currentContainer = Array.from(this.wrapper.children)
        
        this.gameName = eventTarget.textContent;
        currentContainer.forEach(item => item.classList.contains("tag-selected") ? item.classList.remove("tag-selected") : null)
        eventTarget.classList.add("tag-selected");

        this.notifyAll(this.gameName, level)

    }

    getElement() {
        return this.wrapper
    }

    notifyAll(selectedGame, className) {

        return this.actions.forEach(subs => {
         
            if(subs instanceof GameBoardView) {
                subs.updateNonogram(selectedGame);
                subs.setClassLevelGame(className);
            } else if (subs instanceof GameBoardManagmentView) {
                subs.setBtnfalse()
                subs.resetTimer()
            }

        } )
    }

    register(observer) {
        this.actions.push(observer)
    }
}