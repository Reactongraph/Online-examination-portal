export function TableRow(props) {
	return (
		<tr>
			<td className={props.className}>
				<strong className='text-slate-700'>{props.label}</strong>
			</td>
			<td className={props.className}>{props.name}</td>
		</tr>
	)
}
