import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { DataTypeProps } from './Data'; // Correct the import

const columns: GridColDef[] = [
    {
        field: 'userId',
        headerName: 'UserId',
        width: 150,
        editable: true,
    },
    {
        field: 'id',
        headerName: 'Id',
        width: 150,
        editable: true,
    },
    {
        field: 'title',
        headerName: 'Title',
        type: 'string',
        width: 200,
        editable: true,
    },
    {
        field: 'body',
        headerName: 'Body',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 300,
    },
];

interface DataGridDemoProps {
    data: DataTypeProps[];
}

const DataGridDemo: React.FC<DataGridDemoProps> = ({ data }) => {
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={data}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}// Corrected to pageSize instead of paginationModel
                checkboxSelection
            />
        </Box>
    );
}

export default DataGridDemo;