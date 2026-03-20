import styles from './ProductCard.module.css';
import type {ProductCardProps} from './ProductCard.props.ts';
import cartItemButton from '../../assets/cart-button-icon.svg';
import ratingStar from '../../assets/rating-star.svg';
import {Link} from 'react-router-dom';
import type {AppDispatch} from "../../store/store.ts";
import {useDispatch} from "react-redux";
import {cartActions} from "../../store/cart.slice.ts";

function ProductCard(props: ProductCardProps) {
	const dispatch = useDispatch<AppDispatch>();

	const add = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(cartActions.add(props.id));
	};

	return (
		<Link to={`/product/${props.id}`} className={styles['link']}>
			<div key={props.id} className={styles['product-card']}>
				<div className={styles['head']} style={{
					backgroundImage: `url(${props.image})`,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					backgroundPosition: 'center'
				}}>
					<div className={styles['price']}>
						{props.price}&nbsp;
						<span className={styles['currency']}>₽</span>
					</div>
					<button className={styles['add-to-cart-button']} onClick={add}>
						<img src={cartItemButton} alt='Add to cart'></img>
					</button>
					<div className={styles['rating']}>
						{props.rating}&nbsp;
						<img className={styles['star-icon']} src={ratingStar} alt='Star icon'></img>
					</div>
				</div>
				<div className={styles['footer']}>
					<h2 className={styles['name']}>{props.name}</h2>
					<p className={styles['description']}>{props.description}</p>
				</div>
			</div>
		</Link>
	);
}

export default ProductCard;