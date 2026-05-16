import React from 'react';
import { Box, Button, Typography } from '@mui/material';

interface HeroProps {
	title: string;
	subtitle: string;
	actionText?: string;
	onAction?: () => void;
	// allow passing sx for the button to customize color
	buttonSx?: any;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, actionText, onAction, buttonSx }) => {
	return (
		<Box className="hero-section" sx={{ textAlign: 'center', mb: 4 }}>
			<Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>{title}</Typography>
			<Typography variant="h6" sx={{ opacity: 0.85, mb: 2 }}>{subtitle}</Typography>
			{actionText && (
				<Button variant="contained" onClick={onAction} sx={{ color: 'var(--white)', background: 'var(--green-dark)', '&:hover': { background: 'var(--green)' }, ...buttonSx }}>{actionText}</Button>
			)}
		</Box>
	);
};

export default Hero;
