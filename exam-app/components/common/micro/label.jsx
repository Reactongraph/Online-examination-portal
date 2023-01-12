export function Label({ key, children }) {
	return (
		<label
			class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
			for={key}>
			{children}
		</label>
	)
}
