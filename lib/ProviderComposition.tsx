import React from 'react';

export const buildProvidersTree = (
	componentsWithProps: [React.ComponentType<any>, Record<string, any>][]
) => {
	const initialComponent: React.FC<{
		children: React.ReactNode;
	}> = ({ children }) => <>{children}</>;
	return componentsWithProps.reduce(
		(
			AccumulatedComponents: React.FC<{
				children: React.ReactNode;
			}>,
			[Provider, props = {}]: [
				React.ComponentType<any>,
				Record<string, any>
			]
		) => {
			// eslint-disable-next-line react/display-name
			return ({ children }) => {
				return (
					<AccumulatedComponents>
						<Provider {...props}>{children}</Provider>
					</AccumulatedComponents>
				);
			};
		},
		initialComponent
	);
};
