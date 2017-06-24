import appActions from './appActions'
import memotestActions from './memotestActions'
import searchPanelGoogleActions from './searchPanelGoogleActions'
import searchPanelLocalActions from './searchPanelLocalActions'
import triviaActions from './triviaActions'
import reportsActions from './reportsActions'


const actions = {
  ...appActions,
  ...memotestActions,
  ...searchPanelGoogleActions,
  ...searchPanelLocalActions,
  ...triviaActions,
  ...reportsActions,
}

export default actions