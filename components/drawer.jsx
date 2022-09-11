import React, { useEffect, useMemo } from "react";
import { Drawer, Box, Typography } from "@mui/material";
import { useState } from "react";
import { ethers, utils } from 'ethers';
import { Onboard } from "../components/onBoardingModal";
import PropTypes from 'prop-types';
import { useWindowDimensions } from "/utils/hooks/useWindowDimensions.js";
import { Laptop, ScreenRotationAltSharp, Screenshot } from "@mui/icons-material";



export const LocalDrawer = ({ children }) => {
    const screens = {
        mobile: "300",
        tablet: "640",
        smlaptop: "1024",
        laptop: "1200",
        desktop: "1400"
    }

    const { width } = useWindowDimensions();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);



    return (
        <>

            {width < screens.laptop ?
                <div className="flex-1 flex justify-end">
                    <button
                        className="mobile:block p-5 text-white bg-[inherit] rounded hover:text-[#D9CE3F]/75 transition  "
                        onClick={() => setIsDrawerOpen(true)}
                    >
                        <span className="sr-only">Toggle menu</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
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
                </div> :
                <></>
            }
            <Drawer
                PaperProps={{
                    sx: {
                        backgroundColor: "#EFF1F3",
                    },
                }
                }
                anchor="right"
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            >
                <div className="h-20 border-b-[1px] border-[#0C1615]  mx-8 "></div>
                <Box
                    p={4}
                    width="250px"
                    textAlign="left"
                    role="presentation"
                    sx={{ backgroundColor: "#EFF1F3", height: "100" }}
                >

                    <ul className="space-y-8 text-2xl font-SG pb-6">
                        <li>
                            <a
                                className="text-black transition hover:text-[#ACFF00]"
                                href="/"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                className="text-black transition hover:text-[#ACFF00]"
                                href="/premarkets"
                            >
                                Pre-Market
                            </a>
                        </li>

                        <li>
                            <a
                                className="text-black transition hover:text-[#ACFF00]"
                                href="/markets"
                            >
                                Live Market
                            </a>
                        </li>

                        <li>
                            <a
                                className="text-black transition hover:text-[#ACFF00]"
                                href="/redeem"
                            >
                                Redeem
                            </a>
                        </li>



                        <li>
                            <a
                                className="text-black transition hover:text-[#ACFF00]"
                                href="/https://twitter.com/xsauce_io"
                            >
                                Contact Us
                            </a>
                        </li>

                        {/* <li>
                                <div className="grid grid-cols-1 divide-y place-items-stretch	 ">
                                    <div>
                                        <Onboard />
                                    </div>
                                    
                                </div>

                            </li> */}
                    </ul>


                    {children}
                </Box>
            </Drawer>
        </>

    )
};