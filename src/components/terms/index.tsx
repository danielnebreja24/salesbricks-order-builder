import { useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { CONTRACT_PERIODS } from "constants/constants";
import dayjs from "dayjs";
import { addToDate, formatDate } from "utils/date";
import { useOrderContext } from "context/order.context";

const termsSchema = z
  .object({
    startDate: z.date({ message: "Start date is required" }),
    contractPeriod: z
      .string()
      .refine(
        (val): val is (typeof CONTRACT_PERIODS)[number] =>
          (CONTRACT_PERIODS as readonly string[]).includes(val),
        { message: "Contract period is required" }
      ),
    customMonths: z
      .number({ message: "Must be a number" })
      .min(1, "Must be at least 1 month")
      .optional(),
    endDate: z.date({ message: "End date is required" }),
  })
  .superRefine((data, ctx) => {
    if (data.contractPeriod === "Custom" && data.customMonths == null) {
      ctx.addIssue({
        code: "custom",
        path: ["customMonths"],
        message: "Required when period is Custom",
      });
    }
  });

type TermsForm = z.infer<typeof termsSchema>;

export default function Terms() {
  const { setSelectedTerms, goNext } = useOrderContext();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TermsForm>({
    resolver: zodResolver(termsSchema),
    defaultValues: {
      startDate: new Date(),
      contractPeriod: CONTRACT_PERIODS[1],
      customMonths: undefined,
      endDate: new Date(),
    },
  });

  const [startDate, contractPeriod, customMonths] = watch([
    "startDate",
    "contractPeriod",
    "customMonths",
  ]);

  const GRID_SIZE = useMemo(
    () => (contractPeriod === "Custom" ? 3 : 4),
    [contractPeriod]
  );

  const monthsMap = useMemo<Record<string, number>>(() => {
    return CONTRACT_PERIODS.reduce((acc, p) => {
      const n = parseInt(p, 10);
      if (!isNaN(n)) acc[p] = n;
      return acc;
    }, {} as Record<string, number>);
  }, []);

  useEffect(() => {
    if (!startDate) return;

    let newEnd: Date | null = null;

    if (contractPeriod === "Custom") {
      if (customMonths && customMonths > 0) {
        newEnd = addToDate({
          date: startDate,
          numberToAdd: customMonths,
          unit: "months",
        });
      }
    } else {
      const m = monthsMap[contractPeriod];
      if (m != null) {
        newEnd = addToDate({
          date: startDate,
          numberToAdd: m,
          unit: "months",
        });
      }
    }

    if (newEnd) {
      setValue("endDate", newEnd, { shouldValidate: true });
    }
  }, [startDate, contractPeriod, customMonths, monthsMap, setValue]);

  const onSubmit = (data: TermsForm) => {
    setSelectedTerms({
      startDate: formatDate(data.startDate, "MM/DD/YYYY"),
      endDate: formatDate(data.endDate, "MM/DD/YYYY"),
    });
    goNext();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col mt-5"
    >
      <Grid container spacing={2}>
        {/* Start Date */}
        <Grid size={GRID_SIZE}>
          <Controller
            name="startDate"
            control={control}
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Start date"
                  value={value ? dayjs(value) : null}
                  onChange={(val) => onChange(val?.toDate() ?? null)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.startDate,
                      helperText: errors.startDate?.message,
                    },
                  }}
                />
              </LocalizationProvider>
            )}
          />
        </Grid>

        {/* Contract Period */}
        <Grid size={GRID_SIZE}>
          <FormControl fullWidth error={!!errors.contractPeriod}>
            <InputLabel>Contract period</InputLabel>
            <Controller
              name="contractPeriod"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Contract period">
                  {CONTRACT_PERIODS.map((period) => (
                    <MenuItem key={period} value={period}>
                      {period}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.contractPeriod && (
              <p className="text-red-600 text-sm mt-1">
                {errors.contractPeriod.message}
              </p>
            )}
          </FormControl>
        </Grid>

        {/* Custom Months */}
        {contractPeriod === "Custom" && (
          <Grid size={GRID_SIZE}>
            <Controller
              name="customMonths"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  onChange={({ target }) =>
                    field.onChange(target.value ? +target.value : undefined)
                  }
                  label="Number of months"
                  type="number"
                  fullWidth
                  slotProps={{
                    input: {
                      inputProps: {
                        min: 1,
                      },
                    },
                  }}
                  error={!!errors.customMonths}
                  helperText={errors.customMonths?.message}
                />
              )}
            />
          </Grid>
        )}

        {/* End Date */}
        <Grid size={GRID_SIZE}>
          <Controller
            name="endDate"
            control={control}
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="End date"
                  readOnly
                  value={value ? dayjs(value) : null}
                  onChange={(val) => onChange(val?.toDate() ?? null)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.endDate,
                      helperText: errors.endDate?.message,
                    },
                  }}
                />
              </LocalizationProvider>
            )}
          />
        </Grid>
      </Grid>

      <Box className="flex justify-end mt-10">
        <Button variant="contained" color="primary" type="submit">
          Next
        </Button>
      </Box>
    </Box>
  );
}
