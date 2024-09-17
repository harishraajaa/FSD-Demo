import React from 'react'
import Table from 'react-bootstrap/Table';

function TableComponent({col=[], row=[]}) {
  return <>
  <Table striped bordered hover>
      <thead>
        <tr>
          {
            col.map((e)=>{
                return <th>{e.title}</th>
            })
          }
        </tr>
      </thead>
      <tbody>
        {
            row.map((r)=><tr key={r.id}>
                {
                    col.map((c)=><td key={c.dataIndex}>
                        {c.render(r)}
                    </td>)
                }
            </tr>)
        }
      </tbody>
    </Table>
  </>
}

export default TableComponent