import styles from './Menu.module.css';
import Search from '../../components/Search/Search.tsx';
import ProductCard from '../../components/ProductCard/ProductCard.tsx';
import {PREFIX} from '../../helpers/API.ts';
import type {Product} from '../../interfaces/product.interface.ts';
import {useEffect, useState} from 'react';
import axios, {AxiosError} from 'axios';
import Pagination from '../../components/Pagination/Pagination.tsx';
import TopBar from '../../components/TopBar/TopBar.tsx';
import { useOutletContext } from 'react-router-dom';
import CartBar from "../../components/CartBar/CartBar.tsx";
import {useSelector} from "react-redux";
import type {RootState} from "../../store/store.ts";
import IconButton from "../../components/IconButton/IconButton.tsx";

function Menu() {

	type ProductsPagedResponse = {
		page: number;
		size: number;
		total: number;
		totalPages: number;
		items: Product[];
	};

	const [products, setProducts] = useState<Product[]>([]);
	const cartItems = useSelector((state: RootState) => state.cart.items);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();
	const SIZE = 6;
	const [page, setPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(1);
	const [search, setSearch] = useState<string>('');
	const { onOpenMenu } = useOutletContext<{ onOpenMenu: () => void }>();

	useEffect(() => {
		const loadMenu = async() => {
			try {
				setIsLoading(true);
				const {data} = await axios.get<ProductsPagedResponse>(`${PREFIX}/products-paged/?page=${page - 1}&size=${SIZE}&name=${search}`);
				setProducts(data.items);
				setTotalPages(data.totalPages);
				setIsLoading(false);
			} catch (e) {
				console.error(e);
				if (e instanceof AxiosError) {
					setError(e.message);
				}
				setIsLoading(false);
				return;
			}
		};
		loadMenu();
	}, [page, search]);

	return (
		<div className={styles['menu-wrapper']}>
			<div className={styles['header']}>
				<div className={styles['header-top']}>
					<TopBar title={'Menu'} onOpenMenu={onOpenMenu}/>
					<Search
						className={styles['search-input']}
						onSearch={(value) => {
							setSearch(value);
							setPage(1);
						}}
					/>
					<IconButton className={styles['header-more-button']} variant="ghost" type="button" aria-label="More options">
						<span></span>
						<span></span>
						<span></span>
					</IconButton>
				</div>
				<div className={styles['tabs']}>
					<button className={styles['tab-active']} type="button">Popular</button>
					<button className={styles['tab']} type="button">Mains</button>
					<button className={styles['tab']} type="button">Salads</button>
				</div>
			</div>
			<div className={styles['cards-container']}>
				{error && <>{error}</>}
				{!isLoading && products.length > 0 && products.map(product => (
					<ProductCard
						key={product.id}
						id={product.id}
						name={product.name}
						description={product.ingredients.join(' • ')}
						rating={product.rating}
						price={product.price}
						image={product.image}
						search={search}
					/>
				))}
				{isLoading &&
					<p>Loading dishes...</p>
				}
				{!isLoading && products.length === 0  &&
				<p>No dishes found</p>
				}
			</div>
			{cartItems.length !== 0 && <CartBar />}
			<div className={styles['pagination-wrapper']}>
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
