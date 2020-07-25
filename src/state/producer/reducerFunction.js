export const reducerFunctionProducer = arrayProducers => {
    return arrayProducers.map(producer => ({value: producer.id, label: producer.name}))
}