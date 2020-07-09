import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import homeStore from './stores/homeStore';
import foreignStore from './stores/foreignStore';
import provinceStore from './stores/provinceStore';

const stores = {
  homeStore,
  foreignStore,
  provinceStore,
}

homeStore.loadRecentData()
homeStore.loadTodayNotice()
homeStore.loadTodayData()

foreignStore.loadForeignData()
foreignStore.loadForeignCountriesData()
foreignStore.loadEuropeCountriesData();
foreignStore.loadAsiaCountriesData();
foreignStore.loadNorthAmericaCountriesData();
foreignStore.loadAutoWeekContinentMillionData();
foreignStore.loadAutoContinentGlobalDailyListCountryConfirmAdd();
foreignStore.loadCountryRankListData();

window.____APP_STATE____ = stores

ReactDOM.render((
    <Provider {...stores}>
      <App />
    </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
