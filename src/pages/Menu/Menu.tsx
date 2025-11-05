import Header from '../../components/Header/Header.tsx';
import styles from './Menu.module.css';
import Search from '../../components/Search/Search.tsx';
import DishCard from '../../components/DishCard/DishCard.tsx';

export function Menu() {
	return (
		<>
			<div className={styles['head']}>
				<Header>Menu</Header>
				<Search className={styles['search-input']}/>
			</div>
			<div className={styles['cards-container']}>
				<DishCard className={styles['card']} id={1} title='Наслаждение' description='Салями, руккола, помидоры, оливки'
						  image='/public/cards/card_1.svg' price={300} rating={4.5}/>
				<DishCard className={styles['card']} id={2} title='Наслаждение' description='Салями, руккола, помидоры, оливки'
						  image='/public/cards/card_1.svg' price={300} rating={4.5}/>
				<DishCard className={styles['card']} id={3} title='Наслаждение' description='Салями, руккола, помидоры, оливки'
						  image='/public/cards/card_1.svg' price={300} rating={4.5}/>
				<DishCard className={styles['card']} id={1} title='Наслаждение' description='Салями, руккола, помидоры, оливки'
						  image='/public/cards/card_1.svg' price={300} rating={4.5}/>
				<DishCard className={styles['card']} id={2} title='Наслаждение' description='Салями, руккола, помидоры, оливки'
						  image='/public/cards/card_1.svg' price={300} rating={4.5}/>
				<DishCard className={styles['card']} id={3} title='Наслаждение' description='Салями, руккола, помидоры, оливки'
						  image='/public/cards/card_1.svg' price={300} rating={4.5}/>
				<DishCard className={styles['card']} id={1} title='Наслаждение' description='Салями, руккола, помидоры, оливки'
						  image='/public/cards/card_1.svg' price={300} rating={4.5}/>
				<DishCard className={styles['card']} id={2} title='Наслаждение' description='Салями, руккола, помидоры, оливки'
						  image='/public/cards/card_1.svg' price={300} rating={4.5}/>
				<DishCard className={styles['card']} id={3} title='Наслаждение' description='Салями, руккола, помидоры, оливки'
						  image='/public/cards/card_1.svg' price={300} rating={4.5}/>

			</div>
		</>

	);
};