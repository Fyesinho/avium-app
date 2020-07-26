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
    id: 7,
    labors: visit.labors.map(labor => {
        console.log('labor', labor)
        return {
            comment: labor.comment,
            image: labor.image,
            labor: {
                label: labor.labor
            }
        }
    }),
    producer: {
        label: visit.producer
    },
    quarter: {
        label: visit.quarter
    }
});