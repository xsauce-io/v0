import React from "react";
import { Drawer, Box, Typography } from "@mui/material";
import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Onboard } from "../components/onBoardingModal";

export const Nav = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <header class="bg-black sticky top-0 z-20 w-[100vw] mb-10">
      <div class="flex items-center h-16 w-full gap-8 px-4 mx-auto mobile:px-6 laptop:px-8">
        <a class="block text-teal-300" href="/">
          <span class="sr-only">Home</span>
          <img src="/logo.svg" class="h-[40px]" />
        </a>

        <div class="flex items-center justify-between flex-1">
          <nav className="mobile:hidden laptop:flex items-center justify-between flex-1" aria-labelledby="header-navigation">
            <h2 class="sr-only" id="header-navigation">
              Header navigation
            </h2>

            <ul class="flex items-center gap-6 text-md font-SG">
              <li>
                <a class="text-[#ACFF00] transition hover:text-white" href="/">
                  Pre-Market
                </a>
              </li>

              <li>
                <a
                  class="text-[#ACFF00] transition hover:text-white"
                  href="/markets"
                >
                  Live Market
                </a>
              </li>

              <li>
                <a
                  class="text-[#ACFF00] transition hover:text-white"
                  href="https://docs.xsauce.io/applications/prediction-markets-v.0-beta"
                >
                  How It Works
                </a>
              </li>

              <li>
                <a
                  class="text-[#ACFF00] transition hover:text-white"
                  href="/https://twitter.com/xsauce_io"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>

          <div class="flex items-center gap-4">
            <div class="sm:gap-4 sm:flex">
              <ConnectButton />
            </div>

            <button
              class="mobile:block p-2.5 text-black bg-white rounded hover:text-[#ACFF00]/75 transition laptop:hidden"
              onClick={() => setIsDrawerOpen(true)}
            >
              <span class="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <Drawer
              PaperProps={{
                sx: {
                  backgroundColor: "black",
                },
              }}
              anchor="right"
              open={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
            >
              <Box
                p={2}
                width="250px"
                textAlign="center"
                role="presentation"
                sx={{ backgroundColor: "black", height: "100" }}
              >
                <Typography component="div">
                  <ul class="space-y-16 pl-1 text-[27px] font-SG">
                    <li>
                      <a
                        class="text-[#ACFF00] transition hover:text-white"
                        href="/"
                      >
                        Pre-Market
                      </a>
                    </li>

                    <li>
                      <a
                        class="text-[#ACFF00] transition hover:text-white"
                        href="/markets"
                      >
                        Live Market
                      </a>
                    </li>

                    <li>
                      <a
                        class="text-[#ACFF00] transition hover:text-white"
                        href="https://docs.xsauce.io/applications/prediction-markets-v.0-beta"
                      >
                        How It Works
                      </a>
                    </li>

                    <li>
                      <a
                        class="text-[#ACFF00] transition hover:text-white"
                        href="/https://twitter.com/xsauce_io"
                      >
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </Typography>
              </Box>
            </Drawer>
          </div>
        </div>
      </div>
    </header>
  );
};
