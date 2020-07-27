export const reducerFunctionField = arrayFields => {
    return arrayFields.map(field => ({value: field.id, label: field.name, parentId: field.producer_id}))
}