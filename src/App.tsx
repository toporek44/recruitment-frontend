import { Provider } from 'react-redux';
import { Dashboard } from './components';
import './styles/main.scss';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
}

export default App;
