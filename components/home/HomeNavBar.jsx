import React from 'react';
import { NavBar } from '../common/navbar/NavBar'
import { THEME } from '../common/navbar/navbar.theme';
export const HomeNavBar = () => {
	return (

		<NavBar padding={true} theme={THEME.light} />
	)
}