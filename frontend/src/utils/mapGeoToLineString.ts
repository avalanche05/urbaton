import { IParking } from '../api/models';
import { IGeo, ILineString } from '../models';

export function mapGeoArrayToLineString(
    geoArray: IGeo[],
    parking: IParking,
    activeParking?: IParking
): ILineString {
    return {
        id: parking.id.toString(),
        geometry: {
            type: 'LineString',
            coordinates: geoArray.map((geo) => [geo.longitude, geo.latitude]),
        },
        style: {
            stroke: [
                {
                    color:
                        parking.id === activeParking?.id
                            ? 'red'
                            : Math.random() > 0.9
                            ? '#fcf62c'
                            : '#7ed73f',
                    width: 4,
                },
            ],
        },
    };
}
