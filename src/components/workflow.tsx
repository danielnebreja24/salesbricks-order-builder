import { Card, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useOrderContext } from "context/order.context";
import CustomerInfo from "./customer";
import { STAGES } from "constants/constants";
import Product from "./product";
import Terms from "./terms";
import ReviewOrder from "./review-order";

interface ICurrentStageProps {
  currentStage: number;
}

const STAGE_COMPONENTS = [
  <CustomerInfo />,
  <Product />,
  <Terms />,
  <ReviewOrder />,
];

export default function Workflow() {
  const { currentStage } = useOrderContext();

  return (
    <Card className="w-full p-10 mt-10">
      <Stepper activeStep={currentStage}>
        {STAGES.map((label) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <Typography variant="h5" fontWeight="semibold" className="pt-5">
        {STAGES[currentStage]}
      </Typography>

      <CurrentStageComponent currentStage={currentStage} />
    </Card>
  );
}

export const CurrentStageComponent = ({ currentStage }: ICurrentStageProps) => {
  return STAGE_COMPONENTS[currentStage] ?? null;
};
