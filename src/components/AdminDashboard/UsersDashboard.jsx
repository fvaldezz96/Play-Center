import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../redux/actions';
import { Avatar } from '@mui/material';
import moment from 'moment';
import UsersActions from './UsersActions';
import { Box } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';

export default function UsersDashboard() {
	const dispatch = useDispatch();
	const allUsers = useSelector(state => state.users);

	const [rowId, setRowId] = useState(null);

	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	const columnsUsers = useMemo(
		() => [
			{ field: 'id', headerName: 'User ID', width: 150 },
			{
				field: 'img',
				headerName: 'Avatar',
				width: 60,
				renderCell: params => <Avatar src={params.row.img} />,
				sortable: false,
				filterable: false,
			},
			{ field: 'email', headerName: 'Email', width: 200 },
			{ field: 'nickname', headerName: 'Nickname', width: 120, editable: true },
			{ field: 'description', headerName: 'Description', width: 150, editable: true },
			{ field: 'plan', headerName: 'Plan', width: 60, type: 'boolean', editable: true },
			{ field: 'isAdmin', headerName: 'Admin', width: 60, type: 'boolean' },
			{ field: 'isSuperAdmin', headerName: 'SuperAdmin', width: 100, type: 'boolean' },
			{ field: 'favoriteGames', headerName: 'Favorite Games', width: 150 },
			{ field: 'friends', headerName: 'Friends', width: 150 },
			{ field: 'coins', headerName: 'Coins', width: 60, editable: true },
			{ field: 'rating', headerName: 'Rating', width: 60 },
			{ field: 'forums', headerName: 'Posts', width: 60 },
			{ field: 'answers', headerName: 'Answers', width: 70 },
			{ field: 'servers', headerName: 'Servers', width: 70, editable: true },
			{ field: 'missionsCompleted', headerName: 'Missions Completed', width: 150 },
			{ field: 'deleteFlag', headerName: 'Delete Flag', width: 100, type: 'boolean', editable: true },
			{ field: 'bannedFlag', headerName: 'Banned Flag', width: 100, type: 'boolean', editable: true },
			{
				field: 'createdAt',
				headerName: 'Created At',
				width: 150,
				renderCell: params => moment(params.row.createdAt).format('DD-MM-YYYY HH:MM:SS'),
			},
			{
				field: 'updatedAt',
				headerName: 'Updated At',
				width: 150,
				renderCell: params => moment(params.row.createdAt).format('DD-MM-YYYY HH:MM:SS'),
			},
			{
				field: 'actions',
				headerName: 'Actions',
				type: 'actions',
				renderCell: params => <UsersActions {...{ params, rowId, setRowId }} />,
			},
		],
		[rowId]
	);

	const rowUsersData = allUsers?.map(user => {
		return {
			id: user?.id,
			img: user?.img,
			email: user?.email,
			nickname: user?.nickname,
			description: user?.description,
			plan: user?.plan,
			isAdmin: user?.isAdmin,
			isSuperAdmin: user?.isSuperAdmin,
			favoriteGames: user?.favoriteGames,
			friends: user?.friends,
			coins: user?.coins,
			rating: user.rating,
			forums: user?.forums.length,
			answers: user?.answers.length,
			servers: user?.servers,
			missionsCompleted: user?.missionsCompleted,
			deleteFlag: user?.deleteFlag,
			bannedFlag: user?.bannedFlag,
			createdAt: user?.createdAt,
			updatedAt: user?.updatedAt,
		};
	});

	return (
		<div>
			<h3 className="mx-5 mt-10 mb-10 text-center text-white text-7xl opacity-85 font-totifont">Users</h3>
			<Box
				sx={{
					height: 600,
					width: '80%',
					margin: 'auto',
					bgcolor: grey[200],
				}}
			>
				<DataGrid
					rows={rowUsersData}
					columns={columnsUsers}
					loading={!allUsers.length}
					sx={{
						[`& .${gridClasses.row}`]: {
							bgcolor: grey[300],
						},
					}}
					pageSize={8}
					getRowId={row => row.id}
					getRowSpacing={params => ({
						top: params.isFirstVisible ? 0 : 3,
						bottom: params.isLastVisible ? 0 : 3,
					})}
					onCellEditStart={params => setRowId(params.id)}
				/>
			</Box>
		</div>
	);
}
