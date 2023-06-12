import Table from "./Table";

export default function Categories({categories}){
    return(
        <div>
            <Table data={categories} />
        </div>
    )
}