import React from 'react';
import { Drawer, Box, Typography } from '@mui/material'
import { useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'


export const Nav = () => {
 
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <header class="bg-gray-900">
    <div
      class="flex items-center h-16 w-full gap-8 px-4 mx-auto sm:px-6 lg:px-8"
    >
      <a class="block text-teal-300" href="/">
        <span class="sr-only">Home</span>
        <img src='/logo.svg' class="h-[40px]"/>
      </a>
  
      <div class="flex items-center justify-end flex-1 md:justify-between">
        <nav class="hidden md:block" aria-labelledby="header-navigation">
          <h2 class="sr-only" id="header-navigation">Header navigation</h2>
  
          <ul class="flex items-center gap-6 text-sm">
            <li>
              <a class="text-white transition hover:text-white/75" href="/">
                Blog
              </a>
            </li>
  
    
  
            <li>
              <a class="text-white transition hover:text-white/75" href="/">
               Wager
              </a>
            </li>
  
            <li>
              <a class="text-white transition hover:text-white/75" href="/">
               Contact Us
              </a>
            </li>
  
            <li>
              <a class="text-white transition hover:text-white/75" href="/">
                FAQ
              </a>
            </li>
          </ul>
        </nav>
  
        <div class="flex items-center gap-4">
          <div class="sm:gap-4 sm:flex">
          <ConnectButton/>
          </div>
  
          <button
            class="block p-2.5 text-white bg-gray-800 rounded md:hidden hover:text-white/75 transition"
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
          PaperProps={{ sx: {
            backgroundColor:'black'
          }}}
          anchor='right'
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}

          >
              <Box p={2} width='250px' textAlign='left' role='presentation' sx={{backgroundColor:'black', height:'100'}}  >
                <Typography component='div'>
                  <ul class='space-y-10 pl-1 text-[27px] text-#F5DEB3'>
                    <li>
                    <a class="text-[#F5DEB3] transition hover:text-white/75" href="/">
                    HOME
                    </a>
                    </li>
                  
                    <li>
                    <a class="text-[#F5DEB3] transition hover:text-white/75" href="/">
                    LOGIN
                    </a>
                    </li>
                 
                    <li>
                    <a class="text-[#F5DEB3] transition hover:text-white/75" href="/">
                    FUND
                    </a>
                    </li>

                   
                    <li>
                    <a class="text-[#F5DEB3] transition hover:text-white/75" href="/">
                    WAGER
                    </a>
                    </li>
                    
                   
                    <li>
                    <a class="text-[#F5DEB3] transition hover:text-white/75" href="/">
                    HOW IT WORKS
                    </a>
                    </li>

                   
                    <li>
                    <a class="text-[#F5DEB3] transition hover:text-white/75" href="/">
                    BLOG
                    </a>
                    </li>
                    
                    
                    <li>
                    <a class="text-[#F5DEB3] transition hover:text-white/75" href="/">
                   FAQs
                    </a>
                    </li>
                    

                    
                    <li>
                    <a class="text-[#F5DEB3] transition hover:text-white/75" href="/">
                    CONTACT US
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
  
  )
}