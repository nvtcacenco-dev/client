import { Theme, createTheme} from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';

export interface LoginSignUpProps{
    theme: (outerTheme: Theme) => Theme;
}

export interface AuthenticationLayoutProps{
    loginName: string;
    signUpName: string;
    switchStatus: boolean;
    setSwitchStatus: (value: React.SetStateAction<boolean>) => void;
}

export const customInputTheme = (outerTheme: Theme) =>
    createTheme({
        palette: {
            mode: outerTheme.palette.mode,
        },
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '--TextField-brandBorderColor': '#E0E3E7',
                        '--TextField-brandBorderHoverColor': 'var(--primary-clr-600)',
                        '--TextField-brandBorderFocusedColor': 'var(--primary-clr-600)',
                        '& label.Mui-focused': {
                            color: 'var(--primary-clr-800)',
                        },
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    notchedOutline: {
                        borderColor: 'var(--TextField-brandBorderColor)',
                    },
                    root: {
                        color: 'var(--dark-clr)',
                        fontFamily: 'Poppins !important',
                        fontSize: 'var(--fs-sm)',
                        borderRadius: 'var(--btn-border-radius)',
                        [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: 'var(--TextField-brandBorderHoverColor)',
                        },
                        [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: 'var(--TextField-brandBorderFocusedColor)',
                        },
                    },
                },
            },
            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        fontSize: 'var(--fs-sm)',
                    }
                }
            },
            MuiInput: {
                styleOverrides: {
                    root: {
                        '&::before': {
                            borderBottom: '2px solid var(--TextField-brandBorderColor)',
                        },
                        '&:hover:not(.Mui-disabled, .Mui-error):before': {
                            borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
                        },
                        '&.Mui-focused:after': {
                            borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
                        },
                    },
                },
            },
        },
    });