import View from "../../utils/view.js";

export default class GameModeSoundTheme extends View {
    constructor(nonogramBoard) {
        super()
        this.nonogramBoard = nonogramBoard;
        this.wrapper = this.createElement("div", "", ["game__mode-sound_theme"])
        this.renderThemeMode()
        this.renderVolumeMode()
    }

    renderThemeMode() {
        let isDarkMode = false;
        const themeIcon = this.createElement("i", "", ["bx bx-sun"]);
        themeIcon.addEventListener("click", (event) => {
            if (isDarkMode) {
                event.target.classList.replace("bx-moon", "bx-sun");
                document.body.classList.remove("dark");
            } else {
                event.target.classList.replace("bx-sun", "bx-moon");
                document.body.classList.add("dark");
            }
            isDarkMode = !isDarkMode;
        });

        this.wrapper.append(themeIcon)
    }

    renderVolumeMode() {
        let isVolumeMode = false;
        const volume = this.createElement("i", "", ["bx bx-volume-full"])
        volume.addEventListener("click", (event) => {
            if (isVolumeMode) {
                event.target.classList.replace("bx-volume-mute", "bx-volume-full");
                this.nonogramBoard.audioLeftClick.volume = 1
                this.nonogramBoard.audioRightClick.volume = 1
            } else {
                event.target.classList.replace("bx-volume-full", "bx-volume-mute");
                this.nonogramBoard.audioLeftClick.volume = 0
                this.nonogramBoard.audioRightClick.volume = 0
            }
            isVolumeMode = !isVolumeMode;
        })


        this.wrapper.append(volume)
    }


    getElement() {
        return this.wrapper;
    }
}