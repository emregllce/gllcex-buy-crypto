import { RecoilRoot } from "recoil";
import { QueryClientProvider, QueryClient } from "react-query";
import Appbar1 from "./Appbar1";
import Body from "./Body";

const queryClient = new QueryClient();

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <div>
          <Appbar1 />
          <Body />
        </div>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
