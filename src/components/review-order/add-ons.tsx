import {
  Box,
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import { useOrderContext } from "context/order.context";
import { useOrders } from "hooks/order.hooks";
import { useCallback, useEffect, useState } from "react";
import { formatCurrency } from "utils/formatter";

interface IAddOnBaseItem {
  id: string;
  name: string;
  unitPrice: number;
  quantity?: number;
}

interface IAddOnItemProps {
  addOn: IAddOnBaseItem;
}

export default function AddOns() {
  const { addOns } = useOrders();
  const { setSelectedAddOns } = useOrderContext();

  useEffect(() => {
    setSelectedAddOns(addOns);
  }, [addOns, setSelectedAddOns]);

  return (
    <Box className="mt-10">
      <h2 className="text-lg font-semibold">Select add-ons</h2>

      {addOns.map((addOn) => (
        <AddOnItem key={addOn.id} addOn={addOn} />
      ))}
    </Box>
  );
}

export const AddOnItem = ({ addOn }: IAddOnItemProps) => {
  const [qty, setQty] = useState<number>(addOn.quantity ?? 1);
  const { id, name, unitPrice } = addOn;
  const { setSelectedAddOns } = useOrderContext();

  const handleCheck = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { checked: isChecked } = event.target;
      setSelectedAddOns((prev) => {
        if (isChecked) {
          return [...prev, addOn];
        } else {
          return prev.filter((item) => item.id !== id);
        }
      });
    },
    [setSelectedAddOns, addOn, id]
  );

  const handleQuantityChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const quantity = parseInt(value);

      setSelectedAddOns((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, quantity: isNaN(quantity) ? undefined : quantity }
            : item
        )
      );
      setQty(quantity);
    },
    [setSelectedAddOns, setQty, id]
  );

  return (
    <Card className="w-full my-4 px-5 py-6">
      <Grid className="divide-x divide-gray-200" container spacing={2}>
        <Grid className="flex justify-between items-center " size={9}>
          <Box className="font-semibold">
            <FormControlLabel
              control={<Checkbox onChange={handleCheck} defaultChecked />}
              label={<h2 className="text-lg font-semibold">{name}</h2>}
            />
          </Box>
          <Box className="flex flex-col items-end">
            <h1 className="text-3xl font-semibold pb-2">
              {formatCurrency(unitPrice)}
            </h1>
            <p className="text-sm text-gray-500">per {name}</p>
          </Box>
        </Grid>
        <Grid className="flex justify-center items-center px-5" size={3}>
          <TextField
            onChange={handleQuantityChange}
            value={qty}
            label="Quantity"
            size="small"
            placeholder="Enter qty"
            type="number"
            slotProps={{
              input: {
                inputProps: {
                  min: 0,
                },
              },
            }}
          />
        </Grid>
      </Grid>
    </Card>
  );
};
