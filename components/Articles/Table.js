import { useSortBy, useTable, usePagination } from "react-table";
import { useState, useMemo, useContext } from "react";
import { formatDate } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { authFetchData } from "@/pages/api/api_with_axiso";
import UserContext from "@/contextapi/AuthAndUsers";
import LoadingSpinner from "../loadingSpinner";

export default function Table({data}){

    const router = useRouter()
    const {tokens} = useContext(UserContext)
    // selector
    const [selectedItems, setSelectedItems] = useState([])
    const [articles, setArticles] = useState(data)

    const handleRowSelection = (row) => {
        const id = row.original.id;
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    const handleDelete = async () => {
        for (let i = 0; i < selectedItems.length; i++){
            try {
                await authFetchData(tokens.access_token).delete(`/articles/${selectedItems[i]}`)
            } catch (error) {
                console.log(error.response.status)
            }
        }
        router.reload(router.asPath)
    }

    const handlePublish = async () => {
        for (let i = 0; i < selectedItems.length; i++){
            try {
                const {data} = await authFetchData(tokens.access_token).patch(`/articles/${selectedItems[i]}`, {published: true})
            } catch (error) {
                console.log(error)
            }
        }
        router.reload(router.asPath)
    }

    const columns =  useMemo(()=>[
        {
            Header: "",
            id: "selection",
            Cell: ({ row }) => (
                <input className="appearance-none w-4 h-4 rounded-sm border-2 bg-white border-[#191a1a] checked:bg-[#ffc300] checked:border-0"
                type="checkbox"
                onChange={() => handleRowSelection(row)}
                checked={selectedItems.includes(row.original.id)}
                />
            ),
        },
        {
            Header: "TITLE",
            accessor: "title",
            Cell: ({ value, row }) => (
                <div onClick={()=>router.push(`/${row.original.id}`)} className="truncate max-w-xs hover:underline">
                    {value}
                </div>
            )
        },
        {
            Header: "AUTHOR",
            accessor: "author"
            // Cell: ({ value }) => (
            //     <div>
            //         {value ? value.name : ""}
            //     </div>
            // )
        },
        {
            Header: "CATEGORY",
            accessor: "category",
            Cell: ({ value }) => (
                <div>
                    {value ? value.name : ""}
                </div>
            )
        },
        {
            Header: "PUBLISHED",
            accessor: "published",
            Cell: ({ value }) => (
                <div>
                        <div className="flex justify-center align-center mr-4">
                            {value == true ?
                                <div className="py-1 bg-green-700 px-4 rounded-md">yes</div>
                                :
                                <div className="py-1 bg-red-800 px-4 rounded-md">no</div>
                            }
                        </div>
                </div>
            )
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
                <div className="flex justify-center">
                    {/* <TableActionIcons value={value} path={"articles"} /> */}
                    {/* <Link href={`/${value}/`}> */}
                    <div onClick={()=>router.push(`/${value}`)}>
                        <FontAwesomeIcon icon={["fas", "pen"]} />
                    </div>
                    {/* </Link> */}
                </div>
            )
        }
    ], [selectedItems])
    // console.log(columns, articles)

    const {getTableProps, getTableBodyProps, headerGroups, page, prepareRow, nextPage, previousPage, canNextPage, canPreviousPage, pageOptions, state} = useTable(
        {columns, data},
        useSortBy,
        usePagination
        )

    const {pageIndex} = state

    return(
        <div>
        {/* selected Items */}
        {
            <div className="flex pl-5 gap-24 items-end">
                <p className="font-md text-lg">{selectedItems.length > 0 ? `Selected: ${selectedItems.length}`: "All Items"}</p>
                {selectedItems.length > 0 && <div className="flex gap-8">
                    <div onClick={handlePublish} className="bg-green-800 py-1 px-3 rounded-md hover:scale-110 cursor-pointer">Publish</div>
                    <div onClick={handleDelete} className="bg-red-800 py-1 px-3 rounded-md hover:scale-110 cursor-pointer">Delete</div>

                    {/* edit button problem  it goes to detail page */}
                    {selectedItems.length === 1 && <div onClick={()=>router.push(`/${selectedItems[0]}`)} className="bg-[#ffc300] py-1 px-3 rounded-md hover:scale-110 cursor-pointer">Edit</div>}
                </div>}
            </div>
        }
        <main className="px-4 mt-4" style={{ maxHeight: '420px', overflowY: 'scroll' }}>
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

            <tbody {...getTableBodyProps()}>
                {page.map(row=>{
                    prepareRow(row)
                    return (<tr className="hover:cursor-pointer border-t first:border-t-0 border-x-8 border-x-transparent hover:bg-[#fff] hover:text-black hover:transition-all hover:border-t-transparent" key={""} {...row.getRowProps()}>
                        {row.cells.map(cell=>(
                            <td className={`py-2 px-2`} key={row.original.id} {...cell.getCellProps()}>
                                {cell.render("Cell")}
                            </td>
                        ))}
                    </tr>)
                })}
            </tbody>
        </table>
        </main>
        <div className="py-4 mx-4 text-black">
            <span className="text-white pr-4">Page {' '}
                <strong>{pageIndex + 1} of {pageOptions.length}</strong>{' '}
            </span>
            <button className="mr-8 bg-[#ffc300] w-20 py-1 rounded-md hover:bg-white active:bg-[#ffc300]" onClick={()=>previousPage()} disabled={!previousPage}>Previous</button>
            <button className="bg-[#ffc300] w-20 py-1 rounded-md hover:bg-white active:bg-[#ffc300]" disabled={!nextPage} onClick={()=>nextPage()}>Next</button>
        </div>
        </div>
    )
}
