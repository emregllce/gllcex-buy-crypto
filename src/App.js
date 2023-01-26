import { RecoilRoot } from "recoil";
import { QueryClientProvider, QueryClient } from "react-query";
import Appbar1 from "./Appbar1";
import Appbar2 from "./Appbar2";
import Body from "./Body";

const queryClient = new QueryClient();

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <div>
          <Appbar1 />
          <Appbar2 />
          <Body />
        </div>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
