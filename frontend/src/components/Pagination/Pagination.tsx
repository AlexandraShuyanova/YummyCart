import styles from './Pagination.module.css';

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onChange: (page: number) => void;
};

function Pagination({ currentPage, totalPages, onChange }: PaginationProps) {
	if (totalPages <= 1) {
		return null;
	}

	return (
		<div className={styles.pagination}>
			<button
				className={styles.arrow}
				disabled={currentPage === 1}
				onClick={() => onChange(currentPage - 1)}
			>
                ‹
			</button>

			{Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
				<button
					key={page}
					className={`${styles.page} ${
						page === currentPage ? styles.active : ''
					}`}
					onClick={() => onChange(page)}
				>
					{page}
				</button>
			))}

			<button
				className={styles.arrow}
				disabled={currentPage === totalPages}
				onClick={() => onChange(currentPage + 1)}
			>
                ›
			</button>
		</div>
	);
}

export default Pagination;
