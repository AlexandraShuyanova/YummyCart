import {useParams} from 'react-router-dom';

function Dish() {
	const {id} = useParams();
	return (
		<>
            Product page - {id}
		</>
	);
}

export default Dish;