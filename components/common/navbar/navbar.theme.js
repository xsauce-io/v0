

export const THEME = {
    light: 'light',
    dark: 'dark',
};

/**
 * Theming Components
 * prefix tw stands for a tw string
 */

export const NavBarTheme = {
    dark: {
        //tw
        twBgColor: 'bg-[#0C1615]',
        twButtonColor: 'bg-[#fff]',
        twTextColor: 'text-[#0C1615]',
        // non-tw
        logoColor: '#fff',
        menuButtonColor: '#fff',
        iconTextColor: '#0C1615',
        drawerIconColor: '#fff',

    },

    light: {
        //tw
        twBgColor: 'bg-[#fff]',
        twButtonColor: 'bg-[#0C1615]',
        twTextColor: 'text-[#fff]',
        // non-tw
        logoColor: '#0C1615',
        menuButtonColor: '#0C1615',
        iconTextColor: '#fff',
        drawerIconColor: '#000',

    }

}

export const DrawerContainerTheme = {
    dark: {
        drawerIconColor: '#fff',
    },

    light: {
        drawerIconColor: '#000',
    }

}

export const CopyAddressButtonTheme = {
    dark: {
        //tw
        twButtonColor: 'bg-[#fff]',
        twTextColor: 'text-[#0C1615]',
        //
        iconTextColor: '#0C1615',

    },

    light: {
        //tw
        twButtonColor: 'bg-[#0C1615]',
        twTextColor: 'text-[#fff]',
        //
        iconTextColor: '#fff',

    }

}
