import { useTable } from "react-table";
import { useMemo, useContext } from "react";
import { authFetchData } from "@/pages/api/api_with_axiso";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserContext from "@/contextapi/AuthAndUsers";

import { useRouter } from "next/router";

export default function Table({data}){
    const router = useRouter()

    const {tokens} = useContext(UserContext)

    const handleCopy = (value) => {
        for (let i = 0; i < data.length; i++){
            if (data[i].id = value){
                navigator.clipboard.writeText(data[i].key)
                alert(`API key ${data[i].key} copied`)
            }
        }
    }

    const handleDelete = async (id) => {
        try {
            const {data} = await authFetchData(tokens.access_token).delete(`/auth/api-key/${id}`)
            router.reload(router.asPath)
        } catch (error) {
            console.log(error)
        }
    }

    const columns =  useMemo(()=>[
        {
            Header: "NAME",
            accessor: "name",
            Cell: ({ value }) => (
                <div className="truncate max-w-xs">
                    {value}
                </div>
            )
        },
        {
            Header: "NEWSXAI API KEY",
            accessor: "key",
            Cell: ({ value }) => (
                <div className="truncate max-w-xs">
                    {value}
                </div>
            )
        },
        {
            Header: "ACTIONS",
            accessor: "id",
            Cell: ({ value }) => (
                <div className="flex items-center gap-4">
                    <div className="text-red-800" onClick={()=>handleDelete(value)}>
                        <FontAwesomeIcon icon={["fas", "trash"]} />
                    </div>
                    <div className="text-red-800" onClick={()=>handleCopy(value)}>
                        <FontAwesomeIcon icon={["fas", "copy"]} />
                    </div>
                </div>
            )
        }
    ], [])
    // console.log(columns, articles)

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({columns, data})

    return(
        <main className="px-4 mt-4">
        <table className="w-full overflow-hidden rounded-md" {...getTableProps()}>
            <thead className="">
                {headerGroups.map((headerGroup)=>(
                    <tr className="bg-[#ffc300] text-black" key={""} {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column)=>(
                            <th className="text-left px-2 py-2 font-semibold" key={""}>
                                {column.render("Header")}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>

            <tbody className="" {...getTableBodyProps()}>
                    {rows.map(row=>{
                        prepareRow(row)
                        return (<tr className="hover:cursor-pointer border-t first:border-t-0 border-x-8 border-x-transparent hover:bg-[#fff] hover:text-black hover:transition-all hover:border-t-transparent" key={""} {...row.getRowProps()}>
                            {row.cells.map(cell=>(
                                <td className="py-4 px-2" key={row.id} {...cell.getCellProps()}>
                                    {cell.render("Cell")}
                                </td>
                            ))}
                        </tr>)
                    })}
            </tbody>
        </table>
        </main>
    )
}
