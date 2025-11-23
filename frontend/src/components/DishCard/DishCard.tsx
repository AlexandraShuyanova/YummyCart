import styles from './DishCard.module.css';
import type {DishCardProps} from './DishCard.props.ts';
import cartItemButton from '../../assets/cart-button-icon.svg';
import ratingStar from '../../assets/rating-star.svg';
import {Link} from 'react-router-dom';

function DishCard(props : DishCardProps) {
	return (
		<Link to={`/dish/${props.id}`} className={styles['link']}>
			<div key={props.id} className={styles['dish-card']}>
				<div className={styles['head']} style={{
					backgroundImage: `url(${props.image})`,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					backgroundPosition: 'center'
				}}
				>
					<div className={styles['price']}>
						{props.price}&nbsp;
						<span className={styles['currency']}>₽</span>
					</div>
					<button className={styles['add-to-cart-button']}>
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

export default DishCard;