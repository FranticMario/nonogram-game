import View from "../../utils/view.js"


export default class GameButtonsView extends View {
    constructor(levelContainer, modeContainer, nonogramManagmentContainer) {
        super();
        this.levelContainer = levelContainer;
        this.modeContainer = modeContainer;
        this.nonogramManagmentContainer = nonogramManagmentContainer
        this.actuelTimer = 0;
        this.wrapper = this.createElement("div", "", "game__buttons-container");
        this.saveBtn = this.createElement("button", "Save", "btn");
        this.lastGameBtn = this.createElement("button", "Continue Last Game", "btn")
        this.saveBtn.disabled = true
        this.actulyGameboard = null;
        this.wrapper.append(this.saveBtn, this.lastGameBtn)
        this.createContinueLastGameButton();
        this.createRandomGameButton();
        this.createRecordsButton();
    }


    createSaveButton(actulyGameboard, game) {
        this.saveBtn.disabled = false
        const childrenArr = Array.from(actulyGameboard.children).map(item => item.classList.contains("fill") ? 1 : 0)
        this.saveBtn.addEventListener("click", () => {
            console.log(this.actuelTimer)
            const lastGame = {
                name: game.name,
                level: game.level,
                matrix: childrenArr,
                timer: this.actuelTimer,
            }
            localStorage.setItem("last game", JSON.stringify(lastGame));
        })

    }

    createContinueLastGameButton() {
        this.lastGameBtn.addEventListener("click", () => {
            const getLocalItem = JSON.parse(localStorage.getItem("last game"))

            this.levelContainer.createBtnLevel(getLocalItem.level)
            this.levelContainer.notifyAll(getLocalItem.level, getLocalItem.name)
            this.modeContainer.notifyAll(getLocalItem.name, getLocalItem.level)
            this.nonogramManagmentContainer.setLastGameTimer(getLocalItem.timer)
            this.nonogramManagmentContainer.startTimer()
        })
    }



    createRandomGameButton() {
        const randomGame = this.createElement("button", "Random", "btn")

        this.wrapper.append(randomGame)
    }

    createRecordsButton() {
        const records = this.createElement("button", "Records", "btn")

        this.wrapper.append(records)
    }


    setActuelTimer(timer) {
        this.actuelTimer = timer;
    }




    getElement() {
        return this.wrapper
    }
}