import React, { useState, useEffect } from "react";
import getState from "./flux.js";

// Don't change, here is where we initialize our context, by default it's just going to be null.
export const Context = React.createContext(null);

// This function injects the global store to any view/component where you want to use it
const injectContext = PassedComponent => {
	const StoreWrapper = props => {
		// This will be passed as the context value
		const [state, setState] = useState(
			getState({
				getStore: () => state.store,
				getActions: () => state.actions,
				setStore: updatedStore =>
					setState({
						store: Object.assign(state.store, updatedStore),
						actions: { ...state.actions }
					})
			})
		);

		useEffect(() => {
			// Perform any initial actions or data fetching here using actions
			// This runs once on the component mount, equivalent to "window.onload"
			// Avoid using setState() directly here; use actions to modify the store
		}, []);

		// The initial value for the context is not null anymore, but the current state of this component,
		// the context will now have getStore, getActions, and setStore functions available
		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
	};

	return StoreWrapper;
};

export default injectContext;

