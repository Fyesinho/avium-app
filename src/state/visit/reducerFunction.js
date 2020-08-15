export const reducerFunctionVisit = arrayVisits => {
    return arrayVisits.map(visit => (
            {
                producer: {
                    label: visit.producer
                },
                id: new Date(visit.created_at).getTime(),
                sync: true,
                idRemote: visit.id
            }
        )
    )
}

export const reducerCurrentVisit = visit => ({
    field: {
        label: visit.field
    },
    id: visit.id,
    labors: visit.labors.map(labor => {
        return {
            comment: labor.comment,
            image: labor.image,
            labor: {
                label: labor.labor
            }
            ,
            quarter: {
                label: labor.quarter
            }
        }
    }),
    producer: {
        label: visit.producer
    }
});