import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		mode: 'light',
	primary: { main: '#0f5132' },
	secondary: { main: '#8DA65A' },
		background: {
			default: '#ffffff',
			paper: '#ffffff'
		}
	},
	shape: {
		borderRadius: 10
	},
	typography: {
		fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif'
	}
});

export default theme;
