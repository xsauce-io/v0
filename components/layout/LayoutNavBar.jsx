import React from 'react';
import { NavBar } from '../common/navbar/NavBar'
import { THEME } from '../common/navbar/navbar.theme';
export const LayoutNavBar = () => {
	return (
		<NavBar theme={THEME.dark} />
	)
}