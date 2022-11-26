import React from 'react';
import { NavBar } from '../common/navbar/NavBar'
import { NAVBAR_THEME } from '../common/navbar/NavBar';
export const HomeNavBar = () => {
	return (

		<NavBar padding={true} theme={NAVBAR_THEME.light} />
	)
}