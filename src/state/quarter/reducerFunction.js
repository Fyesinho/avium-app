export const reducerFunctionQuarter = arrayQuarters => {
    return arrayQuarters.map(quarter => ({value: quarter.id, label: quarter.name, parentId: quarter.field_id}))
}