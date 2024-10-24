import puzzles from "../../data/puzzles.js";
import View from "../../utils/view.js";
import Observable from "../../utils/observable.js";

const levels = {
    easy: "easy",
    medium: "medium",
    hard: "hard"
}

export default class GameLevelView extends View {
    constructor(parentElement) {
        super();
        this.parentElement = parentElement;
        this.wrapper = this.createElement('div', "", ["game__level-container"]);

        this.actions = [];

        this.createBtnLevel("easy");
    }


    createBtnLevel(selectedTag) {
        this.wrapper.innerHTML = "";

        for(let level in levels ) {
            const levelElement = this.createElement("span", `${levels[level]}`, `${levels[level] === selectedTag ? "btn__level tag-selected" : "btn__level"}`);
            levelElement.addEventListener("click", (e) => this.handleTagSelected(e, level, selectedTag))
            this.wrapper.append(levelElement)
        }


    }

    handleTagSelected(target, selectedLevel) {
        const currentTarget =  target.currentTarget;
        const arr = Array.from(this.wrapper.children)

        arr.forEach((element) => {
            if(element.classList.contains("tag-selected")) {
                element.classList.remove("tag-selected")
            }
        })

        currentTarget.classList.add("tag-selected");
        this.notifyAll(selectedLevel);
    }


    getElement() {
        return this.wrapper;
    }

    notifyAll(selectedTag, name = "Maske") {
        return this.actions.forEach(subs => subs.updateMode(selectedTag, name))
    }

    register(observer) {
        this.actions.push(observer)
    }
}