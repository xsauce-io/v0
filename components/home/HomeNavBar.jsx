import React from 'react';
import { NavBar } from '../common/NavBar'
import { NAVBAR_THEME } from '../common/NavBar';
export const HomeNavBar = () => {
	return (

		<NavBar padding={true} theme={NAVBAR_THEME.light} />
	)
}