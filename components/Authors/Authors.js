import Table from "./Table";

export default function Authors({authors}){
    return(
        <div className="">
            <Table data={authors} />
        </div>
    )
}