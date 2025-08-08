import { Box, Button, Grid } from "@mui/material";
import Product from "components/product";
import AddOns from "./add-ons";
import OrderSummary from "./order-summary";
import { useOrderContext } from "context/order.context";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export default function ReviewOrder() {
  const [isLoading, setisLoading] = useState(false);
  const { resetFields } = useOrderContext();

  const handleFinalizeOrder = useCallback(() => {
    setisLoading(true);

    toast.success("Successfully placed order. Thank you!");
    setTimeout(() => {
      setisLoading(false);
      resetFields();
    }, 3000);
  }, [resetFields]);

  return (
    <Box component="form" className="w-full flex flex-col mt-5">
      <Grid container spacing={4}>
        <Grid size={7}>
          <Product page="review" />
          <AddOns />
        </Grid>
        <Grid size={5}>
          <OrderSummary />
        </Grid>
      </Grid>
      <Box className="flex justify-end">
        <Button
          variant="contained"
          color="primary"
          onClick={handleFinalizeOrder}
          loading={isLoading}
        >
          Finalize Order
        </Button>
      </Box>
    </Box>
  );
}
