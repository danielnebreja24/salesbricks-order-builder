import { Card, Radio, Typography } from "@mui/material";
import { useOrderContext } from "context/order.context";
import EditPrice from "./edit-price";
import { useCallback, useEffect, useMemo } from "react";

export default function Plans() {
  const { selectedProduct, selectedPlan, setSelectedPlan } = useOrderContext();
  const plans = useMemo(
    () => selectedProduct?.plans ?? [],
    [selectedProduct?.plans]
  );

  const updatedPlan = useMemo(
    () => plans.find((plan) => plan.id === selectedPlan?.id),
    [plans, selectedPlan?.id]
  );

  const handlePlanChange = useCallback(
    (id: string, name: string, basePrice: number) => {
      setSelectedPlan((prev) =>
        prev?.id === id ? null : { id, name, basePrice }
      );
    },
    [setSelectedPlan]
  );

  useEffect(() => {
    setSelectedPlan(updatedPlan ?? null);
  }, [updatedPlan, setSelectedPlan]);

  const cardWidth = useMemo(
    () => `${(100 / plans.length - 3).toFixed(2)}%`,
    [plans.length]
  );

  return (
    <>
      <Typography variant="h6" mt={5}>
        Select plan
      </Typography>
      <div className="flex justify-between mt-5">
        {plans?.length
          ? plans.map(({ id, name, basePrice }) => (
              <Card
                onClick={() => handlePlanChange(id, name, basePrice)}
                className={`p-5 space-y-2 cursor-pointer hover:bg-gray-100`}
                style={{
                  minWidth: cardWidth,
                  backgroundColor: selectedPlan?.id === id ? "#f6f6f6" : "",
                }}
                key={id}
              >
                <div className="text-lg !font-semibold text-gray-500 flex justify-between items-center">
                  {name}
                  <Radio
                    checked={selectedPlan?.id === id}
                    slotProps={{
                      input: {
                        readOnly: true,
                      },
                    }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Typography variant="h3">${basePrice}</Typography>
                  <Typography color="text.secondary">/ mo</Typography>
                </div>
                <EditPrice id={id} price={basePrice} />
              </Card>
            ))
          : null}
      </div>
    </>
  );
}
