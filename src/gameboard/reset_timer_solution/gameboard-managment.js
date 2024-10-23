import View from "../../utils/view.js"

export default class GameBoardManagmentView extends View {
    constructor(gameboard) {
        super();
        this.gameboard = gameboard;
        this.wrapper = this.createElement("div", "", ["game__info"])
        this.btnSolution = null;
        this.timer = null;
        this.appendResetBtn();
        this.appendTimerBtn();
        this.appendSolutionBtn();
    }


    appendResetBtn() {
        const btnReset = this.createElement("button", "Reset", ["btn"]);
        btnReset.addEventListener("click", () => {
            const actualGameboard = this.gameboard.getRelevantenNonogram()

            Array.from(actualGameboard).forEach(cell => {
                if(cell.classList.contains("fill") || cell.classList.contains("cross")) {
                    cell.classList.remove("fill")
                    cell.classList.remove("cross")
                }
            })
            if(this.btnSolution) {
                this.btnSolution.disabled = false;
            }
        })

        this.wrapper.append(btnReset)
    }

    appendTimerBtn(time = "00-00") {
        this.timer = this.createElement("div", `${time}`, ["timer"])
        const actualGameboard = Array.from(this.gameboard.getRelevantenNonogram())

        this.wrapper.append(this.timer)
    }

    updateTimer() {
       const currentTimer = this.timer.textContent;
       const arrTimer = currentTimer.split("-").map(item => Number(item))


    }

    appendSolutionBtn() {
        this.btnSolution = this.createElement("button", "Solution", "btn");
        this.btnSolution.addEventListener("click", () => {
            const actulyGameMatrix = this.gameboard.getRelevantenMatrixGame().flat()
            const actualGameboard = Array.from(this.gameboard.getRelevantenNonogram())

            actualGameboard.forEach(item => {
                item.classList.remove("fill") 
                item.classList.remove("cross") 
            });

            this.btnSolution.disabled = true;
             actulyGameMatrix.forEach((item, index) => {
                if(item === 1) {
                    actualGameboard[index].classList.add("fill")
                }
             })

        })

        this.wrapper.append(this.btnSolution)
    }


    getElement() {
        return this.wrapper
    }
}