import { useTable } from "react-table";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Moment from 'react-moment';

export default function Table({data}){

    const columns =  useMemo(()=>[
        {
            Header: "TITLE",
            accessor: "title"
        },
        {
            Header: "AUTHOR",
            accessor: "author"
        },
        {
            Header: "PUBLISHED",
            accessor: "published"
        },
        {
            Header: "CREATED",
            accessor: "created",
            Cell: ({ row }) => <Moment format='MM/DD/YYYY'></Moment>
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
                            <td className="py-4 px-2" key={row.original.id} {...cell.getCellProps()}>
                                <Link href={`/${row.original.id}`}>
                                    {cell.render("Cell")}
                                </Link>
                            </td>
                        ))}
                    </tr>)
                })}
            </tbody>
        </table>
        </main>
    )

}
