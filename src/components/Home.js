import React, { useEffect } from "react";
import { ConnectButton, useActiveAccount, darkTheme } from "thirdweb/react";
import { client, accountAbstraction } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { S3_URLS } from "../utils/s3Constants";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

function Home() {
  const navigate = useNavigate();
  const account = useActiveAccount();

  useEffect(() => {
    if (account) {
      navigate("/participate");
    }
  }, [account, navigate]);

  return (
    <div className="relative min-h-screen flex flex-col bg-[#1c1e3d] text-white overflow-hidden">
      {/* Full-screen background container */}
      <div className="absolute inset-0 w-full h-full">
        {/* Background wave SVG */}
        <img
          src={S3_URLS.BACKGROUND_WAVE}
          alt="Background Wave"
          className="absolute w-full h-full object-cover"
        />
      </div>

      {/* Main content */}
      <main className="relative z-10 flex-grow flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-8">
        <h1 className="text-4xl sm:text-7xl md:text-8xl font-bold mb-4 sm:mb-6 leading-tight">
          Donatuz is Live!
        </h1>
        <p className="text-lg sm:text-2xl md:text-3xl max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto mb-8">
          "Join the mint! Celebrate with us as we launch the creator-first
          content monetization platform."
        </p>
        <ConnectButton
          client={client}
          accountAbstraction={accountAbstraction}
          theme={darkTheme({
            colors: {
              primaryText: "#f8f8f1",
              primaryButtonBg: "#ddad27",
            },
          })}
          connectButton={{
            label: "Participate",
            className:
              "text-base sm:text-lg px-6 py-3 rounded-full bg-[#ddad27] hover:bg-[#c99c23] transition-colors duration-300",
          }}
          connectModal={{
            title: "Connect to Participate",
            size: "wide",
            titleIcon: "",
            showThirdwebBranding: false,
            DialogTitle: <VisuallyHidden>Connect Wallet</VisuallyHidden>,
          }}
        />
      </main>
    </div>
  );
}

export default Home;
