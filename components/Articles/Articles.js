import Table from "./Table";

export default function Articles({articles}){
    return(
        <div>
            <Table data={articles} />
        </div>
    )
}