import React from 'react';
import { Box } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { grey } from '@mui/material/colors';

export default function DataTable({ rows, columns, loading, setRowId }) {
  return(
    <div className="container mx-auto">
      <Box
      sx={{
        height:600,
        width:'100%',
        bgcolor: grey[100]
      }}
      >
        <DataGrid
          rows={rows} 
          columns={columns}  
          loading={loading}
          sx={{
            [`& .${gridClasses.row}`]: {
              bgcolor: (theme) => 
                theme.palette.mode === 'light' ? grey[200] : grey[900],
            },
          }}
          pageSize={8}
          getRowId={row=>row.id}
          getRowSpacing={params=> ({
            top:params.isFirstVisible ? 0 : 3,
            bottom: params.isLastVisible ? 0 : 3,
          })}
          onCellEditCommit={params=>setRowId(params.id)}
        />
      </Box>
    </div>
  )
}