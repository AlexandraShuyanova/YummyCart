import Header from '../../components/Header/Header.tsx';
import styles from './Menu.module.css';
import Search from '../../components/Search/Search.tsx';
import DishCard from '../../components/DishCard/DishCard.tsx';
import card_1 from '../../assets/cards/card_1.svg';

export function Menu() {
	return (
		<>
			<div className={styles['head']}>
				<Header>Menu</Header>
				<Search className={styles['search-input']}/>
			</div>
			<div className={styles['cards-container']}>
				<DishCard id={1} title='Наслаждение' description='Салями, руккола, помидоры, оливки'
						  image={card_1} price={300} rating={4.5}/>
				<DishCard id={2} title='Наслаждение' description='Салями, руккола, помидоры, оливки'
						  image={card_1} price={300} rating={4.5}/>
				<DishCard id={3} title='Наслаждение' description='Салями, руккола, помидоры, оливки'
						  image={card_1} price={300} rating={4.5}/>
				<DishCard id={4} title='Наслаждение' description='Салями, руккола, помидоры, оливки'
						  image={card_1} price={300} rating={4.5}/>
				<DishCard id={5} title='Наслаждение' description='Салями, руккола, помидоры, оливки'
						  image={card_1} price={300} rating={4.5}/>
				<DishCard id={6} title='Наслаждение' description='Салями, руккола, помидоры, оливки'
						  image={card_1} price={300} rating={4.5}/>
				<DishCard id={7} title='Наслаждение' description='Салями, руккола, помидоры, оливки'
						  image={card_1} price={300} rating={4.5}/>
				<DishCard id={8} title='Наслаждение' description='Салями, руккола, помидоры, оливки'
						  image={card_1} price={300} rating={4.5}/>
				<DishCard id={9} title='Наслаждение' description='Салями, руккола, помидоры, оливки'
						  image={card_1} price={300} rating={4.5}/>

			</div>
		</>

	);
};