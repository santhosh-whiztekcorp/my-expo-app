import { CustomTextVariants } from './custom-text.types';

export const getCustomTextClasses = (variant: CustomTextVariants): string => {
  switch (variant) {
    case 'h1':
      return 'text-4xl font-montserrat-bold leading-tight md:text-5xl lg:text-6xl text-foreground';
    case 'h2':
      return 'text-3xl font-montserrat-semibold leading-snug md:text-4xl text-foreground';
    case 'h3':
      return 'text-2xl font-montserrat-semibold leading-relaxed md:text-3xl text-foreground';
    case 'h4':
      return 'text-xl font-montserrat-medium leading-relaxed md:text-2xl text-foreground';
    case 'h5':
      return 'text-lg font-montserrat-medium leading-relaxed text-foreground';
    case 'h6':
      return 'text-base font-montserrat-medium leading-relaxed text-foreground';
    case 'p':
      return 'text-base font-montserrat text-foreground leading-relaxed';
    case 'span':
      return 'text-sm font-montserrat text-foreground';
  }
};
