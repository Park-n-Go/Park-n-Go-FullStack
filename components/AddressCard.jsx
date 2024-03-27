import { Card } from "@tremor/react"

  

const AddressCard = ({address}) => {
  return (<Card
    className="mx-auto max-w-xs"
    decoration="top"
    decorationColor="indigo">
        Company Address {JSON.stringify(address)}
    </Card>

  )
}

export default AddressCard