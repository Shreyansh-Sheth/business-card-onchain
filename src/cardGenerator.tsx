import {
  useAddress,
  useContract,
  useMintNFT,
  useNFTDrop,
} from "@thirdweb-dev/react";
import { useState } from "react";

type ContactInfo = {
  name: string;
  info: string;
};
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import { ContractData } from "./contract";
export default function CardGenerator() {
  const [showAddress, setShowAddress] = useState(false);
  const [name, setName] = useState("Shreyansh Sheth");
  const [isDark, setIsDark] = useState(true);
  const [footer, setFooter] = useState("");
  const [showGradient, setShowGradient] = useState(true);
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([
    { name: "", info: "shethshreyansh777@gmail.com" },
  ]);

  return (
    <div className="flex justify-between m-10">
      <div>
        <h2 className="text-4xl font-semibold tracking-tight">
          Start Creating
        </h2>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <label className="text-sm font-semibold">Name</label>
            <input
              className="border-2 border-gray-300 p-2 rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold">Contact Info</label>
            {contactInfo.map((info, index) => (
              <div className="flex gap-5 my-2" key={index}>
                <input
                  className="border-2 border-gray-300 p-2 rounded-lg"
                  value={info.name}
                  onChange={(e) => {
                    const newInfo = [...contactInfo];
                    newInfo[index].name = e.target.value;
                    setContactInfo(newInfo);
                  }}
                />
                <input
                  className="border-2 border-gray-300 p-2 rounded-lg"
                  value={info.info}
                  onChange={(e) => {
                    const newInfo = [...contactInfo];
                    newInfo[index].info = e.target.value;
                    setContactInfo(newInfo);
                  }}
                />
                <button
                  className="border-2 border-gray-300 p-2 rounded-lg"
                  onClick={() => {
                    const newInfo = [...contactInfo];
                    newInfo.splice(index, 1);
                    setContactInfo(newInfo);
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              className="border-2 border-gray-300 p-2 rounded-lg"
              onClick={() => {
                if (contactInfo.length < 5) {
                  setContactInfo([...contactInfo, { name: "", info: "" }]);
                } else {
                  alert("You can only add 5 contact info");
                }
              }}
            >
              Add
            </button>
          </div>
          <div className="flex flex-col  mt-4">
            <label className="text-sm font-semibold">Footer</label>
            <input
              className="border-2 border-gray-300 p-2 rounded-lg"
              value={footer}
              onChange={(e) => setFooter(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div className="flex gap-5 mt-4">
            <label className="text-sm inline font-semibold">Show Address</label>
            <input
              className="border-2 border-gray-300 accent-black text-2xl h-4 w-4  rounded-lg"
              type="checkbox"
              checked={showAddress}
              onChange={(e) => setShowAddress(e.target.checked)}
            />
          </div>
          <div className="flex  gap-5 mt-4">
            <label className="text-sm font-semibold">Dark Mode</label>
            <input
              className="border-2 border-gray-300 accent-black text-2xl h-4 w-4  rounded-lg"
              type="checkbox"
              checked={isDark}
              onChange={(e) => setIsDark(e.target.checked)}
            />
          </div>
          <div className="flex  gap-5 mt-4">
            <label className="text-sm font-semibold">Show Gradient</label>
            <input
              className="border-2 border-gray-300 accent-black text-2xl h-4 w-4  rounded-lg"
              type="checkbox"
              checked={showGradient}
              onChange={(e) => setShowGradient(e.target.checked)}
            />
          </div>
        </div>
      </div>
      <div className="grid place-items-center ">
        <CARD
          footer={footer}
          isDark={isDark}
          name={name}
          showAddress={showAddress}
          showGradient={showGradient}
          contactInfo={contactInfo}
        />
      </div>
    </div>
  );
}

const CARD = ({
  name,
  showAddress,
  isDark,
  footer,
  showGradient,
  contactInfo,
}: {
  name: string;
  showAddress: boolean;
  isDark: boolean;
  footer: string;
  showGradient: boolean;
  contactInfo: ContactInfo[];
}) => {
  const contract = useContract(ContractData.address, "nft-collection");
  const [mintStarted, setMintStarted] = useState(false);

  const address = useAddress();
  return (
    <div>
      <div id="card">
        <div
          className={`w-[548px] h-[324px] relative overflow-clip outline  rounded-xl p-5 ${
            isDark
              ? "bg-black text-white outline-white"
              : "bg-white  text-black"
          } `}
        >
          {/* background glow */}
          {showGradient && (
            <div className="absolute top-10 left-10 h-96 w-96 blur-2xl  rounded-full  bg-gradient-to-r from-[#FFB800] to-[#FF00FF] opacity-20 "></div>
          )}
          <div className="z-20">
            <div>
              {showAddress && (
                <p className="z-20 text-xs font-semibold">{address}</p>
              )}
              <p className="text-5xl font-extrabold z-20">{name}</p>
            </div>
            <div className="flex justify-between mt-10">
              <div className="flex flex-col">
                {contactInfo.map((info, index) => (
                  <div className="flex gap-5" key={index}>
                    {info.name.trim().length > 0 && (
                      <p className="text-sm font-semibold">{info.name}</p>
                    )}
                    <p className="text-sm font-semibold">{info.info}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Footer Center Of Card*/}
            <div className="absolute bottom-3 ">
              <p className="text-xs font-semibold text-center">{footer}</p>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={async () => {
          if (!address) return;
          if (mintStarted) return;
          setMintStarted(true);
          const elem = document.getElementById("card");
          if (!elem) return;

          toSvg(elem).then(async function (dataUrl) {
            const metadata = {
              name: name,
              description: "Business Card of " + name,
              image: dataUrl,
            };
            console.log(contract.contract);
            try {
              //@ts-ignore
              const tokenData = await contract.contract.mintTo(
                address,
                metadata
              );
              alert("NFT Minted");

              //open minted nft in new tab
              window.open(
                `https://testnets.opensea.io/assets/mumbai/${contract.contract?.getAddress()}/${
                  tokenData.id
                }`
              );
            } catch {
              alert("Something went wrong please try again.");
            }
            setMintStarted(false);
          });
        }}
        className="w-full p-4 bg-black rounded-lg text-white mt-5 font-semibold"
      >
        {mintStarted ? "Loading..." : "Mint NFT"}
      </button>
    </div>
  );
};
