import { ReactNode } from 'react';

type LayoutProps = {
  header: JSX.Element;
  children: ReactNode;
};

function Layout({ header, children }: LayoutProps) {
  return (
    <div className="flex flex-col items-center">
      <nav className="sticky top-0">{header}</nav>
      <div>{children}</div>
    </div>
  );
}

export default Layout;
