import { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Autocomplete,
  Button,
  Card,
  Checkbox,
  createFilterOptions,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { US_STATES } from "constants/constants";
import { useOrders } from "hooks/order.hooks";
import { useOrderContext } from "context/order.context";

const customerInfoSchema = z.object({
  customer: z.string().min(1, "Customer is required"),
  address1: z.string().max(100).optional(),
  address2: z.string().max(100).optional(),
  city: z.string().max(50).optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
});

type CustomerInfoForm = z.infer<typeof customerInfoSchema>;

const filter = createFilterOptions<string>();

export const CustomerInfo = () => {
  const [isPrePopulate, setIsPrePopulate] = useState(false);
  const { customers } = useOrders();
  const { customerDetails, goNext, setCustomerDetails } = useOrderContext();

  const names = useMemo(() => customers.map((c) => c.customer), [customers]);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CustomerInfoForm>({
    resolver: zodResolver(customerInfoSchema),
    defaultValues: customerDetails || {
      customer: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  const customerName = watch("customer");

  useEffect(() => {
    if (!isPrePopulate || !customerName) return;

    const customerObj = customers.find((c) => c.customer === customerName);
    const addressFields: (keyof CustomerInfoForm)[] = [
      "address1",
      "address2",
      "city",
      "state",
      "zipCode",
    ];

    addressFields.forEach((field) => {
      setValue(field, customerObj?.[field] ?? "");
    });
  }, [customerName, isPrePopulate, customers, setValue]);

  const onSubmit = (data: CustomerInfoForm) => {
    setCustomerDetails(data);
    goNext();
  };

  return (
    <Card
      className="flex flex-col gap-6 p-10 pb-[50px]"
      onSubmit={handleSubmit(onSubmit)}
      component="form"
    >
      <Controller
        name="customer"
        control={control}
        render={({ field: { onChange, ...restField }, fieldState }) => (
          <Autocomplete
            {...restField}
            freeSolo
            options={names}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              if (
                params.inputValue !== "" &&
                !options.includes(params.inputValue)
              ) {
                filtered.push(params.inputValue);
              }
              return filtered;
            }}
            onChange={(_, value) => {
              onChange(value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Customer"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                fullWidth
              />
            )}
          />
        )}
        rules={{ required: "Please select or create a customer" }}
      />

      {/* Pre-populate toggle */}
      <FormControlLabel
        control={
          <Checkbox
            onChange={(e) => setIsPrePopulate(e.target.checked)}
            checked={isPrePopulate}
          />
        }
        label="Pre-populate customer information"
      />

      {/* Conditionally address fields */}
      {isPrePopulate && (
        <>
          <Controller
            name="address1"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Address 1"
                error={!!errors.address1}
                helperText={errors.address1?.message}
                fullWidth
              />
            )}
          />
          <Controller
            name="address2"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Address 2"
                error={!!errors.address2}
                helperText={errors.address2?.message}
                fullWidth
              />
            )}
          />
          <Grid container spacing={2}>
            <Grid size={6}>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="City"
                    error={!!errors.city}
                    helperText={errors.city?.message}
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid size={3}>
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>State</InputLabel>
                    <Select {...field} label="State" error={!!errors.state}>
                      {US_STATES.map((s) => (
                        <MenuItem key={s} value={s}>
                          {s}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid size={3}>
              <Controller
                name="zipCode"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Zip code"
                    error={!!errors.zipCode}
                    helperText={errors.zipCode?.message}
                    fullWidth
                  />
                )}
              />
            </Grid>
          </Grid>
        </>
      )}

      <div className="flex justify-end">
        <Button
          disabled={!customerName}
          variant="contained"
          type="submit"
          color="primary"
        >
          Next
        </Button>
      </div>
    </Card>
  );
};
