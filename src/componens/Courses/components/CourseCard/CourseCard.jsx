import Button from '../../../../common/Button/Button';

const CourseCard = (props) => {
	const { cardProps, authorsStr } = props;
	const { title, description, duration, creationDate } = cardProps;

	return (
		<li
			className={
				'list-group-item d-flex justify-content-between border border-info'
			}
			style={{ margin: 10, padding: 10 }}
		>
			<div style={{ width: '60%' }}>
				<h4>{title}</h4>
				<p>{description}</p>
			</div>
			<div style={{ width: '30%' }}>
				<p>
					{' '}
					<b>Authors:</b> {authorsStr}
				</p>
				<p>
					<b>Duration:</b> {duration}
				</p>
				<p>
					<b>Created:</b> {creationDate}
				</p>
				<Button text='Show course' />
			</div>
		</li>
	);
};

export default CourseCard;
