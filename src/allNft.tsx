import {
  ThirdwebNftMedia,
  useContract,
  useNFT,
  useAddress,
} from "@thirdweb-dev/react";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { ContractData } from "./contract";
import { CgSpinner } from "react-icons/cg";
export default function AllNfts() {
  const { contract } = useContract(ContractData.address, "nft-collection");
  const address = useAddress();
  const [tokenIds, setTokenIds] = useState<BigNumber[] | undefined>(undefined);
  useEffect(() => {
    if (contract) {
      contract.getOwnedTokenIds(address).then((e) => {
        setTokenIds(e);
      });
    }
  }, [contract]);

  if (!tokenIds)
    return (
      <div className="flex flex-col items-center ">
        <CgSpinner className="w-10 h-10 animate-spin" />
      </div>
    );

  return (
    <div className="flex flex-col items-center gap-5">
      {tokenIds.map((tokenId) => {
        return <RenderNft tokenId={tokenId} />;
      })}
    </div>
  );
}

const RenderNft = ({ tokenId }: { tokenId: BigNumber }) => {
  const { contract } = useContract(ContractData.address, "nft-collection");
  const { data: nft, isLoading } = useNFT(contract, tokenId);

  if (isLoading || !nft)
    return (
      <div>
        <CgSpinner className="w-10 h-10 animate-spin" />
      </div>
    );
  console.log(nft.metadata);
  return (
    <div>
      <ThirdwebNftMedia width="548px" height="342px" metadata={nft.metadata} />
      <a
        href={`https://testnets.opensea.io/assets/mumbai/${ContractData.address}/${tokenId}`}
        target="_blank"
        rel="noreferrer"
        className="text-xl font-semibold"
      >
        Opensea
      </a>
    </div>
  );
};
