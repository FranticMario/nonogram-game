import GameBoardView from "../gameboard/gameboard.js";
import GameBoardManagmentView from "../gameboard/reset_timer_solution/gameboard-managment.js";
import GameButtonsView from "../sidebard/game-buttons-container/game-buttons-container.js";
import GameLevelView from "../sidebard/game-level-container/game-level.js";
import GameLevelMode from "../sidebard/game-level-mode-container/game-level-mode.js";
import View from "../utils/view.js";

export default class AppView extends View {
    constructor() {
        super();
        this.sidebarContainer = this.createSidebarContainer();
        this.gameBoardContainer = this.createGameBoardContainer();

        this.gameLevelContainer = new GameLevelView();
        this.gameLevelMode = new GameLevelMode();
        this.gameButtonsContainer = new GameButtonsView();

        this.nonogramBoard = new GameBoardView(this.gameBoardContainer);
        this.nonogramGameManagmentContainer = new GameBoardManagmentView(this.nonogramBoard);

        this.gameLevelContainer.register(this.gameLevelMode);
        this.gameLevelMode.register(this.nonogramBoard);
        this.nonogramBoard.register(this.nonogramGameManagmentContainer);



        this.sidebarContainer.append(this.gameLevelContainer.getElement(), this.gameLevelMode.getElement(), this.gameButtonsContainer.getElement())
        this.gameBoardContainer.append(this.nonogramBoard.getElement(), this.nonogramGameManagmentContainer.getElement())
    }


    createSidebarContainer() {
        const sidebarContainer = this.createElement("div", "", "sidebar")
        document.body.append(sidebarContainer)

        return sidebarContainer;
    }

    createGameBoardContainer() {
        const gameBoardContainer = this.createElement("div", "", "gameboard")
        document.body.append(gameBoardContainer)

        return gameBoardContainer;
    }


    


}