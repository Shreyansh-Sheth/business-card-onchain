import { useState } from "react";
import { useAddress, ConnectWallet } from "@thirdweb-dev/react";
import CardGenerator from "./cardGenerator";
import AllNfts from "./allNft";

function App() {
  const address = useAddress();
  const [generator, setGenerator] = useState(false);
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
      <div>
        {address && (
          <div className="flex justify-center">
            <button
              className={`${
                generator ? "underline" : ""
              } font-bold py-2 px-4 rounded`}
              onClick={() => setGenerator(true)}
            >
              Create Card
            </button>
            <button
              className={`${
                !generator ? "underline" : ""
              } font-bold py-2 px-4 rounded`}
              onClick={() => setGenerator(false)}
            >
              Your Nft Cards
            </button>
          </div>
        )}
      </div>
      {!address ? (
        <div className="grid place-items-center h-screen">
          <ConnectWallet />
        </div>
      ) : (
        <div>{generator ? <CardGenerator /> : <AllNfts />}</div>
      )}
    </div>
  );
}

export default App;
