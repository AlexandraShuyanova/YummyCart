//export const PREFIX = '/pizza-api';
export const PREFIX =
    import.meta.env.MODE === 'production'
    	? `${import.meta.env.VITE_API_URL}/pizza-api`
    	: '/pizza-api';
