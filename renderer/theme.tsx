import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const fonts = { mono: `'Menlo', monospace` }

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
})

const theme = extendTheme({
  colors: {
    primary: {
      "50": "#EFF0F6",
      "100": "#D1D4E5",
      "200": "#B4B9D5",
      "300": "#979EC4",
      "400": "#7982B3",
      "500": "#5C67A3",
      "600": "#4A5282",
      "700": "#373E62",
      "800": "#252941",
      "900": "#121521"
    },
    secondary: {
      "50": "#EFEFF5",
      "100": "#D3D3E4",
      "200": "#B6B6D2",
      "300": "#9A9AC1",
      "400": "#7E7EAF",
      "500": "#61619E",
      "600": "#4E4E7E",
      "700": "#3A3A5F",
      "800": "#27273F",
      "900": "#131320"
    },
    whiteProgress: {
      50: '#ffffff',
      100: '#ffffff',
      500: '#ffffff',
    },
  },
  shadows: { outline: '0 !important' },
  fonts: {
    body: 'DM Sans, sans-serif',
    heading: 'DM Sans, serif',
    mono: 'DM Sans, monospace',
  },
  styles: {
    global: {
      body: {
        bg: 'primary.800',
        bordercolor: 'primary.900'
      },
      "*, *::before, &::after": {
        borderColor: 'secondary.800',
        color: "primary.100"
      },
      "input": {
        backgroundColor: '#252941 !important',
      },
      "button": {
        backgroundColor: '#252941 !important',
      },
      "input:hover": {
        borderColor: '#4A5282 !important',
      },
      "*::placeholder": {
        color: 'primary.400'
      }
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
      },
      variants: {
        withShadow: props => ({
          rounded: 20,
          _hover: {
            bg: '#323232',
          },
        }),
        solidButton: () => ({
          bg: '#18129D',
          color: 'white',
          borderRadius: '4px',
        }),
        danger: () => ({
          bg: '#c60000',
          color: 'white',
          borderRadius: '4px',
        }),
        withoutBorder: props => ({
          color: 'black',
          border: 'none',
          cursor: 'pointer',
          _hover: {
            bg: '#e9e9e9',
          },
        }),
      },
    },
  },
});

export default theme
