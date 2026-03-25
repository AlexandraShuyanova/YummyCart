import {useLoaderData, useNavigate} from 'react-router-dom';
import type {Product} from '../../interfaces/product.interface';
import styles from './Product.module.css';
import Header from "../../components/Header/Header.tsx";
import Button from "../../components/Button/Button.tsx";
import {updateCart} from "../../store/cart.slice.ts";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "../../store/store.ts";
import cartItemButton from '../../assets/cart-button-icon.svg';
import ratingStar from "../../assets/rating-star.svg";
import arrow from '../../assets/left-arrow.svg';

export function Product() {
	const product = useLoaderData() as Product;
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const add = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(updateCart({
			productId: product.id,
			action: 'increase'
		}));
	};
	return (
		<div className={styles['product-page']}>
			<div className={styles['header']}>
				<div className={styles['left']}>
					<button className={styles['back']} onClick={() => navigate(-1)}>
						<img src={arrow} alt={'Back icon'}></img>
					</button>
					<Header>{product.name}</Header>
				</div>
				<Button appearance={'small'} onClick={add}>
					<img src={cartItemButton} alt='Add to cart'></img>&nbsp;
					Add to cart</Button>
			</div>
			<div className={styles['content']}>
				<div className={styles['image']} style={{backgroundImage: `url(${product.image})`}}></div>
				<div className={styles['description']}>
					<div className={styles['row']}>
						<label htmlFor="email">Price</label>
						<span className={styles['price']}>{product.price}&nbsp;₽</span>
					</div>
					<hr className={styles['hr']}/>
					<div className={styles['row']}>
						<label htmlFor="email">Rating</label>
						<div className={styles['rating']}>
							{product.rating}&nbsp;
							<img className={styles['star-icon']} src={ratingStar} alt='Star icon'></img>
						</div>
					</div>
					<div className={styles['ingredients']}>
						<div className={styles['list']}>Ingredients:</div>
						<ul>
							{product.ingredients.map((item, index) =>
								<li key={index}>{item}</li>
							)}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

