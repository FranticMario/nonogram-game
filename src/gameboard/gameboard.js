import View from "../utils/view.js";
import puzzles from "../data/puzzles.js";

export default class GameBoardView extends View {
    constructor(elternElement) {
        super();
        this.wrapper = this.createElement('div', "", ["nonograms easy"]);
        this.relevantNonogram = [];
        this.relevantMatrixGame = [];
        this.actions = [];
        this.audioLeftClick = new Audio("../../assets/audio/click.mp3")
        this.updateNonogram("Maske")
    }


    updateNonogram(gameName) {
     
        this.wrapper.innerHTML = ""
        this.appendNonogramView();
        puzzles.forEach(item => {
            if(item.name === gameName) {
                this.appendNonogramHintTop(item);
                this.appendNonogramHintLeft(item);
                this.appendNonogramCell(item);

                this.relevantMatrixGame = item.matrix;
            }
        })

    }

    setClassLevelGame(newClass) {
        this.wrapper.classList.remove(`${this.wrapper.classList[1]}`)
        this.wrapper.classList.add(newClass)
    }

    appendNonogramView() {
        const nonogramView = this.createElement("div", "", ["nonogram__view"])
        this.wrapper.append(nonogramView);
    }

    appendNonogramHintTop(game) {
        const nonogramHintTop = this.createElement("div", "", ["nonogram__hint-top"])

        for(let col = 0; col < game.size; col++) {
            const hintTopRow = this.createElement("div", "", ["hints__top"]);
            let consecutiveHints = 0;
            for (let row = 0; row < game.size; row++) {
                if (game.matrix[row][col] === 1) {
                    consecutiveHints++;
                } else if (consecutiveHints > 0) {
                    const hint = this.createElement("span", `${consecutiveHints}`, ["hint"]);
                    hintTopRow.append(hint);
                    consecutiveHints = 0;
                }
            }

            if (consecutiveHints > 0) {
                const hint = this.createElement("span", `${consecutiveHints}`, ["hint"]);
                hintTopRow.append(hint);
                consecutiveHints = 0;
            }

            nonogramHintTop.append(hintTopRow)
        }

        this.wrapper.append(nonogramHintTop)

    }


    appendNonogramHintLeft(game) {
        const nonogramHintLeft = this.createElement("div", "", ["nonogram__hint-left"])

        for(let col = 0; col < game.size; col++) {
            const hintLeftRow = this.createElement("div", "", ["hints__left"]);

            let consecutiveHints = 0;
            for (let row = 0; row < game.size; row++) {
                if (game.matrix[row][col] === 1) {
                    consecutiveHints++;
                } else if (consecutiveHints > 0) {
                    const hint = this.createElement("span", `${consecutiveHints}`, ["hint"]);
                    hintLeftRow.append(hint);
                    consecutiveHints = 0;
                }
            }

            if (consecutiveHints > 0) {
                const hint = this.createElement("span", `${consecutiveHints}`, ["hint"]);
                hintLeftRow.append(hint);
                consecutiveHints = 0;
            }

            nonogramHintLeft.append(hintLeftRow)
        }

        this.wrapper.append(nonogramHintLeft)
    }


    appendNonogramCell(game) {
        const nonogramGrid = this.createElement ("div", "", ["nonogram__grid"]);
        nonogramGrid.addEventListener("contextmenu", e => e.preventDefault())
        for(let i = 0; i < game.size * game.size; i++) {
            const cell = this.createElement("div", "", ["cell"]);
            cell.addEventListener("mousedown", (e) => this.toggleColorCell(e, nonogramGrid, game.matrix))
            nonogramGrid.append(cell);
        }
        this.wrapper.append(nonogramGrid);
        this.relevantNonogram = nonogramGrid
    }

    toggleColorCell(event, nonogramContainer, gameMatrix) {
        const currentTarget = event.target

        if(event.button === 0) {
            if(currentTarget.classList.contains("cross")) currentTarget.classList.remove("cross")
            currentTarget.classList.toggle("fill")
        } else if (event.button === 2) {
            if(currentTarget.classList.contains("fill")) currentTarget.classList.remove("fill")
                currentTarget.classList.toggle("cross")
        }
       this.checkToWin(nonogramContainer, gameMatrix);
        this.notifyAll()
    //    this.audioLeftClick.play()
    }

    checkToWin(currentNonogram, currentGame) {
       const newArr =  Array.from(currentNonogram.children).map(item => item.classList.contains("fill") ? 1 : 0)
        const currentGameFlat = currentGame.flat();
        if(JSON.stringify(newArr) === JSON.stringify(currentGameFlat)) {
            console.log("Hastu du gewonen")
        }
    }

    getRelevantenNonogram() {
        return this.relevantNonogram.children;
    }

    getRelevantenMatrixGame() {
        return this.relevantMatrixGame;
    }

    notifyAll() {
       return this.actions.forEach(subs => {

            subs.startTimer();
       
        } )
    }

    register(observer) {
        this.actions.push(observer)
    }

    getElement() {
        return this.wrapper
    }
}