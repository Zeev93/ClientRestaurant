import MaterialTable from 'material-table'
import { useNavigate } from 'react-router-dom';
import {tableIcons} from '../ui/DataTableIcons'

const Table = ({header, body, title, setEdit, deleteItem}) => {

    const navigate = useNavigate()

    return ( 
         <MaterialTable
            icons={tableIcons}
            columns={header}
            data={body}
            title={title}
            options={{
                actionsColumnIndex: -1,
                exportButton: true,
                pageSize: 10,
                pageSizeOptions:[ 10, 25, 50, 100],
            }}
            actions={[
                {
                    icon: tableIcons.Edit,
                    color: 'warning',
                    tooltip: 'Edit',
                    // onClick: (event, rowData) => () => { setEdit() },
                    onClick: (event, rowData) => setEdit(rowData.id) ,
                },
                {
                    icon: tableIcons.Delete,
                    color: 'error',
                    tooltip: 'Delete',
                    onClick: (event, rowData) => deleteItem(rowData.id)
                },
            ]}
         />
     );
}
 
export default Table;