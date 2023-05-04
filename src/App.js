import { QueryClientProvider, QueryClient } from "react-query";
import Appbar1 from "./Appbar1";
import Body from "./Body";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <div>
          <Appbar1 />
          <Body />
        </div>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
