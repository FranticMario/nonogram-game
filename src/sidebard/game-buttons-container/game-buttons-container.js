import View from "../../utils/view.js"


export default class GameButtonsView extends View {
    constructor() {
        super();
        this.wrapper = this.createElement("div", "", "game__buttons-container")
    }


    createSaveButton() {

    }

    createContinueLastGameButton() {

    }

    createRandomGameButton() {

    }

    createRecordsButton() {

    }


    getElement() {
        return this.wrapper
    }
}