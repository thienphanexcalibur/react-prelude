import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  ChakraProvider,
  Heading,
  Image,
} from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import {
  setTourStep,
  startTour,
  stopTour,
  currentStepIndex,
  steps,
  TourController,
  TourStep,
} from "react-prelude";

const TourContent = () => {
  const isDone = currentStepIndex.value === steps.value.length - 1;
  const prev = () => {
    setTourStep(currentStepIndex.value - 1);
  };
  const next = () => {
    if (isDone) {
      stopTour();
      return;
    }
    setTourStep(currentStepIndex.value + 1);
  };
  return (
    <Card>
      <CardHeader>This is tour {currentStepIndex.value + 1}</CardHeader>
      <CardBody>You can click next and prev to cycle</CardBody>
      <CardFooter>
        <ButtonGroup variant="text">
          {currentStepIndex.value !== 0 && <Button onClick={prev}>Prev</Button>}
          <Button onClick={next}>{isDone ? "Done" : "Next"}</Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

function App() {
  return (
    <Center width="100vw" height="100vh" flexDir="column">
      <TourStep order={1} tourContent={<TourContent />}>
        <Box className="tour1">First Tour</Box>
      </TourStep>

      <TourStep order={2} tourContent={<TourContent />}>
        <Box className="tour2">
          Second Tour
          <Image
            src="https://images.ctfassets.net/q5ulk4bp65r7/3GXsKOhU34b8g8FYMf2Y6x/991f9abe5d7fc74b662095a6ac20c17e/Learn_Illustration_What_is_a_Crypto_Wallet.jpg"
            width="300px"
          />
        </Box>
      </TourStep>
      <Heading textAlign="center">
        <TourController />
        <Button onClick={startTour}>Start tour</Button>
      </Heading>
    </Center>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>
);
