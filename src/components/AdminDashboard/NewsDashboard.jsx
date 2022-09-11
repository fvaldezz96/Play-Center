import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { getAllNews } from '../../redux/actions';
import { useMemo } from 'react';
import { grey } from '@mui/material/colors';
import NewsForm from './NewsForm';
import NewsActions from './NewsActions';

export default function NewsDashboard() {
	const dispatch = useDispatch();
	const allNews = useSelector(state => state.allNews);

	const [rowId, setRowId] = useState(null);

	useEffect(() => {
		dispatch(getAllNews());
	}, [dispatch]);

	const columnNews = useMemo(
		() => [
			{ field: 'id', headerName: 'ID', width: 100 },
			{ field: 'title', headerName: 'Title', width: 400, editable: true },
			{ field: 'short_description', headerName: 'Description', width: 300, editable: true },
			{
				field: 'main_image',
				headerName: 'Image',
				width: 60,
				renderCell: params => <Avatar src={params.row.main_image} />,
				sortable: false,
				filterable: false,
			},
			{ field: 'deleteFlag', headerName: 'Delete Flag', width: 100, type: 'boolean', editable: true },
			{
				field: 'actions',
				headerName: 'Actions',
				type: 'actions',
				renderCell: params => <NewsActions {...{ params, rowId, setRowId }} />,
			},
		],
		[rowId]
	);

	const rowNewsData = allNews?.map(news => {
		return {
			id: news?.id,
			title: news?.title,
			short_description: news?.short_description,
			main_image: news?.main_image,
			deleteFlag: news?.deleteFlag,
		};
	});

	return (
		<div>
			<h3 className="mt-10 mb-10 mx-5 text-7xl opacity-85 font-totifont text-center text-white">News</h3>
			<Box
				sx={{
					height: 600,
					width: '60%',
					margin: 'auto',
					bgcolor: grey[200],
				}}
			>
				<DataGrid
					rows={rowNewsData}
					columns={columnNews}
					loading={!allNews.length}
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
			<NewsForm />
		</div>
	);
}
