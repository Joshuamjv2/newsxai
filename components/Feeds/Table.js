import { useTable } from "react-table";
import { useMemo, useContext } from "react";
import { formatDate } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { authFetchData } from "@/pages/api/api_with_axiso";
import UserContext from "@/contextapi/AuthAndUsers";
import { useRouter } from "next/router";
import TableActionIcons from "../tableActionIcons";


export default function Table({data}){
    const columns =  useMemo(()=>[
        {
            Header: "SOURCE NAME",
            accessor: "source_name"
        },
        {
            Header: "RSS LINK",
            accessor: "rss_link"
        },
        {
            Header: "SOURCE LINK",
            accessor: "source_link"
        },
        {
            Header: "CREATED",
            accessor: "created",
            Cell: ({ value }) => formatDate(value)
        },
        {
            Header: "ACTIONS",
            accessor: "id",
            Cell: ({ value }) => (
                <TableActionIcons value={value} path={"rss_feeds"} />
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