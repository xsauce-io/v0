import React, { useEffect, useMemo } from 'react';
import { NavBar } from '../common/NavBar'
import { NAVBAR_THEME } from '../common/NavBar';
export const HomeNavBar = () => {
	return (
		<div className="w-full px-5 laptop:px-40">
		<NavBar theme={NAVBAR_THEME.light} />
		</div>
	)
}