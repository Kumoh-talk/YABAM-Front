import clsx from 'clsx';
import { CommonLink } from '@/components/common';
import { Props as CommonLinkProps } from '@/components/common/CommonLink/CommonLink';

export const LoginButton = ({
  className,
  href,
  children,
  ...props
}: CommonLinkProps) => (
  <CommonLink
    href={href}
    className={clsx(
      'flex flex-row justify-center items-center px-2 h-14 rounded-lg font-medium leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,.5)]',
      className,
    )}
    {...props}
  >
    {children}
  </CommonLink>
);
