import React from 'react';
import { Box, Button, Card, CardContent, MenuItem, TextField, Typography, Stack, Paper } from '@mui/material';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';
import { useAuthStore } from '../../store/auth';
import { useCreateComplaint } from '../../hooks/useComplaints';
import MapPreview from '../../components/maps/MapPreview';

const schema = z.object({
	department: z.string().min(1),
	category: z.string().min(1),
	description: z.string().min(5),
	location: z.string().min(2)
});

type FormValues = z.infer<typeof schema>;

const API_PREFIX = process.env.REACT_APP_API_PREFIX || '';

const SubmitComplaint: React.FC = () => {
	const { enqueueSnackbar } = useSnackbar();
	const { user } = useAuthStore();
	const { mutateAsync, isPending } = useCreateComplaint();
	const [imageFile, setImageFile] = React.useState<File | null>(null);
	const [imagePreview, setImagePreview] = React.useState<string | null>(null);
	const [uploading, setUploading] = React.useState(false);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			setImageFile(file);
			setImagePreview(URL.createObjectURL(file));
		}
	};

	const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: { department: 'Sanitation', category: 'Garbage', description: '', location: '' }
	});

	const onSubmit = async (values: FormValues) => {
		if (!user) return;

		let imageUrl = undefined;
		if (imageFile) {
			setUploading(true);
			try {
				const formData = new FormData();
				formData.append('image', imageFile);
				const res = await fetch(`${API_PREFIX}/api/upload`, { method: 'POST', body: formData });
				if (!res.ok) throw new Error('Upload failed');
				const data = await res.json();
				imageUrl = data.url;
			} catch (err) {
				enqueueSnackbar('Failed to upload image', { variant: 'error' });
				setUploading(false);
				return;
			}
			setUploading(false);
		}

		const created = await mutateAsync({
			citizenId: user.id,
			department: values.department,
			category: values.category,
			description: values.description,
			location: values.location,
			imageUrl
		});
		enqueueSnackbar(`Complaint submitted. ID: ${created.id}`, { variant: 'success' });
		reset();
		setImageFile(null);
		setImagePreview(null);
	};

	return (
		<Card className="glass-card">
			<CardContent>
				<Typography variant="h6" gutterBottom>Submit Complaint</Typography>
				<Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'grid', gap: 2 }}>
					<Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
						<TextField select label="Department" fullWidth {...register('department')} error={!!errors.department} helperText={errors.department?.message}>
							<MenuItem value="Roads Maintenance">Roads Maintenance</MenuItem>
							<MenuItem value="Urban Drainage">Urban Drainage</MenuItem>
							<MenuItem value="Waste Management">Waste Management</MenuItem>
						</TextField>
						<TextField select label="Category" fullWidth {...register('category')} error={!!errors.category} helperText={errors.category?.message}>
							<MenuItem value="Potholes">Potholes (Roads)</MenuItem>
							<MenuItem value="Broken Infrastructure">Broken Infrastructure (Roads)</MenuItem>
							<MenuItem value="Drain Clogging">Drain Clogging (Drainage)</MenuItem>
							<MenuItem value="Flooding">Flooding (Drainage)</MenuItem>
							<MenuItem value="Garbage Pile">Garbage Pile (Waste)</MenuItem>
							<MenuItem value="Missed Collection">Missed Collection (Waste)</MenuItem>
						</TextField>
					</Stack>
					<TextField label="Description" fullWidth multiline minRows={3} {...register('description')} error={!!errors.description} helperText={errors.description?.message} />
					<Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
						<TextField label="Location" fullWidth {...register('location')} error={!!errors.location} helperText={errors.location?.message} />
						<Button variant="outlined" component="label" fullWidth disabled={uploading}>
							{imageFile ? 'Change Image' : 'Upload Media'}
							<input hidden accept="image/*" type="file" onChange={handleImageChange} />
						</Button>
					</Stack>
					{imagePreview && (
						<Box sx={{ mt: 1, mb: 1 }}>
							<Typography variant="body2" color="text.secondary" gutterBottom>Image preview</Typography>
							<img src={imagePreview} alt="Preview" style={{ maxHeight: '150px', borderRadius: '8px', border: '1px solid var(--glass-border)' }} />
						</Box>
					)}
					<Paper className="glass-card" sx={{ p: 2 }}>
						<Typography variant="body2" color="text.secondary">Map preview</Typography>
						<MapPreview height={220} />
					</Paper>
					<Button type="submit" variant="contained" size="large" disabled={isPending || uploading}>Submit</Button>
				</Box>
			</CardContent>
		</Card>
	);
};

export default SubmitComplaint;