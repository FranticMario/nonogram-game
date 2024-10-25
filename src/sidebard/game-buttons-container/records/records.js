import View from "../../../utils/view.js";

export default class Records extends View {
    constructor() {
        super();
        this.wrapper = this.createElement("div", "", ["game__modal"]);
        this.node = [];
        this.renderContentRecords()
    }

    renderContentRecords() {

        const content = this.createElement("div", "", ["content"]);

        const existingRecords = JSON.parse(localStorage.getItem("Records"))


        existingRecords.sort((a, b) => this.timeStringToSeconds(a.time) - this.timeStringToSeconds(b.time));

        const uniqueRecords = Array.from(new Map(
            existingRecords.map(item => [item.name + item.time, item])
        ).values());

        this.renderRecordsItem(content, uniqueRecords)
        this.wrapper.append(content)
        this.node.push(this.wrapper)
    }

    renderRecordsItem(contentWrapper, recordsArr) {
        const limit = Math.min(recordsArr.length, 5);

        for (let i = 0; i < limit; i++) {
            const createRecordsTitle = this.createElement(
                "div", 
                `${recordsArr[i].name ? recordsArr[i].name : "null"} for ${recordsArr[i].time ? recordsArr[i].time : "null"}`
            );
            contentWrapper.append(createRecordsTitle);
        }
        this.renderBtnClose(contentWrapper)
    }

    renderBtnClose(contentWrapper) {
        this.node = [];
        const btnClose = this.createElement("button", "Close Records", "btn")
        btnClose.addEventListener("click", () => {
            console.log("helo");
            this.node.forEach(item => item.remove());
        });

        contentWrapper.append(btnClose)
    }

    timeStringToSeconds(timeString) {
        const [minutes, seconds] = timeString.split(" : ").map(Number);
        return minutes * 60 + seconds; 
    }


    getElement() {
        return this.wrapper
    }
}