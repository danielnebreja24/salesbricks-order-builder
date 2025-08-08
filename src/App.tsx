import { OrderProvider } from "context/order.context";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Workflow from "components/workflow";

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="w-full p-10 min-h-screen flex justify-center bg-[#f9f9f9]">
      <QueryClientProvider client={queryClient}>
        <OrderProvider>
          <Workflow />
        </OrderProvider>
      </QueryClientProvider>

      <ToastContainer theme="colored" />
    </div>
  );
}

export default App;
