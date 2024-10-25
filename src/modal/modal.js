import View from "../utils/view.js";

export default class Modal extends View {
    constructor(gameName, time) {
        super();
        this.gameName = gameName;
        this.time = time;
        this.node = [];
        this.localStorageRecords = []
        this.wrapper = this.createElement("div", "", ["game__modal"])
        this.renderContentModal()
        this.saveRecords();
    }


    renderContentModal() {
        this.node = []; 
        const content = this.createElement("div", "", ["content"]);
        const title = this.createElement("h4", "Game Win", ["modal__title"]);
        const p = this.createElement("p", `You need ${this.time} for game ${this.gameName}`, ["modal__subtitle"]);
        const btnPlayAgain = this.createElement("button", "PLAY AGAIN", ["btn"]);

        btnPlayAgain.addEventListener("click", () => {
            console.log("helo");
            this.node.forEach(item => item.remove());
        });

        content.append(title, p, btnPlayAgain);
        this.wrapper.append(content);
        this.node.push(this.wrapper);
    }

    saveRecords() {
        // Создаем объект записи для текущей игры
        const newRecord = {
            name: this.gameName,
            time: this.time
        };

        // Получаем текущие записи из LocalStorage (если они есть) и добавляем новую запись
        const existingRecords = JSON.parse(localStorage.getItem("Records")) || [];
        existingRecords.push(newRecord);

        // Сохраняем обновленный массив записей обратно в LocalStorage
        localStorage.setItem("Records", JSON.stringify(existingRecords));

    }



    getElement() {
        return this.wrapper
    }
}