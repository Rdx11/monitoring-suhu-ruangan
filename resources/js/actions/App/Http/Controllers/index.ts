import Api from './Api'
import DashboardController from './DashboardController'
import ChartController from './ChartController'
import RecapController from './RecapController'

const Controllers = {
    Api: Object.assign(Api, Api),
    DashboardController: Object.assign(DashboardController, DashboardController),
    ChartController: Object.assign(ChartController, ChartController),
    RecapController: Object.assign(RecapController, RecapController),
}

export default Controllers