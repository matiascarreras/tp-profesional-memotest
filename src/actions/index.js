import appActions from './appActions'
import memotestActions from './memotestActions'
import searchPanelGoogleActions from './searchPanelGoogleActions'
import searchPanelLocalActions from './searchPanelLocalActions'
import triviaActions from './triviaActions'


const actions = {
  ...appActions,
  ...memotestActions,
  ...searchPanelGoogleActions,
  ...searchPanelLocalActions,
  ...triviaActions,
}

export default actions