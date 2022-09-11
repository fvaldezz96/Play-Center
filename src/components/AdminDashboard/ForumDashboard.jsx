import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../redux/actions';
import moment from 'moment';
import { Box } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import ForumActions from './ForumActions';

export default function ForumDashboard() {
	const dispatch = useDispatch();
	const allPosts = useSelector(state => state.posts);

	const [rowId, setRowId] = useState(null);

	useEffect(() => {
		dispatch(getAllPosts());
	}, [dispatch]);

	const columnPosts = useMemo(
		() => [
			{ field: 'id', headerName: 'Post ID', width: 150 },
			{ field: 'userId', headerName: 'User ID', width: 150 },
			{ field: 'title', headerName: 'Title', width: 250, editable: true },
			{ field: 'text', headerName: 'Content', width: 250, editable: true },
			{ field: 'othersUsersLike', headerName: 'Likes', width: 60 },
			{ field: 'answers', headerName: 'Answers', width: 80 },
			{ field: 'genre', headerName: 'Genre', width: 100 },
			{ field: 'report', headerName: 'Reports', width: 80 },
			{ field: 'deleteFlag', headerName: 'Delete Flag', width: 100, type: 'boolean', editable: true },
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
				renderCell: params => <ForumActions {...{ params, rowId, setRowId }} />,
			},
		],
		[rowId]
	);

	const rowForumData = allPosts?.map(post => {
		return {
			id: post?.id,
			userId: post?.userId,
			title: post?.title,
			text: post?.text,
			othersUsersLike: post?.othersUsersLike.length,
			deleteFlag: post?.deleteFlag,
			report: post?.report.length,
			genre: post?.genre,
			answers: post?.answers.length,
			createdAt: post?.createdAt,
			updatedAt: post?.updatedAt,
		};
	});

	return (
		<div>
			<h3 className="mt-10 mb-10 mx-5 text-7xl opacity-85 font-totifont text-center text-white">Forum</h3>
			<Box
				sx={{
					height: 600,
					width: '80%',
					margin: 'auto',
					bgcolor: grey[200],
				}}
			>
				<DataGrid
					rows={rowForumData}
					columns={columnPosts}
					loading={!allPosts.length}
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
