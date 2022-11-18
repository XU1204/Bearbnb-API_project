function StarRating({spot}) {
    if (!spot.avgRating) {
        return (
            <span>New</span>
        )
    } else {
        return (
            <span>{Number(spot.avgRating).toFixed(1)}</span>
        )
    }
}

export default StarRating;
