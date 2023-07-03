import { useSortBy, useTable, usePagination } from "react-table";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { formatDate } from "../utils";
import TableActionIcons from "../tableActionIcons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
            Cell: ({ value }) => formatDate(value)
        },
        {
            Header: "ACTIONS",
            accessor: "id",
            Cell: ({ value }) => (
                <div className="flex">
                    <TableActionIcons value={value} path={"articles"} />
                    <Link href={`/${value}`}>
                        <FontAwesomeIcon icon={["fas", "pen"]} />
                    </Link>
                </div>
            )
        }
    ], [])
    // console.log(columns, articles)

    const {getTableProps, getTableBodyProps, headerGroups, page, prepareRow, nextPage, previousPage, canNextPage, canPreviousPage, pageOptions, state} = useTable(
        {columns, data},
        useSortBy,
        usePagination
        )
    
    const {pageIndex} = state

    return(
        <main className="px-4 mt-4">
        <table className="w-full overflow-hidden rounded-md" {...getTableProps()}>
            <thead className="">
                {headerGroups.map((headerGroup)=>(
                    <tr className="bg-[#ffc300] text-black" key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                        <th className="text-left px-2 py-2 font-semibold" style={{ width: column.width }} key={column.id} {...column.getHeaderProps(column.getSortByToggleProps())}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            {column.render("Header")}
                            <span>
                            {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                            </span>
                        </div>
                        </th>
                    ))}
                    </tr>
                ))}
            </thead>

            <tbody className="" {...getTableBodyProps()}>
                {page.map(row=>{
                    prepareRow(row)
                    return (<tr className="hover:cursor-pointer border-t first:border-t-0 border-x-8 border-x-transparent hover:bg-[#fff] hover:text-black hover:transition-all hover:border-t-transparent" key={""} {...row.getRowProps()}>
                        {row.cells.map(cell=>(
                            <td className={`py-2 px-2 ${row.original.published && "bg-[#50594e]"}`} key={row.original.id} {...cell.getCellProps()}>
                                {cell.render("Cell")}
                            </td>
                        ))}
                    </tr>)
                })}
            </tbody>
        </table>
        <div className="py-4 mx-4 text-black">
            <span className="text-white pr-4">Page {' '}
                <strong>{pageIndex + 1} of {pageOptions.length}</strong>{' '}
            </span>
            <button className="mr-8 bg-[#ffc300] w-20 py-1 rounded-md hover:bg-white active:bg-[#ffc300]" onClick={()=>previousPage()} disabled={!previousPage}>Previous</button>
            <button className="bg-[#ffc300] w-20 py-1 rounded-md hover:bg-white active:bg-[#ffc300]" disabled={!nextPage} onClick={()=>nextPage()}>Next</button>
        </div>
        </main>
    )
}
