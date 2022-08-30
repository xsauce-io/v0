import React from "react";
import { Drawer, Box, Typography } from "@mui/material";
import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Onboard } from "../components/onBoardingModal";

export const Nav = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);


  return (
    <header class="bg-white sticky top-0 z-20 w-[100vw] border-b-[1px] border-black">
      <div class="flex items-center h-16 w-full gap-8 px-4 mx-auto mobile:px-6 laptop:px-8">
        <a class="block" href="/">
          <span class="sr-only">Home</span>
          <div className="border-r-[1px] border-black h-16 flex flex-row items-center space-x-1">
          <svg
					width="33"
					height="32"
					viewBox="0 0 33 29"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M22.6347 17.7117L31.0665 25.0761C32.8526 26.6404 32.5987 29.0007 30.1236 29.0007H25.4634C24.729 29.0007 24.0218 28.7354 23.505 28.2505L17.0678 22.295C16.7505 22.0022 16.2337 22.0022 15.9164 22.295L9.43388 28.2505C8.91709 28.7262 8.21897 28.9915 7.48459 28.9915H2.75189C0.29488 28.9915 -0.929093 26.2653 0.829802 24.6918L8.6995 17.6385C9.20722 17.1811 9.19815 16.4309 8.68136 15.9918L1.46445 9.8259C-0.366972 8.27984 0.838868 5.48962 3.33215 5.48962H7.61152C8.32777 5.48962 9.01682 5.74578 9.52454 6.20319L15.9073 11.8843L22.6347 17.7117Z"
						fill="#630606"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M21.2002 4.42065C19.9736 5.73654 18.9956 6.78574 18.9956 9L19.6487 8.99942C19.903 11.6696 22.1342 13.759 24.8469 13.759C27.73 13.759 30.0691 11.3988 30.0691 8.48961H29.9799C29.8495 6.47727 28.9228 5.49696 27.7687 4.2761C26.8424 3.29619 25.7695 2.16131 24.8444 0.213421C24.7106 -0.0775251 24.2901 -0.0678269 24.1563 0.223119C23.2474 2.22434 22.1494 3.40235 21.2002 4.42065Z"
						fill="#630606"
					/>
				</svg>
        <h1 className="font-SG text-[25px] pr-5">sauce</h1>
        </div>
        </a>

        <div class="flex items-center justify-between flex-1">
          <nav className="mobile:hidden laptop:flex items-center justify-between flex-1" aria-labelledby="header-navigation">
            <h2 class="sr-only" id="header-navigation">
              Header navigation
            </h2>

            <ul class="flex items-center gap-6 text-[1rem] font-SG">
              <li>
                <a class=" text-black transition hover:text-[#D9CE3F]" href="/">
                  Pre-Market
                </a>
              </li>

              <li>
                <a
                  class="text-black  transition hover:text-[#D9CE3F]"
                  href="/livemarkets"
                >
                  Live Market
                </a>
              </li>

              <li>
                <a
                  class="text-black  transition hover:text-[#D9CE3F]"
                  href="/redeem"
                >
                 Redeem
                </a>
              </li>


              <li>
                <a
                  class="text-black transition hover:text-[#D9CE3F]"
                  href="/https://twitter.com/xsauce_io"
                >
                  Contact Us
                </a>
              </li>


              <li>
                <a
                  class="text-black  transition hover:text-[#D9CE3F]"
                  
                >
                  <Onboard/>
                </a>
              </li>
            </ul>
          </nav>

          <div class="flex items-center gap-4">
            <div class="sm:gap-4 sm:flex">
              <ConnectButton/>
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
                  href="/redeem"
                >
                 Redeem
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
