import { keyColor } from "@/colors";
import { Key } from "@/components/Key";

function App() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", fontFamily: "Inter" }}
    >
      <Key label="A" />
      <Key
        uSize={2.25}
        label={{ top: "B", bottom: "C" }}
        color={keyColor.paleRose}
      />
    </div>
  );
}

export default App;
