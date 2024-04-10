export const isNearby = (lon: number, lat: number) => {
    const epsilon = 0.0001; // или любое другое малое значение
    return (city: any) => Math.abs(city.lon - lon) < epsilon && Math.abs(city.lat - lat) < epsilon;
}
