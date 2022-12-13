import { useState } from "react";
import { useAddress, ConnectWallet } from "@thirdweb-dev/react";
import CardGenerator from "./cardGenerator";

function App() {
  const address = useAddress();

  return (
    <div className="App">
      <div className="flex mx-10 justify-between">
        <h1 className="text-center text-4xl font-semibold mt-10 tracking-tight">
          Business Card On Chain
        </h1>
        <div className="grid place-items-center">
          <div className="my-auto mt-10">{address && <ConnectWallet />}</div>
        </div>
      </div>
      {!address ? (
        <div className="grid place-items-center h-screen">
          <ConnectWallet />
        </div>
      ) : (
        <CardGenerator />
      )}
    </div>
  );
}

export default App;
