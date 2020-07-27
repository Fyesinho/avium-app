export const reducerFunctionLabor = arrayLabors => {
    return arrayLabors.map(labor => ({value: labor.id, label: labor.name}))
}