import Table from "./Table";

export default function Feeds({feeds}){
    return(
        <div>
            <Table data={feeds} />
        </div>
    )
}