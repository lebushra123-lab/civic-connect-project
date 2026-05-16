import React from 'react';
import { Box, Paper, Typography, IconButton, TextField, Button } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ReactMarkdown from 'react-markdown';
const Chatbot: React.FC = () => {
	const [open, setOpen] = React.useState(false);
	const [messages, setMessages] = React.useState<{ sender: 'bot' | 'user'; text: string }[]>([
		{ sender: 'bot', text: "Hello! I'm your SmartCivic assistant. How can I help?" }
	]);
	const [input, setInput] = React.useState('');

	const send = async () => {
		if (!input.trim()) return;
		const userText = input.trim();
		setMessages((m) => [...m, { sender: 'user', text: userText }]);
		setInput('');
		// call backend AI proxy
		try {
			setMessages((m) => [...m, { sender: 'bot', text: 'Typing...' }]);
			const res = await fetch('/api/ai/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: userText }), credentials: 'include' });
			if (!res.ok) throw new Error(await res.text());
			const json = await res.json();
			// replace last bot message "Typing..." with real reply
			setMessages((prev) => {
				const copy = prev.slice(0, -1);
				copy.push({ sender: 'bot', text: json.reply || 'Sorry, no response' });
				return copy;
			});
		} catch (err: any) {
			setMessages((prev) => {
				const copy = prev.slice(0, -1);
				copy.push({ sender: 'bot', text: 'Error: ' + (err.message || String(err)) });
				return copy;
			});
		}
	};

	return (
		<Box sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1200 }}>
			<IconButton onClick={() => setOpen((v) => !v)} size="large" sx={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--green-dark)', color: 'var(--white)', boxShadow: 6 }}>
				<SmartToyIcon />
			</IconButton>
			{open && (
				<Paper className="glass-card" sx={{ position: 'absolute', bottom: 84, right: 0, width: 360, height: 480, display: 'flex', flexDirection: 'column' }}>
					<Box sx={{ p: 2, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
						<Typography variant="subtitle1" fontWeight={600}>SmartCivic AI Assistant</Typography>
					</Box>
					<Box sx={{ p: 2, flex: 1, overflow: 'auto', display: 'grid', gap: 1 }}>
						{messages.map((m, i) => (
							<Box key={i} sx={{ display: 'flex', justifyContent: m.sender === 'user' ? 'flex-end' : 'flex-start' }}>
								<Box sx={{ 
									px: 1.5, 
									py: 1, 
									borderRadius: 2, 
									bgcolor: m.sender === 'user' ? 'primary.main' : 'grey.100', 
									color: m.sender === 'user' ? '#fff' : 'text.primary', 
									maxWidth: '80%',
									'& p': { m: 0, mb: 1 },
									'& p:last-of-type': { mb: 0 },
									'& ul, & ol': { mt: 0.5, mb: 0.5, pl: 2 },
									'& h1, & h2, & h3, & h4, & h5, & h6': { m: 0, mb: 0.5, fontSize: '1.05rem', fontWeight: 600 }
								}}>
									{m.sender === 'bot' ? <ReactMarkdown>{m.text}</ReactMarkdown> : m.text}
								</Box>
							</Box>
						))}
					</Box>
					<Box sx={{ p: 1.5, display: 'flex', gap: 1 }}>
						<TextField size="small" fullWidth value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..." />
						<Button variant="contained" onClick={send}>Send</Button>
					</Box>
				</Paper>
			)}
		</Box>
	);
};

export default Chatbot;
