import Header from '../../components/Header/Header.tsx';
import styles from './Menu.module.css';
import Search from '../../components/Search/Search.tsx';
import ProductCard from '../../components/ProductCard/ProductCard.tsx';
import {PREFIX} from '../../helpers/API.ts';
import type {Product} from '../../interfaces/product.interface.ts';
import {useEffect, useState} from 'react';
import axios, {AxiosError} from 'axios';
import Pagination from '../../components/Pagination/Pagination.tsx';

function Menu() {

	type ProductsPagedResponse = {
		page: number;
		size: number;
		total: number;
		totalPages: number;
		items: Product[];
	};

	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();
	const size = 6;
	const [page, setPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(1);

	const loadMenu = async() => {
		try {
			setIsLoading(true);
			//const {data} = await axios.get<Product[]>(`${PREFIX}/products`);
			const {data} = await axios.get<ProductsPagedResponse>(`${PREFIX}/products-paged/?page=${page - 1}&size=${size}`);
			setProducts(data.items);
			setTotalPages(data.totalPages);
			setIsLoading(false);
		}
		catch (e) {
			console.error(e);
			if (e instanceof AxiosError) {
				setError(e.message);
			}
			setIsLoading(false);
			return;
		}
	};

	useEffect(() => {
		loadMenu();
	},[page]);

	return (
		<div className={styles['menu-wrapper']}>
			<div className={styles['head']}>
				<Header>Menu</Header>
				<Search className={styles['search-input']}/>
			</div>
			<div className={styles['cards-container']}>
				{error && <>{error}</>}
				{!isLoading && products.map(product => (
					<ProductCard
						key={product.id}
						id={product.id}
						name={product.name}
						description={product.ingredients.join(',')}
						rating={product.rating}
						price={product.price}
						image={product.image}
					/>
				))}
				{isLoading &&
					<p>Loading dishes...</p>
				}
			</div>
			<div className={styles.paginationWrapper}>
				<Pagination
					currentPage={page}
					totalPages={totalPages}
					onChange={setPage}
				/>
			</div>
		</div>
	);
};
export default Menu;