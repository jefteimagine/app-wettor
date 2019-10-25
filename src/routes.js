import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Index from './pages/Index';
import Login from './pages/login/Login';
import Dashboard from './pages/cliente/Dashboard';
import Processos from './pages/cliente/Processos';

const Routes = createAppContainer(
  createSwitchNavigator({
    Index,
    Login,
    Dashboard,
    Processos
  })
);

export default Routes;