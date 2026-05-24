import { Map } from "./widgets/map/Map";
import { MantineProvider } from "@mantine/core";

export default function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <MantineProvider>
        <Map />
      </MantineProvider>
    </div>
  );
}
