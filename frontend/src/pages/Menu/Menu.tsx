import Header from '../../components/Header/Header.tsx';
import styles from './Menu.module.css';
import Search from '../../components/Search/Search.tsx';
import DishCard from '../../components/DishCard/DishCard.tsx';
import {PREFIX} from '../../helpers/API.ts';
import type {Dish} from '../../interfaces/dish.interface.ts';
import {useEffect, useState} from 'react';
import axios, {AxiosError} from 'axios';

export function Menu() {
	const [dishes, setDishes] = useState<Dish[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();

	const getMenu = async() => {
		try {
			setIsLoading(true);
			await new Promise<void>((resolve) => {
				setTimeout(() => {
					resolve();
				}, 2000);
			});
			const {data} = await axios.get<Dish[]>(`${PREFIX}/products`);
			setDishes(data);
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
		getMenu();
	},[]);

	return (
		<>
			<div className={styles['head']}>
				<Header>Menu</Header>
				<Search className={styles['search-input']}/>
			</div>
			<div className={styles['cards-container']}>
				{error && <>{error}</>}
				{!isLoading && dishes.map(dish => (
					<DishCard
						key={dish.id}
						id={dish.id}
						name={dish.name}
						description={dish.ingredients.join(',')}
						rating={dish.rating}
						price={dish.price}
						image={dish.image}
					/>
				))}
				{isLoading &&
					<p>Loading dishes...</p>
				}
			</div>
		</>
	);
};