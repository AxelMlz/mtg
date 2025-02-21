export default async function CardDetails({
    params
}: {
    params: Promise<{ cardId: string }>
}) {
    const cardId = (await params).cardId;
    return (
        <div> {cardId} </div>
    )
}
