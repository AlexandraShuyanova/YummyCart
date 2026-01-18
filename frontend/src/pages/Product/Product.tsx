import {useLoaderData} from 'react-router-dom';
import type {Product} from '../../interfaces/product.interface';

export function Product() {
	const product = useLoaderData() as Product;

	return (
		<>
			Product page - {product.name}
		</>
	);
}

