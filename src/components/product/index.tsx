import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useOrderContext } from "context/order.context";
import { useOrders } from "hooks/order.hooks";
import { useCallback } from "react";
import Plans from "./plans";

export default function Product({ page }: { page?: string }) {
  const { products } = useOrders();
  const { selectedProduct, selectedPlan, setSelectedProduct, goNext } =
    useOrderContext();

  const handleChange = useCallback(
    (e: SelectChangeEvent) => {
      setSelectedProduct((prev) => {
        const productId = e.target.value;
        return products.find((product) => product.id === productId) ?? prev;
      });
    },
    [products, setSelectedProduct]
  );

  return (
    <Box className="w-full flex flex-col mt-5">
      <FormControl fullWidth>
        <InputLabel>Product line</InputLabel>
        <Select
          onChange={handleChange}
          value={selectedProduct?.id ?? ""}
          label="Product line"
        >
          {products.map(({ id, name }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Plans />

      {!page && (
        <div className="flex justify-end mt-10">
          <Button
            disabled={!selectedPlan || !selectedProduct}
            variant="contained"
            color="primary"
            onClick={goNext}
          >
            Next
          </Button>
        </div>
      )}
    </Box>
  );
}
