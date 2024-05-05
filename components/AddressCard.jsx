import { Card } from "@tremor/react"

  

const AddressCard = ({address}) => {
  return (<Card
    className=""
    decoration="top"
    decorationColor="indigo">
    {address?.city}
    </Card>

  )
}

export default AddressCard