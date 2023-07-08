import Table from "./Table";

export default function APIKeys({api_keys}){
    return(
        <div>
            <Table data={api_keys} />
        </div>
    )
}