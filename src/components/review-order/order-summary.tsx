import {
  Card,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography,
  TypographyVariant,
} from "@mui/material";
import { useOrderContext } from "context/order.context";
import { useMemo } from "react";
import { formatCurrency } from "utils/formatter";
import { getTotalPrice, safeAddPrice } from "utils/math";

export default function OrderSummary() {
  return (
    <Card className="w-full p-2">
      <List component="nav">
        {/* CUSTOMER INFO */}
        <CustomerInfo />
        <Divider />

        {/* ORDER DETAILS */}
        <OrderDetails />
        <Divider />

        {/* DEAL SETUP */}
        <ContractDetails />
        <Divider />

        {/* TOTAL AMOUNT */}
        <TotalAmountDetails />
      </List>
    </Card>
  );
}

const CustomerInfo = () => {
  const { customerDetails } = useOrderContext();
  return (
    <>
      <ListSubheader disableSticky>
        <Detail detail="Deal Parties" />
      </ListSubheader>
      <ListItem
        secondaryAction={<Detail detail={customerDetails?.customer ?? ""} />}
      >
        <ListItemText primary="Customer" />
      </ListItem>
    </>
  );
};

const OrderDetails = () => {
  const { selectedProduct, selectedPlan, selectedAddOns } = useOrderContext();
  return (
    <>
      <ListSubheader className="mt-4" disableSticky>
        <Detail detail="Order" />
      </ListSubheader>
      <ListItem
        secondaryAction={<Detail detail={selectedProduct?.name ?? ""} />}
      >
        <ListItemText primary="Product" />
      </ListItem>
      <ListItem secondaryAction={<Detail detail={selectedPlan?.name ?? ""} />}>
        <ListItemText primary="Plan" />
      </ListItem>

      {selectedAddOns?.length
        ? selectedAddOns.map((addOn) => (
            <ListItem
              key={addOn.id}
              secondaryAction={
                <Detail
                  detail={`${formatCurrency(
                    getTotalPrice({
                      price: addOn.unitPrice,
                      qty: addOn.quantity ?? 1,
                    })
                  )}`}
                />
              }
            >
              <ListItemText primary={addOn.name} />
            </ListItem>
          ))
        : null}
    </>
  );
};

const ContractDetails = () => {
  const { selectedTerms } = useOrderContext();
  const { startDate = "", endDate = "" } = selectedTerms || {};

  return (
    <>
      <ListSubheader className="mt-4" disableSticky>
        <Detail detail="Deal Setup" />
      </ListSubheader>
      <ListItem
        secondaryAction={<Detail detail={`${startDate} - ${endDate}`} />}
      >
        <ListItemText primary="Contract Term" />
      </ListItem>
    </>
  );
};

const TotalAmountDetails = () => {
  const { selectedPlan, selectedAddOns } = useOrderContext();

  const totalAddOnsPrice = useMemo(
    () =>
      selectedAddOns.reduce((total, addOn) => {
        return (
          total +
          getTotalPrice({
            price: addOn.unitPrice,
            qty: addOn.quantity ?? 1,
          })
        );
      }, 0),
    [selectedAddOns]
  );

  const grandTotalPrice = useMemo(() => {
    return safeAddPrice(totalAddOnsPrice, selectedPlan?.basePrice);
  }, [totalAddOnsPrice, selectedPlan?.basePrice]);

  return (
    <ListItem
      className="mt-3"
      secondaryAction={
        <Detail detail={formatCurrency(grandTotalPrice)} variant="h5" />
      }
    >
      <ListItemText
        primary={
          <Typography variant="h6" fontWeight="bold">
            Total Amount
          </Typography>
        }
      />
    </ListItem>
  );
};

const Detail = ({
  detail,
  variant,
}: {
  detail: string;
  variant?: TypographyVariant;
}) => {
  return (
    <Typography variant={variant || "body1"} fontWeight="bold">
      {detail}
    </Typography>
  );
};
