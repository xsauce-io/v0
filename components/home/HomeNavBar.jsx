import React from 'react';
import { NavBar } from '../common/navbar/NavBar'
import { THEME_TYPE } from '../common/navbar/navbar.theme';
export const HomeNavBar = () => {
	return (

		<NavBar padding={true} themeType={THEME_TYPE.light} />
	)
}