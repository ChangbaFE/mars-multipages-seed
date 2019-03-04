
import Tabs from './common/tabs';
import TabPane from './common/tabpanes';


export default {
  install(Vue) {
    Vue.component(Tabs.name, Tabs);
    Vue.component(TabPane.name, TabPane);
  }
};
