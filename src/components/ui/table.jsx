import MaterialTable from 'material-table'
import {tableIcons} from '../ui/DataTableIcons'
import {PatchedPagination} from './patchTable'

const Table = ({header, body, title, setEdit, deleteItem, show, showItem, edit, del}) => {

    let actions = []

    if(show){
        actions.push({ 
            icon: tableIcons.Search,
            color: 'primary',
            tooltip: 'Details',
            onClick: (event, rowData) => showItem(rowData.id)
        })
    }
    if (edit) {
        actions.push({
            icon: tableIcons.Edit,
            color: 'warning',
            tooltip: 'Edit',
            onClick: (event, rowData) => setEdit(rowData.id) ,
        })
    }
    if (del) {
        actions.push({
            icon: tableIcons.Delete,
            color: 'error',
            tooltip: 'Delete',
            onClick: (event, rowData) => deleteItem(rowData.id)
        })
    }

   

    return ( 
         <MaterialTable
            icons={tableIcons}
            components={{
                Pagination: PatchedPagination,
              }}
            columns={header}
            data={body}
            title={title}
            options={{
                actionsColumnIndex: -1,
                exportButton: true,
                pageSize: 10,
                pageSizeOptions:[ 10, 25, 50, 100],
                headerStyle: {
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    textAlign: 'center'
                },
            }}
            actions={actions}
         />
     );
}
 
export default Table;