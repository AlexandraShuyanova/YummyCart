import styles from './Menu.module.css';
import Search from '../../components/Search/Search.tsx';
import ProductCard from '../../components/ProductCard/ProductCard.tsx';
import {PREFIX} from '../../helpers/API.ts';
import type {Product} from '../../interfaces/product.interface.ts';
import {useEffect, useState} from 'react';
import axios, {AxiosError} from 'axios';
import TopBar from '../../components/TopBar/TopBar.tsx';
import { useOutletContext } from 'react-router-dom';
import CartBar from '../../components/CartBar/CartBar.tsx';
import {useSelector} from 'react-redux';
import type {RootState} from '../../store/store.ts';
import IconButton from '../../components/IconButton/IconButton.tsx';
import cn from 'classnames';

function Menu() {

	type ProductsPagedResponse = {
		page: number;
		size: number;
		total: number;
		totalPages: number;
		items: Product[];
	};

	type Category = {
		id: number;
		name: string;
	}

	const [products, setProducts] = useState<Product[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const cartItems = useSelector((state: RootState) => state.cart.items);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();
	const SIZE = 6;
	const [page, setPage] = useState<number>(1);
	/*const [totalPages, setTotalPages] = useState<number>(1);*/
	const [search, setSearch] = useState<string>('');
	const [activeCategory, setActiveCategory] = useState<number | null>(null);
	const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
	const { onOpenMenu } = useOutletContext<{ onOpenMenu: () => void }>();

	useEffect(() => {
		const loadCategories = async() => {
			try {
				const {data} = await axios.get<Category[]>(`${PREFIX}/categories`);
				setCategories(data);
				if (data.length > 0) {
					setActiveCategory(data[0].id);
				}
			} catch (e) {
				console.error(e);
				if (e instanceof AxiosError) {
					setError(e.message);
				}
				return;
			}
		};
		loadCategories();
	}, []);

	useEffect(() => {
		const loadProducts = async () => {
			try {
				setIsLoading(true);
				const {data} = await axios.get<ProductsPagedResponse>(`${PREFIX}/products-paged`, {
					params: {
						page: page - 1,
						size: SIZE,
						filter: search,
						categoryId: activeCategory
					}
				});
				setProducts(data.items);
				setIsLoading(false);
			} catch(e) {
				console.error(e);
				if (e instanceof AxiosError) {
					setError(e.message);
				}
				setIsLoading(false);
				return;
			}
		};
		loadProducts();
	}, [page, search, activeCategory]);

	return (
		<div className={styles['menu-wrapper']}>
			<div className={styles['header']}>
				<div className={styles['desktop-header']}>
					<div className={cn(styles['tabs'], {
						[styles['hidden']]: isSearchFocused
					})}>
						{categories.length > 0 && categories.map(category => (
							<button
								key={category.id}
								type="button"
								onClick={() => setActiveCategory(category.id)}
								className={cn(styles['tab'], {
									[styles['tab-active']]: activeCategory === category.id
								})}
							>{category.name}</button>
						))}
					</div>
					<Search
						className={cn(styles['search'], {
							[styles['active']]: isSearchFocused
						})}
						onFocus={()=> setIsSearchFocused(true)}
						onBlur={()=>setIsSearchFocused(false)}
						onSearch={(value) => {
							setSearch(value);
							setPage(1);
						}}
					/>
				</div>
				<div className={styles['mobile-header']}>
					<div className={styles['mobile-header-top']}>
						<TopBar onOpenMenu={onOpenMenu}/>
						<Search
							className={cn(styles['search'], {
								[styles['search-active']]: isSearchFocused
							})}
							onFocus={()=> setIsSearchFocused(true)}
							onBlur={()=>setIsSearchFocused(false)}
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
					<div className={cn(styles['tabs'], {
						[styles['search-active']]: isSearchFocused
					})}>
						{categories.length > 0 && categories.map(category => (
							<button
								key={category.id}
								type="button"
								onClick={() => setActiveCategory(category.id)}
								className={cn(styles['tab'], {
									[styles['tab-active']]: activeCategory === category.id
								})}
							>{category.name}</button>
						))}
					</div>
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
			{/*<div className={styles['pagination-wrapper']}>
				<Pagination
					currentPage={page}
					totalPages={totalPages}
					onChange={setPage}
				/>
			</div>*/}
		</div>
	);
};
export default Menu;
