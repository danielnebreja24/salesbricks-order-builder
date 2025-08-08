import { useState, useCallback } from "react";
import { Edit as EditIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useOrderContext } from "context/order.context";

interface EditPriceProps {
  id: string;
  price: number;
}

export default function EditPrice({ id, price }: EditPriceProps) {
  const [open, setOpen] = useState(false);
  const [customPrice, setCustomPrice] = useState(price);
  const { setSelectedProduct } = useOrderContext();

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const handleSave = useCallback(() => {
    setSelectedProduct((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        plans: prev.plans.map((plan) =>
          plan.id === id ? { ...plan, basePrice: customPrice } : plan
        ),
      };
    });
    handleClose();
  }, [id, customPrice, handleClose, setSelectedProduct]);

  const handlePriceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.valueAsNumber;
      setCustomPrice(Number.isNaN(value) ? price : value);
    },
    [price]
  );

  return (
    <>
      <Button
        size="small"
        variant="contained"
        startIcon={<EditIcon />}
        onClick={handleOpen}
      >
        Edit Price
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Edit Price</DialogTitle>
        <DialogContent className="!pt-3">
          <TextField
            label="Custom price"
            type="number"
            fullWidth
            value={customPrice}
            onChange={handlePriceChange}
            InputProps={{
              startAdornment: (
                <Box component="span" sx={{ pr: 1 }}>
                  $
                </Box>
              ),
              inputProps: { min: 1 },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error" size="small">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" size="small">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
