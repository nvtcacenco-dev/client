import { createTheme } from '@mui/material/styles';

export const stripeAppearance = {
  theme: 'stripe',
  variables: {
    fontWeightNormal: '400',
    fontWeightMedium: '500',
    fontWeightBold: '600',
    borderRadius: '2px',
    colorPrimary: '#ffdce0',
    tabIconSelectedColor: '#fff',
    gridRowSpacing: '16px',
  },
  rules: {
    '.Tab': {
      boxShadow: '0px 3px 10px rgba(18, 42, 66, 0.08)',
      fontWeight: '600',
    },
    '.Input, .Block, .CheckboxInput, .CodeInput': {
      boxShadow: 'none',
    },
    '.Block': {
      borderColor: 'transparent',
    },
    '.BlockDivider': {
      backgroundColor: '#ebebeb',
    },
    '.Tab, .Tab:hover, .Tab:focus': {
      border: '0',
    },
    '.Tab--selected, .Tab--selected:hover': {
      backgroundColor: '#ffdce0',
      color: 'var(--light-clr)',
    },
    '.Label': {
      fontWeight: '700',
    },
  },
};
export const customTheme = (outerTheme: { palette: { mode: any } }) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiFormLabel: {
        styleOverrides: {
          root: {
            fontSize: 'var(--fs-base)',
            paddingLeft: '12px',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '--TextField-brandBorderColor': 'var(--primary-clr-600)',
            '--TextField-brandBorderHoverColor': 'transparent',
            '--TextField-brandBorderFocusedColor': 'var(--primary-clr-600)',
            '& label.Mui-focused': {
              color: '#6F7E8C',
            },
          },
        },
      },

      MuiFilledInput: {
        styleOverrides: {
          root: {
            borderRadius: '36px',
            transition:
              'border-radius 0.3s 0.3s ease-in-out, background-color 0.3s ease-in-out',
            overflow: 'hidden',
            paddingLeft: '12px',
            fontSize: 'var(--fs-base)',
            backgroundColor: '#fdf6f7',
            border: '1px solid var(--primary-clr-600)',
            '&:hover': {
              backgroundColor: 'var(--primary-clr-600)',
            },
            '&.Mui-focused': {
              backgroundColor: 'var(--light-clr)',
              border: '1px solid var(--primary-clr-600)',
              borderRadius: '0px',
              transition:
                'border-radius 0.3s 0s ease-in-out, background-color 0.3s ease-in-out',
            },
            '&::before, &::after': {
              borderBottom: '0px solid var(--TextField-brandBorderColor)',
            },
            '&:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '0px solid var(--TextField-brandBorderHoverColor)',
            },
            '&.Mui-focused:after': {
              borderBottom:
                '0px solid var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
    },
});
export const customThemeSm = (outerTheme: { palette: { mode: any } }) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiFormLabel: {
        styleOverrides: {
          root: {
            fontSize: 'var(--fs-base)',
            paddingLeft: '12px',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '--TextField-brandBorderColor': 'var(--primary-clr-600)',
            '--TextField-brandBorderHoverColor': 'transparent',
            '--TextField-brandBorderFocusedColor': 'var(--primary-clr-600)',
            '& label.Mui-focused': {
              color: '#6F7E8C',
            },
          },
        },
      },

      MuiFilledInput: {
        styleOverrides: {
          root: {
            borderRadius: '0px',
            transition:
              'border-radius 0.3s 0.3s ease-in-out, background-color 0.3s ease-in-out',
            overflow: 'hidden',
            paddingLeft: '12px',
            fontSize: 'var(--fs-base)',
            backgroundColor: '#fdf6f7',
            border: '1px solid var(--primary-clr-600)',
            '&:hover': {
              backgroundColor: 'var(--primary-clr-600)',
            },
            '&.Mui-focused': {
              backgroundColor: 'var(--light-clr)',
              border: '1px solid var(--primary-clr-600)',
              borderRadius: '0px',
              transition:
                'border-radius 0.3s 0s ease-in-out, background-color 0.3s ease-in-out',
            },
            '&::before, &::after': {
              borderBottom: '0px solid var(--TextField-brandBorderColor)',
            },
            '&:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '0px solid var(--TextField-brandBorderHoverColor)',
            },
            '&.Mui-focused:after': {
              borderBottom:
                '0px solid var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
    },
});
