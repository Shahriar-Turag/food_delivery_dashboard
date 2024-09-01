import { Providers } from '@/redux/provider';

interface ContainerProps {
	children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
	return (
		<Providers>
			<div>{children}</div>
		</Providers>
	);
};

export default Container;
