import puzzles from "../../data/puzzles.js";
import View from "../../utils/view.js"
import Records from "./records/records.js";


export default class GameButtonsView extends View {
    constructor(levelContainer, modeContainer, nonogramManagmentContainer, nonogramGameBoard) {
        super();
        this.levelContainer = levelContainer;
        this.modeContainer = modeContainer;
        this.nonogramManagmentContainer = nonogramManagmentContainer
        this.nonogramGameBoard = nonogramGameBoard;
        this.actuelTimer = 0;
        this.wrapper = this.createElement("div", "", "game__buttons-container");
        this.saveBtn = this.createElement("button", "Save", "btn");
        this.lastGameBtn = this.createElement("button", "Continue Last Game", "btn")
        this.saveBtn.disabled = true
        this.actulyGameboard = null;
        this.previousIndex = null;
        this.wrapper.append(this.saveBtn, this.lastGameBtn)
        this.createContinueLastGameButton();
        this.createRandomGameButton();
        this.createRecordsButton();
    }


    createSaveButton(actulyGameboard, game) {
        this.saveBtn.disabled = false
        const childrenArr = Array.from(actulyGameboard.children).map(item => {
            if (item.classList.contains("fill")) {
                return 1;
            } else if (item.classList.contains("cross")) {
                return 2;
            }
            return 0;
        }
        )
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

            this.levelContainer.nameGame = getLocalItem.name
            this.modeContainer.gameName = getLocalItem.name

            this.levelContainer.createBtnLevel(getLocalItem.level)
            this.levelContainer.notifyAll(getLocalItem.level, getLocalItem.name)
            this.modeContainer.notifyAll(getLocalItem.name, getLocalItem.level)
            this.nonogramManagmentContainer.setLastGameTimer(getLocalItem.timer)
            this.nonogramManagmentContainer.startTimer()
            this.saveBtn.disabled = false;
            const arrGameboard = Array.from(this.nonogramGameBoard.getNonogramCointainer())
            arrGameboard.forEach((cell, index) => {
                if(getLocalItem.matrix[index] === 1) {
                    cell.classList.add("fill")
                } else if(getLocalItem.matrix[index] === 2) {
                    cell.classList.add("cross")
                }
            })
        })
    }



    createRandomGameButton() {
        const randomGame = this.createElement("button", "Random", "btn")

        randomGame.addEventListener("click", () => {

            let newIndex;


            do {
                newIndex = Math.floor(Math.random() * puzzles.length);
            } while (newIndex === this.previousIndex);


            this.previousIndex = newIndex;

            this.levelContainer.nameGame = puzzles[newIndex].name
            this.modeContainer.gameName = puzzles[newIndex].name

            this.levelContainer.createBtnLevel(puzzles[newIndex].level)
            this.levelContainer.notifyAll(puzzles[newIndex].level, puzzles[newIndex].name)
            this.modeContainer.notifyAll(puzzles[newIndex].name, puzzles[newIndex].level)

        })



        this.wrapper.append(randomGame)
    }

    createRecordsButton() {
        const records = this.createElement("button", "Records", "btn")
        records.addEventListener("click", () => {
            const recordsModal = new Records()
            document.body.append(recordsModal.getElement())
        })
        this.wrapper.append(records)
    }


    setActuelTimer(timer) {
        this.actuelTimer = timer;
    }




    getElement() {
        return this.wrapper
    }
}