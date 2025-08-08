import {
  IAddOn,
  IContractTerms,
  IOrder,
  IPlan,
  IProduct,
  TCustomerForm,
} from "interfaces/models";
import {
  createContext,
  useState,
  ReactNode,
  useContext,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";

interface OrderContextType {
  order: IOrder;
  currentStage: number;
  customerDetails: TCustomerForm | null;
  selectedProduct: IProduct | null;
  selectedPlan: IPlan | null;
  selectedTerms: IContractTerms | null;
  selectedAddOns: IAddOn[];
  resetFields: () => void;
  setCurrentStage: Dispatch<SetStateAction<number>>;
  setSelectedAddOns: Dispatch<SetStateAction<IAddOn[]>>;
  setSelectedTerms: Dispatch<SetStateAction<IContractTerms | null>>;
  setSelectedPlan: Dispatch<SetStateAction<IPlan | null>>;
  setSelectedProduct: Dispatch<SetStateAction<IProduct | null>>;
  setCustomerDetails: Dispatch<SetStateAction<TCustomerForm | null>>;
  setOrder: Dispatch<SetStateAction<IOrder>>;
  goNext: () => void;
  goBack: () => void;
}

export const OrderContext = createContext<OrderContextType | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [order, setOrder] = useState<IOrder>({ addOns: [] });
  const [customerDetails, setCustomerDetails] = useState<TCustomerForm | null>(
    null
  );
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<IPlan | null>(null);
  const [selectedTerms, setSelectedTerms] = useState<IContractTerms | null>(
    null
  );
  const [selectedAddOns, setSelectedAddOns] = useState<IAddOn[]>([]);
  const [currentStage, setCurrentStage] = useState(0);

  const resetFields = useCallback(() => {
    setOrder({ addOns: [] });
    setCustomerDetails(null);
    setSelectedProduct(null);
    setSelectedPlan(null);
    setSelectedTerms(null);
    setSelectedAddOns([]);
    setCurrentStage(0);
  }, []);

  const goNext = () => setCurrentStage((s) => Math.min(s + 1, 4));
  const goBack = () => setCurrentStage((s) => Math.max(s - 1, 0));

  return (
    <OrderContext.Provider
      value={{
        order,
        currentStage,
        customerDetails,
        selectedProduct,
        selectedPlan,
        selectedTerms,
        selectedAddOns,
        resetFields,
        setCurrentStage,
        setSelectedAddOns,
        setSelectedTerms,
        setSelectedPlan,
        setSelectedProduct,
        setCustomerDetails,
        setOrder,
        goNext,
        goBack,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrderContext() {
  const context = useContext(OrderContext);

  if (!context)
    throw new Error("useOrderContext must be used within an OrderProvider");
  return context;
}
