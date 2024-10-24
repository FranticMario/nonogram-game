import View from "../../utils/view.js"

export default class GameBoardManagmentView extends View {
    constructor(gameboard) {
        super();
        this.min = 0;
        this.sec = 0;
        this.gameboard = gameboard;
        this.wrapper = this.createElement("div", "", ["game__info"])
        this.btnSolution = this.createElement("button", "Solution", "btn");
        this.timer = null;
        this.intervalId = null;
        this.timerAktiveOrNot = false;
        this.appendResetBtn();
        this.appendTimerBtn();
        this.appendSolutionBtn();
    }


    appendResetBtn() {
        const btnReset = this.createElement("button", "Reset", ["btn"]);
        btnReset.addEventListener("click", () => {
            const actualGameboard = this.gameboard.getRelevantenNonogram()
            this.resetTimer()
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

    appendTimerBtn(time = "00 : 00") {
        this.timer = this.createElement("div", `${time}`, ["timer"])
        const actualGameboard = Array.from(this.gameboard.getRelevantenNonogram())

        this.wrapper.append(this.timer)
    }

    startTimer() {
        if(!this.timerAktiveOrNot) {
            this.timerAktiveOrNot = true;
            this.intervalId = setInterval(() => {

                this.updateTimer();

            }, 1000);
        }
    }

    updateTimer() {
        this.sec++;

        if (this.sec === 60) {
            this.min++;
            this.sec = 0;
        }

        const formattedMin = this.min < 10 ? `0${this.min}` : `${this.min}`;
        const formattedSec = this.sec < 10 ? `0${this.sec}` : `${this.sec}`;
        if (this.timer) {
            this.timer.textContent = `${formattedMin} : ${formattedSec}`;
        }

    }

    resetTimer() {
        this.min = 0;
        this.sec = 0;

        if (this.timer) {
            this.timer.textContent = "00 : 00";
        }


        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }

        this.timerAktiveOrNot = false;
    }

    appendSolutionBtn() {


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

    setBtnfalse() {
        this.btnSolution.disabled = false
    }



    getElement() {
        return this.wrapper
    }
}