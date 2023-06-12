import Layout from "@/components/layout"
import PopupLayout from "@/components/PopupLayout"
import AddItems from "@/components/AddItems/AddItems"

export default function Article(){
    return(
        <main>
            <Layout>
                <PopupLayout active={true} title={"Individual PAge"}>
                    <AddItems items={[{name: "Joshua and longer"}, {name: "Joshua"}, {name: "Joshua"}]} />
                </PopupLayout>
            </Layout>
        </main>
    )
}
