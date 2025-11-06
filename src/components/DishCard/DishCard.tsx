import styles from './DishCard.module.css';
import type {DishCardProps} from './DishCard.props.ts';
import cn from 'classnames';
import cardCart from '../../assets/cardCart.svg';

function DishCard({className, id, title, image, description, price, rating} : DishCardProps) {
	return (
		<div key={id} className={cn(styles['dish-card'], className)}>
			<img className={styles['image']} src={image}></img>
			<img className={styles['cart-icon']} src={cardCart}></img>
			<h2 className={styles['title']}>{title}</h2>
			<p className={styles['description']}>{description}</p>
			<p className={styles['price']}>{price}</p>
			<p className={styles['rating']}>{rating}</p>
		</div>
	);
}

export default DishCard;