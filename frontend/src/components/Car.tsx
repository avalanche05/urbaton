import { Checkbox, Row, Typography } from 'antd';
import { ICar } from '../api/models';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

type Props = {
    car: ICar;
    onChange: (e: CheckboxChangeEvent, car: ICar) => void;
};

const Car = ({ car, onChange }: Props) => {
    return (
        <>
            <div className='car'>
                <Row>
                    <Typography.Text className='car__name'>{car.name}</Typography.Text>
                </Row>

                <Row>
                    <div className='car__number-block'>
                        <Checkbox onChange={(e) => onChange(e, car)} className='car__number'>
                            {car.number}
                        </Checkbox>
                    </div>
                </Row>
            </div>
        </>
    );
};

export default Car;
