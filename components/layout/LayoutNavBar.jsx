import React from 'react';
import { NavBar } from '../common/navbar/NavBar'
import { NAVBAR_THEME } from '../common/navbar/NavBar';
export const LayoutNavBar = () => {
	return (
		<NavBar theme={NAVBAR_THEME.dark} />
	)
}