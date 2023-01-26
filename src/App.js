import "./App.css";
import { QueryClientProvider, QueryClient } from "react-query";
import Appbar1 from "./Appbar1";
import Appbar2 from "./Appbar2";
import Body from "./Body";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        < Appbar1 />
        < Appbar2 />
        < Body />
      </div>
    </QueryClientProvider>
  );
}

export default App;
