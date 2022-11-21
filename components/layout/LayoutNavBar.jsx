import React from 'react';
import { NavBar } from '../common/NavBar'
import { NAVBAR_THEME } from '../common/NavBar';
export const LayoutNavBar = () => {
	return (
		<NavBar theme={NAVBAR_THEME.dark} />
	)
}