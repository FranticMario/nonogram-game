import GameBoardView from '../gameboard/gameboard.js'
import GameBoardManagmentView from '../gameboard/reset_timer_solution/gameboard-managment.js'
import GameButtonsView from '../sidebard/game-buttons-container/game-buttons-container.js'
import GameLevelView from '../sidebard/game-level-container/game-level.js'
import GameLevelMode from '../sidebard/game-level-mode-container/game-level-mode.js'
import GameModeSoundTheme from '../sidebard/game-mode-sound-theme/game-mode-sound-theme.js'
import View from '../utils/view.js'

export default class AppView extends View {
  constructor() {
    super()
    this.sidebarContainer = this.createSidebarContainer()
    this.gameBoardContainer = this.createGameBoardContainer()
    this.burger = this.createBurgerMenu()

    this.gameLevelContainer = new GameLevelView()
    this.gameLevelMode = new GameLevelMode()
    this.nonogramBoard = new GameBoardView(this.gameBoardContainer)
    this.nonogramGameManagmentContainer = new GameBoardManagmentView(this.nonogramBoard)
    this.gameButtonsContainer = new GameButtonsView(
      this.gameLevelContainer,
      this.gameLevelMode,
      this.nonogramGameManagmentContainer,
      this.nonogramBoard,
    )
    this.gameModeSoundTheme = new GameModeSoundTheme(this.nonogramBoard)

    this.gameLevelContainer.register(this.gameLevelMode)

    this.gameLevelMode.register(this.nonogramBoard)
    this.gameLevelMode.register(this.nonogramGameManagmentContainer)
    this.gameLevelMode.register(this.gameButtonsContainer)
    this.gameLevelMode.register(this.gameLevelContainer)

    this.nonogramBoard.register(this.nonogramGameManagmentContainer)
    this.nonogramBoard.register(this.gameButtonsContainer)

    this.nonogramGameManagmentContainer.register(this.gameButtonsContainer)

    this.sidebarContainer.append(
      this.gameLevelContainer.getElement(),
      this.gameLevelMode.getElement(),
      this.gameButtonsContainer.getElement(),
      this.gameModeSoundTheme.getElement(),
    )
    this.gameBoardContainer.append(this.nonogramBoard.getElement(), this.nonogramGameManagmentContainer.getElement()),
      this.burger
  }

  createSidebarContainer() {
    const sidebarContainer = this.createElement('div', '', 'sidebar')
    document.body.append(sidebarContainer)

    return sidebarContainer
  }

  createGameBoardContainer() {
    const gameBoardContainer = this.createElement('div', '', 'gameboard')
    document.body.append(gameBoardContainer)

    return gameBoardContainer
  }

  createBurgerMenu() {
    const burger = this.createElement('div', '', 'header__burger')
    burger.addEventListener('click', e => {
      e.target.classList.toggle('burger-active')
      this.sidebarContainer.classList.toggle('open')
    })

    document.body.append(burger)

    return burger
  }
}
