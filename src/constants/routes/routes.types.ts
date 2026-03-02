import { ROUTES } from './routes';

export type AppRoute = (typeof ROUTES.AUTH)[keyof typeof ROUTES.AUTH] | (typeof ROUTES.MAIN)[keyof typeof ROUTES.MAIN];
