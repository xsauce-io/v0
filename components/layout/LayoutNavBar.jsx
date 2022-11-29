import React from 'react';
import { NavBar } from '../common/navbar/NavBar'
import { THEME_TYPE } from '../common/navbar/navbar.theme';
export const LayoutNavBar = () => {
	return (
		<NavBar themeType={THEME_TYPE.dark} />
	)
}