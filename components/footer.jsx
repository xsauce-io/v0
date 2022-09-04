
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { BsTelegram } from "react-icons/bs"
import { FaGithub, FaRegHandPeace, FaTwitter, FaTwitterSquare } from "react-icons/Fa"

export const Footer = ({ children }) => {
    return (
        <footer>
            <div className="mb-16 grid grid-cols-3 ">

                <div className="col-span-1 space-y-6">
                    <svg
                        width="33"
                        height="32"
                        viewBox="0 0 33 29"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M22.6347 17.7117L31.0665 25.0761C32.8526 26.6404 32.5987 29.0007 30.1236 29.0007H25.4634C24.729 29.0007 24.0218 28.7354 23.505 28.2505L17.0678 22.295C16.7505 22.0022 16.2337 22.0022 15.9164 22.295L9.43388 28.2505C8.91709 28.7262 8.21897 28.9915 7.48459 28.9915H2.75189C0.29488 28.9915 -0.929093 26.2653 0.829802 24.6918L8.6995 17.6385C9.20722 17.1811 9.19815 16.4309 8.68136 15.9918L1.46445 9.8259C-0.366972 8.27984 0.838868 5.48962 3.33215 5.48962H7.61152C8.32777 5.48962 9.01682 5.74578 9.52454 6.20319L15.9073 11.8843L22.6347 17.7117Z"
                            fill="#000000"
                        />
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M21.2002 4.42065C19.9736 5.73654 18.9956 6.78574 18.9956 9L19.6487 8.99942C19.903 11.6696 22.1342 13.759 24.8469 13.759C27.73 13.759 30.0691 11.3988 30.0691 8.48961H29.9799C29.8495 6.47727 28.9228 5.49696 27.7687 4.2761C26.8424 3.29619 25.7695 2.16131 24.8444 0.213421C24.7106 -0.0775251 24.2901 -0.0678269 24.1563 0.223119C23.2474 2.22434 22.1494 3.40235 21.2002 4.42065Z"
                            fill="#000000"
                        />
                    </svg>
                    <div className="text-[58px] font-SG" >The future of <span className="block"> cultural asset </span></div>
                    <div className="text-[10px] font-inter">The prediction market known as "The Xchange" is for informational and educational purposes only. "The Xchange" is a decentralized protocol operated by autonomous smart contracts and does not have any vested interest in the outcomes of any market.</div>
                </div>

            </div>
            <div className="flex flex-row border-t-[2px] border-black py-6 space-x-8">
                <div className=" space-x-10">
                    <a href="https://docs.xsauce.io/connect/socials"
                        target={'_blank'}
                        rel={'noreferrer'}>
                        <button className="text-[12px] hover:underline">Whitepaper</button>
                    </a>
                    <a href="https://docs.xsauce.io/connect/socials"
                        target={'_blank'}
                        rel={'noreferrer'}>
                        <button className="text-[12px] hover:underline">Xchange</button>
                    </a>
                    <a href="https://docs.xsauce.io/connect/socials"
                        target={'_blank'}
                        rel={'noreferrer'}>
                        <button className="text-[12px] hover:underline">Docs</button>
                    </a>
                </div>
                <div className="space-x-6">
                    <a
                        href="https://twitter.com/xsauce_io"
                        target={'_blank'}
                        rel={'noreferrer'}
                    >
                        <button>
                            <FaTwitterSquare size={20} />
                        </button>

                    </a>
                    <a
                        href="https://github.com/xsauce-io"
                        target={'_blank'}
                        rel={'noreferrer'}
                    >
                        <button>
                            <FaGithub size={20} />
                        </button>
                    </a>
                    <a
                        href="https://angel.co/company/xsauced-1"
                        target={'_blank'}
                        rel={'noreferrer'}
                    >
                        <button>
                            <FaRegHandPeace size={20} />
                        </button>

                    </a>
                    <a
                        href="https://angel.co/company/xsauced-1"
                        target={'_blank'}
                        rel={'noreferrer'}
                    >
                        <button >
                            <BsTelegram size={20} />
                        </button>

                    </a>

                </div>
                <div className="flex-1 text-right text-[12px]">© 2022 Xsauce platform</div>
            </div>

        </footer>
    )
}