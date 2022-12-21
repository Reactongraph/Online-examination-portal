import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Link from 'next/link'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import {
	blue,
	green,
	pink,
	yellow,
	deepPurple,
	deepBlue,
} from '@mui/material/colors'

export default function Navbar() {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static'>
				<Toolbar>
					<IconButton
						size='large'
						edge='start'
						color='inherit'
						aria-label='menu'
						sx={{ mr: 2 }}></IconButton>
					<Typography
						variant='h6'
						component='div'
						sx={{ flexGrow: 1 }}>
						<Grid
							container
							spacing={0}>
							<Avatar
								style={{ margin: '0 15px' }}
								sx={{ bgcolor: blue[500] }}>
								EX
							</Avatar>
							Exam App
						</Grid>
					</Typography>
				</Toolbar>
			</AppBar>
		</Box>
	)
}
