import { View as MainView, Header as MainHeader } from './components/views/Main';
import { View as ConfigureLayoutView, Header as ConfigureLayoutHeader } from './components/views/ConfigureLayout';

export default [

  {
    path: '/',
    exact: true,
    header: MainHeader,
    main: MainView
  },

  {
    path: '/configure-view/:id',
    exact: true,
    header: ConfigureLayoutHeader,
    main: ConfigureLayoutView
  }

];