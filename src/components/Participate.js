/* global BigInt */
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useActiveAccount, TransactionButton } from "thirdweb/react";
import { openEditionContract } from "../utils/constants.js";
import { claimTo } from "thirdweb/extensions/erc721";
import { XIcon, TelegramIcon, TickIcon } from "../assets/svg/symbols.js";
import NFTMintingPopup from "./Alert.js";
import MintingProgressPopup from "./MintingProgressPopup.js";

const SocialButton = ({ onClick, isFollowed, platform }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-between w-full px-3 sm:px-4 py-2 sm:py-3 mt-3 text-white rounded-lg bg-[#252942] hover:bg-opacity-80 transition-all duration-300"
  >
    <div className="flex items-center">
      <span className="mr-2 sm:mr-3">
        {platform === "X" ? (
          <XIcon width={32} height={32} />
        ) : (
          <TelegramIcon width={32} height={32} />
        )}
      </span>
      <span className="text-sm sm:text-base">{`Join Donatuz on ${platform}`}</span>
    </div>
    {isFollowed ? (
      <TickIcon width={24} height={24} />
    ) : (
      <span className="bg-[#4E5EE4] px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm">
        Follow
      </span>
    )}
  </button>
);

function Participate() {
  const navigate = useNavigate();
  const account = useActiveAccount();
  const [isFollowingX, setIsFollowingX] = useState(false);
  const [isFollowingTelegram, setIsFollowingTelegram] = useState(false);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [quantity] = useState(1);
  const [isMinting, setIsMinting] = useState(false);
  const [showMintingPopup, setShowMintingPopup] = useState(false);
  const [mintingComplete, setMintingComplete] = useState(false);

  const [popupState, setPopupState] = useState({
    isVisible: false,
    message: "",
    details: "",
    type: "success",
  });
  const contract = openEditionContract;

  useEffect(() => {
    if (!account) {
      setRedirectToHome(true);
    }
  }, [account]);

  useEffect(() => {
    console.log("isMinting state changed:", isMinting);
  }, [isMinting]);

  useEffect(() => {
    console.log("showMintingPopup state changed:", showMintingPopup);
  }, [showMintingPopup]);

  const handleFollowX = useCallback(() => {
    window.open("https://x.com/Donatuz_", "_blank");
    setIsFollowingX(true);
  }, []);

  const handleFollowTelegram = useCallback(() => {
    window.open("https://t.me/donatuzz", "_blank");
    setIsFollowingTelegram(true);
  }, []);

  const handleStartMinting = useCallback(() => {
    console.log("Starting minting process");
    setIsMinting(true);
    setShowMintingPopup(true);
  }, []);

  const handleMintingComplete = useCallback(
    (result) => {
      console.log("Minting process complete");
      setMintingComplete(true);
      setIsMinting(false);
      setPopupState({
        isVisible: true,
        message: "NFT Claimed Successfully!",
        details: `Transaction Hash: ${result.transactionHash.slice(0, 10)}...`,
        type: "success",
      });
      console.log("Transaction confirmed:", result);
    },
    [setPopupState]
  );

  const handleCountdownComplete = useCallback(() => {
    console.log("Countdown complete");
    setShowMintingPopup(false);
  }, []);

  useEffect(() => {
    if (mintingComplete && !showMintingPopup) {
      console.log("Navigating to final page");
      navigate("/final");
    }
  }, [mintingComplete, showMintingPopup, navigate]);

  if (redirectToHome) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen pt-20 sm:pt-28 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl px-4 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center text-white">
          Unlock Your Donatuz Whale NFT
        </h1>

        <p className="text-center mb-6 flex flex-wrap items-center justify-center text-white text-sm sm:text-base">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          <span className="mr-2">Active</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 inline-block mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
          <span>Aug 23th 2024 ~ Sep 25th 2024</span>
        </p>

        <p className="text-base sm:text-lg mb-8 sm:mb-10 text-center max-w-2xl mx-auto text-white">
          You're just two steps away from minting your exclusive Donatuz Whale
          NFT!
        </p>

        <div className="max-w-md mx-auto space-y-6">
          <div className="space-y-4">
            <SocialButton
              onClick={handleFollowX}
              isFollowed={isFollowingX}
              platform="X"
            />
            <SocialButton
              onClick={handleFollowTelegram}
              isFollowed={isFollowingTelegram}
              platform="Telegram"
            />
          </div>

          <div className="mt-8 sm:mt-10 bg-[#252942] p-6 sm:p-8 rounded-lg">
            <h3 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-white">
              Mint Your Donatuz NFT
            </h3>
            <div className="flex justify-center">
              <TransactionButton
                transaction={() =>
                  claimTo({
                    contract: contract,
                    to: account?.address || "",
                    quantity: BigInt(quantity),
                  })
                }
                onSubmit={() => {
                  console.log("Transaction submitted");
                }}
                onError={(error) => {
                  setIsMinting(false);
                  setShowMintingPopup(false);
                  setPopupState({
                    isVisible: true,
                    message: "Minting Failed",
                    details: "You have already minted the NFT!",
                    type: "error",
                  });
                }}
                onTransactionConfirmed={handleMintingComplete}
                disabled={!isFollowingX || !isFollowingTelegram || isMinting}
                className={`px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold !text-black ${
                  isFollowingX && isFollowingTelegram && !isMinting
                    ? "!bg-[#ddad27] hover:!bg-opacity-80"
                    : "!bg-[#ddad27] hover:!bg-opacity-80 cursor-not-allowed"
                }`}
                onClick={() => {
                  if (!isMinting) {
                    handleStartMinting();
                  }
                }}
              >
                {isFollowingX && isFollowingTelegram
                  ? isMinting
                    ? "Minting..."
                    : "Claim NFT"
                  : "Start Minting"}
              </TransactionButton>
            </div>
          </div>
        </div>
      </div>

      <NFTMintingPopup
        message={popupState.message}
        details={popupState.details}
        type={popupState.type}
        isVisible={popupState.isVisible}
        onClose={() => setPopupState((prev) => ({ ...prev, isVisible: false }))}
      />
      {showMintingPopup && (
        <MintingProgressPopup
          isVisible={showMintingPopup}
          onCountdownComplete={handleCountdownComplete}
        />
      )}
    </div>
  );
}
export default Participate;
