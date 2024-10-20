import { Text } from "react-native";

import { Button } from "~/components/Button";
import { Container } from "~/components/Container";

export default function Home() {
  return (
    <>
      <Container>
        <Text>Home page</Text>
        <Button>Navigate to home</Button>
      </Container>
    </>
  );
}
